from .models import Landmark, Review
from .schemas import LandmarkCreate, LandmarkUpdate
from ..dao import BaseDAO


class LandmarkDAO(BaseDAO[Landmark, LandmarkCreate, LandmarkUpdate]):
    model = Landmark

class ReviewDAO(BaseDAO[Review, LandmarkCreate, LandmarkUpdate]):
    model = Review

    