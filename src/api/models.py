from sqlalchemy import ARRAY, Column, JSON, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship
from ..database import Base

class Landmark(Base):
    __tablename__ = "landmarks"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False, unique=True)
    rating = Column(Float, nullable=False)
    price = Column(Integer, nullable=False)
    description = Column(String, nullable=False)
    address = Column(String, nullable=False)
    time = Column(String, nullable=False)
    img = Column(String, nullable=False)
    coordinates = Column(ARRAY(Float), nullable=False)
    categories = Column(ARRAY(String), nullable=False)
    type = Column(String, nullable=False)

class Review(Base):
    __tablename__ = "reviews"

    stars = Column(Float, nullable=False)
    title = Column(String, nullable=False, primary_key=True)
    description = Column(String, nullable=False)

# class PublishedLandmark(Base):
#     __tablename__ = "published_landmarks"

#     id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("users.id"))
#     landmark_id = Column(String, ForeignKey("landmarks.id"))

#     user = relationship("User", back_populates="published_landmarks")

# class FavoriteLandmark(Base):
#     __tablename__ = "favorite_landmarks"

#     id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("users.id"))
#     landmark_id = Column(String, ForeignKey("landmarks.id"))

#     user = relationship("User", back_populates="favorite_landmarks")
