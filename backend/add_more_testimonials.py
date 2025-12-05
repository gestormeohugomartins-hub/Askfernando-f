import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime
import uuid

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

new_testimonials = [
    # English testimonials
    {
        "id": str(uuid.uuid4()),
        "name": "Sarah Mitchell",
        "location": "UK",
        "text": "Fernando made our move to Portugal seamless. His knowledge of utilities setup and insurance options saved us weeks of frustration. Highly professional and always responsive!",
        "rating": 5,
        "language": "en",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Michael Thompson",
        "location": "USA",
        "text": "Outstanding service! Fernando helped us with internet setup before we even arrived. Everything was working perfectly on day one. His English is perfect and he understands expat needs.",
        "rating": 5,
        "language": "en",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Emma Johnson",
        "location": "Australia",
        "text": "Best decision to contact Fernando! He handled all our utilities, got us great insurance rates, and explained everything clearly. No hidden fees, completely transparent service.",
        "rating": 5,
        "language": "en",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "David Wilson",
        "location": "Canada",
        "text": "Fernando's expertise in the Portuguese market is invaluable. He negotiated better rates than we could have gotten ourselves. Professional, friendly, and incredibly helpful!",
        "rating": 5,
        "language": "en",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    # Portuguese testimonials
    {
        "id": str(uuid.uuid4()),
        "name": "Ana Silva",
        "location": "Portugal",
        "text": "Serviço excecional! O Fernando ajudou-nos com todos os contratos de eletricidade e internet. Muito profissional e sempre disponível para esclarecer dúvidas.",
        "rating": 5,
        "language": "pt",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "João Santos",
        "location": "Portugal",
        "text": "Recomendo vivamente! O Fernando conseguiu-nos os melhores preços em seguros e internet. Sem custos adicionais e um serviço impecável.",
        "rating": 5,
        "language": "pt",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Maria Costa",
        "location": "Portugal",
        "text": "Fantástico! Mudámo-nos para Portugal e o Fernando tratou de tudo. Internet a funcionar no dia da chegada e seguros todos organizados. 5 estrelas!",
        "rating": 5,
        "language": "pt",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    # French testimonials
    {
        "id": str(uuid.uuid4()),
        "name": "Sophie Dubois",
        "location": "France",
        "text": "Service impeccable! Fernando nous a aidés avec tous nos besoins en télécommunications et assurances. Très professionnel et toujours disponible.",
        "rating": 5,
        "language": "fr",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Pierre Martin",
        "location": "France",
        "text": "Excellent! Fernando connaît parfaitement le marché portugais. Il a négocié de meilleurs tarifs pour nous. Je recommande vivement ses services!",
        "rating": 5,
        "language": "fr",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Claire Laurent",
        "location": "Belgium",
        "text": "Très satisfaite! Fernando a tout organisé avant notre arrivée. Internet, électricité, assurances - tout était prêt. Service professionnel et gratuit!",
        "rating": 5,
        "language": "fr",
        "approved": True,
        "created_at": datetime.utcnow()
    }
]

async def add_testimonials():
    print("🌱 Adding more testimonials...")
    
    try:
        # Insert new testimonials
        result = await db.testimonials.insert_many(new_testimonials)
        print(f"✓ Inserted {len(result.inserted_ids)} new testimonials")
        
        # Count total
        total = await db.testimonials.count_documents({})
        print(f"✓ Total testimonials in database: {total}")
        
        print("\n✅ Testimonials added successfully!")
    except Exception as e:
        print(f"❌ Error: {str(e)}")

async def main():
    await add_testimonials()
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
