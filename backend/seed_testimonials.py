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

testimonials_data = [
    # English testimonials
    {
        "id": str(uuid.uuid4()),
        "name": "Carolyn Swayze",
        "location": "Portugal",
        "text": "I cannot thank Fernando enough for his assistance in getting me set up with a package of mobile phone, Wi-Fi, and TV connection. Fernando explained everything to me every step of the way in clear terms, and I consider his help invaluable as my Portuguese is practically nonexistent.",
        "rating": 5,
        "language": "en",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Ivan",
        "location": "Portugal",
        "text": "Fernando helped my family get established and settle down in Portugal. After we bought our house, there was a whole list of things we needed. Fernando is a one-stop-shop for the important things like homeowners insurance, health insurance, internet and cell phone service.",
        "rating": 5,
        "language": "en",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Russell Townsend",
        "location": "Portugal",
        "text": "Couldn't have been more efficient. Contracted on Friday, mobile numbers and internet installed by Saturday afternoon (MEO). Flawless service and communication. Exactly what you need coming to a new country and only just learning the language.",
        "rating": 5,
        "language": "en",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Jim Leff",
        "location": "Portugal",
        "text": "Fernando really knows his stuff, he's passionately expert on the topic (he explains EVERYTHING super clearly), and his service is so excellent. Hire Fernando WITHOUT RESERVATION. Right now. In Fernando we trust!",
        "rating": 5,
        "language": "en",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Luise Ellen",
        "location": "Portugal",
        "text": "As an English-speaking immigrant in Portugal, setting up utilities can be daunting. However, with Ask Fernando, the process was not only seamless but also a pleasure. Fernando is incredibly fast, efficient, and friendly. A truly outstanding service!",
        "rating": 5,
        "language": "en",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Becca Williams",
        "location": "USA",
        "text": "Fernando has been our 'knight in shining (tech) armor' since we moved to Portugal! Fernando's super power is dedication to meeting his clients' needs and unwavering perseverance. We give him our highest recommendation!",
        "rating": 5,
        "language": "en",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    # Portuguese testimonials
    {
        "id": str(uuid.uuid4()),
        "name": "Carolyn Swayze",
        "location": "Portugal",
        "text": "Não consigo agradecer o suficiente ao Fernando pela sua assistência na configuração do meu pacote de telemóvel, Wi-Fi e ligação de TV. O Fernando explicou-me tudo em termos claros, e considero a sua ajuda inestimável.",
        "rating": 5,
        "language": "pt",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Ivan",
        "location": "Portugal",
        "text": "O Fernando ajudou a minha família a estabelecer-se em Portugal. É uma loja única para coisas importantes como seguros, internet e serviço de telemóvel. Os seus serviços pouparam-me muito tempo.",
        "rating": 5,
        "language": "pt",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Russell Townsend",
        "location": "Portugal",
        "text": "Não poderia ter sido mais eficiente. Contratado na sexta-feira, números de telemóvel e internet instalados no sábado à tarde. Serviço e comunicação impecáveis.",
        "rating": 5,
        "language": "pt",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Jim Leff",
        "location": "Portugal",
        "text": "O Fernando realmente sabe o que está a fazer, é apaixonadamente especialista no tema (explica TUDO de forma muito clara), e o seu serviço é tão excelente. Contrate o Fernando SEM RESERVAS!",
        "rating": 5,
        "language": "pt",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    # French testimonials
    {
        "id": str(uuid.uuid4()),
        "name": "Carolyn Swayze",
        "location": "Portugal",
        "text": "Je ne peux pas assez remercier Fernando pour son aide dans la configuration de mon forfait téléphone mobile, Wi-Fi et connexion TV. Fernando m'a tout expliqué clairement et je considère son aide inestimable.",
        "rating": 5,
        "language": "fr",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Ivan",
        "location": "Portugal",
        "text": "Fernando a aidé ma famille à s'installer au Portugal. C'est un guichet unique pour les choses importantes comme l'assurance habitation, l'assurance santé, Internet et le service de téléphonie mobile.",
        "rating": 5,
        "language": "fr",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Russell Townsend",
        "location": "Portugal",
        "text": "Ne pourrait pas être plus efficace. Contracté le vendredi, numéros de mobile et Internet installés le samedi après-midi. Service et communication impeccables.",
        "rating": 5,
        "language": "fr",
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Jim Leff",
        "location": "Portugal",
        "text": "Fernando connaît vraiment son affaire, il est passionnément expert sur le sujet (il explique TOUT très clairement), et son service est tellement excellent. Engagez Fernando SANS RÉSERVE!",
        "rating": 5,
        "language": "fr",
        "approved": True,
        "created_at": datetime.utcnow()
    }
]

async def seed_testimonials():
    print("🌱 Seeding testimonials...")
    
    try:
        # Clear existing testimonials
        result = await db.testimonials.delete_many({})
        print(f"✓ Cleared {result.deleted_count} existing testimonials")
    except Exception as e:
        print(f"Note: {e}")
        print("Continuing with insert...")
    
    # Insert new testimonials
    result = await db.testimonials.insert_many(testimonials_data)
    print(f"✓ Inserted {len(result.inserted_ids)} testimonials")
    print(f"  - English: {len([t for t in testimonials_data if t['language'] == 'en'])}")
    print(f"  - Portuguese: {len([t for t in testimonials_data if t['language'] == 'pt'])}")
    print(f"  - French: {len([t for t in testimonials_data if t['language'] == 'fr'])}")
    
    print("\n✅ Database seeding completed!")

async def main():
    await seed_testimonials()
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
