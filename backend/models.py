from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"  # new, read, replied
    language: str = "en"

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str
    language: str = "en"

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: str
    text: str
    rating: int = 5
    created_at: datetime = Field(default_factory=datetime.utcnow)
    approved: bool = False
    language: str = "en"

class TestimonialCreate(BaseModel):
    name: str
    location: str
    text: str
    rating: int = 5
    language: str = "en"

class TestimonialUpdate(BaseModel):
    approved: Optional[bool] = None
    name: Optional[str] = None
    location: Optional[str] = None
    text: Optional[str] = None
    rating: Optional[int] = None

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminToken(BaseModel):
    access_token: str
    token_type: str = "bearer"
