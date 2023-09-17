import re
from uuid import UUID
import uuid

from pydantic import BaseModel, EmailStr, Field, validator
from typing import Dict, List, Optional

from .config import (
    MIN_USERNAME_LENGTH as user_min_len,
    MAX_USERNAME_LENGTH as user_max_len,
    MIN_PASSWORD_LENGTH as pass_min_len,
    MAX_PASSWORD_LENGTH as pass_max_len,
                    )

class UserBase(BaseModel):
    email: EmailStr
    username: str
    is_active: bool = Field(False)
    is_verified: bool = Field(False)
    is_superuser: bool = Field(False)
    

class UserCreate(UserBase):
    email: EmailStr
    username: str
    password: str
    published_landmarks: Optional[List[str]] = None
    favorite_landmarks: Optional[List[str]] = None
    
        
    @validator("username")
    def validate_username_length(cls, value):
        if len(value) < int(user_min_len) or len(value) > int(user_max_len):
            raise ValueError("Username must be between 5 and 15 characters")
        
        return value
    
class UserUpdate(UserBase):
    password: Optional[str] = None
    published_landmarks: Optional[List[str]] = None
    favorite_landmarks: Optional[List[str]] = None
        

class User(UserBase):
    id: str
    published_landmarks: Optional[List[str]] = None
    favorite_landmarks: Optional[List[str]] = None
    
class UserCreateDB(UserBase):
    id: str
    hashed_password: Optional[str] = None
    published_landmarks: Optional[str] = None
    favorite_landmarks: Optional[str] = None
    
    
class UserLogin(BaseModel):
    username: str
    password:str
   
    
    
    
class RefreshSessionCreate(BaseModel):
    refresh_token: str
    expires_at: int
    user_id: str

class RefreshSessionUpdate(RefreshSessionCreate):
    user_id: Optional[str] = Field(None)
    
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    
    
class TokenEnd(BaseModel):
    token: str = Field(None)
