import re
from uuid import UUID
import uuid

from pydantic import BaseModel, EmailStr, Field
from typing import Dict, Optional, List


class LandmarkBase(BaseModel):
    title: str
    rating: float
    price: int
    description: str
    address: str
    time: str
    img: str
    coordinates: List[float]
    categories: List[str]
    type: str
    
    
class LandmarkCreate(LandmarkBase):
    pass

class LandmarkCreateDB(LandmarkBase):
    id: str
    
class LandmarkUpdate(LandmarkBase):
    id: str = Field(None)
    title: str = Field(None)
    price: int = Field(None)
    description: str = Field(None)
    address: str = Field(None)
    time: str = Field(None)
    img: str = Field(None)
    

class Landmark(LandmarkCreateDB):
    pass


class FavoriteLandmarkCreate(BaseModel):
    id: str
    user_id: str
    landmark_id: str
    
    
class LandmarkId(BaseModel):
    id: str
    


    