from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
from datetime import datetime
from models import (
    ContactMessage, ContactMessageCreate,
    Testimonial, TestimonialCreate, TestimonialUpdate
)
from email_service import email_service
import secrets

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBasic()

# Admin credentials from environment
ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'Askfernandoadmin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'Askfernando2025*')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    """Verify admin credentials"""
    correct_username = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


# Public endpoints
@api_router.get("/")
async def root():
    return {"message": "AskFernando API - Multi services at your disposal"}


@api_router.post("/contact", status_code=status.HTTP_201_CREATED)
async def create_contact_message(contact: ContactMessageCreate):
    """Receive contact form submission and send email"""
    try:
        # Create contact message object
        contact_dict = contact.dict()
        contact_obj = ContactMessage(**contact_dict)
        
        # Save to database
        await db.contact_messages.insert_one(contact_obj.dict())
        logger.info(f"Contact message saved: {contact_obj.id}")
        
        # Send email
        try:
            await email_service.send_contact_email(
                name=contact.name,
                email=contact.email,
                phone=contact.phone or "",
                message=contact.message,
                language=contact.language
            )
            logger.info(f"Contact email sent for: {contact.email}")
        except Exception as e:
            logger.error(f"Email sending failed: {str(e)}")
            # Continue even if email fails - message is saved in DB
        
        return {
            "success": True,
            "message": "Message received successfully",
            "id": contact_obj.id
        }
    
    except Exception as e:
        logger.error(f"Error creating contact message: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process contact message: {str(e)}"
        )


@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(language: str = None, approved_only: bool = True):
    """Get all testimonials, optionally filtered by language"""
    try:
        query = {}
        if approved_only:
            query["approved"] = True
        if language:
            query["language"] = language
            
        testimonials = await db.testimonials.find(query).sort("created_at", -1).to_list(1000)
        return [Testimonial(**t) for t in testimonials]
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch testimonials"
        )


# Admin endpoints
@api_router.get("/admin/contact-messages", response_model=List[ContactMessage])
async def get_all_contact_messages(
    status_filter: str = None,
    admin: str = Depends(verify_admin)
):
    """Get all contact messages (admin only)"""
    try:
        query = {}
        if status_filter:
            query["status"] = status_filter
            
        messages = await db.contact_messages.find(query).sort("created_at", -1).to_list(1000)
        return [ContactMessage(**msg) for msg in messages]
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch contact messages"
        )


@api_router.patch("/admin/contact-messages/{message_id}")
async def update_contact_message_status(
    message_id: str,
    new_status: str,
    admin: str = Depends(verify_admin)
):
    """Update contact message status (admin only)"""
    try:
        result = await db.contact_messages.update_one(
            {"id": message_id},
            {"$set": {"status": new_status}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Message not found"
            )
        
        return {"success": True, "message": "Status updated"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating message status: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update message status"
        )


@api_router.get("/admin/testimonials", response_model=List[Testimonial])
async def get_all_testimonials_admin(admin: str = Depends(verify_admin)):
    """Get all testimonials including unapproved (admin only)"""
    try:
        testimonials = await db.testimonials.find().sort("created_at", -1).to_list(1000)
        return [Testimonial(**t) for t in testimonials]
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch testimonials"
        )


@api_router.post("/admin/testimonials", response_model=Testimonial, status_code=status.HTTP_201_CREATED)
async def create_testimonial(
    testimonial: TestimonialCreate,
    admin: str = Depends(verify_admin)
):
    """Create new testimonial (admin only)"""
    try:
        testimonial_dict = testimonial.dict()
        testimonial_obj = Testimonial(**testimonial_dict, approved=True)
        
        await db.testimonials.insert_one(testimonial_obj.dict())
        logger.info(f"Testimonial created: {testimonial_obj.id}")
        
        return testimonial_obj
    except Exception as e:
        logger.error(f"Error creating testimonial: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create testimonial"
        )


@api_router.patch("/admin/testimonials/{testimonial_id}")
async def update_testimonial(
    testimonial_id: str,
    update_data: TestimonialUpdate,
    admin: str = Depends(verify_admin)
):
    """Update testimonial (admin only)"""
    try:
        update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
        
        if not update_dict:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No update data provided"
            )
        
        result = await db.testimonials.update_one(
            {"id": testimonial_id},
            {"$set": update_dict}
        )
        
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Testimonial not found"
            )
        
        return {"success": True, "message": "Testimonial updated"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating testimonial: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update testimonial"
        )


@api_router.delete("/admin/testimonials/{testimonial_id}")
async def delete_testimonial(
    testimonial_id: str,
    admin: str = Depends(verify_admin)
):
    """Delete testimonial (admin only)"""
    try:
        result = await db.testimonials.delete_one({"id": testimonial_id})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Testimonial not found"
            )
        
        return {"success": True, "message": "Testimonial deleted"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting testimonial: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete testimonial"
        )


@api_router.post("/admin/seed-testimonials")
async def seed_testimonials(admin: str = Depends(verify_admin)):
    """Seed initial testimonials (admin only)"""
    try:
        testimonials_data = [
            # English
            {"id": "en-1", "name": "Carolyn Swayze", "location": "Portugal", "text": "I cannot thank Fernando enough for his assistance in getting me set up with a package of mobile phone, Wi-Fi, and TV connection. Fernando explained everything to me every step of the way in clear terms, and I consider his help invaluable.", "rating": 5, "language": "en", "approved": True, "created_at": datetime.utcnow()},
            {"id": "en-2", "name": "Ivan", "location": "Portugal", "text": "Fernando helped my family get established and settle down in Portugal. Fernando is a one-stop-shop for the important things like insurance, internet and cell phone service. His services saved me a lot of time and hassles.", "rating": 5, "language": "en", "approved": True, "created_at": datetime.utcnow()},
            {"id": "en-3", "name": "Russell Townsend", "location": "Portugal", "text": "Couldn't have been more efficient. Contracted on Friday, mobile numbers and internet installed by Saturday afternoon. Flawless service and communication. Exactly what you need coming to a new country.", "rating": 5, "language": "en", "approved": True, "created_at": datetime.utcnow()},
            {"id": "en-4", "name": "Jim Leff", "location": "Portugal", "text": "Fernando really knows his stuff, he's passionately expert on the topic (he explains EVERYTHING super clearly), and his service is so excellent. Hire Fernando WITHOUT RESERVATION!", "rating": 5, "language": "en", "approved": True, "created_at": datetime.utcnow()},
            # Portuguese
            {"id": "pt-1", "name": "Carolyn Swayze", "location": "Portugal", "text": "Não consigo agradecer o suficiente ao Fernando pela sua assistência na configuração do meu pacote de telemóvel, Wi-Fi e ligação de TV. O Fernando explicou-me tudo em termos claros.", "rating": 5, "language": "pt", "approved": True, "created_at": datetime.utcnow()},
            {"id": "pt-2", "name": "Ivan", "location": "Portugal", "text": "O Fernando ajudou a minha família a estabelecer-se em Portugal. É uma loja única para coisas importantes como seguros, internet e serviço de telemóvel.", "rating": 5, "language": "pt", "approved": True, "created_at": datetime.utcnow()},
            {"id": "pt-3", "name": "Russell Townsend", "location": "Portugal", "text": "Não poderia ter sido mais eficiente. Contratado na sexta-feira, números de telemóvel e internet instalados no sábado à tarde. Serviço impecável.", "rating": 5, "language": "pt", "approved": True, "created_at": datetime.utcnow()},
            # French
            {"id": "fr-1", "name": "Carolyn Swayze", "location": "Portugal", "text": "Je ne peux pas assez remercier Fernando pour son aide dans la configuration de mon forfait téléphone mobile, Wi-Fi et connexion TV. Fernando m'a tout expliqué clairement.", "rating": 5, "language": "fr", "approved": True, "created_at": datetime.utcnow()},
            {"id": "fr-2", "name": "Ivan", "location": "Portugal", "text": "Fernando a aidé ma famille à s'installer au Portugal. C'est un guichet unique pour les choses importantes comme l'assurance, Internet et le service de téléphonie mobile.", "rating": 5, "language": "fr", "approved": True, "created_at": datetime.utcnow()},
            {"id": "fr-3", "name": "Russell Townsend", "location": "Portugal", "text": "Ne pourrait pas être plus efficace. Contracté le vendredi, numéros de mobile et Internet installés le samedi après-midi. Service impeccable.", "rating": 5, "language": "fr", "approved": True, "created_at": datetime.utcnow()}
        ]
        
        # Check if already seeded
        count = await db.testimonials.count_documents({})
        if count > 0:
            return {"success": True, "message": f"Database already has {count} testimonials", "inserted": 0}
        
        # Insert testimonials
        result = await db.testimonials.insert_many(testimonials_data)
        
        return {
            "success": True,
            "message": "Testimonials seeded successfully",
            "inserted": len(result.inserted_ids)
        }
    except Exception as e:
        logger.error(f"Error seeding testimonials: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to seed testimonials: {str(e)}"
        )


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
