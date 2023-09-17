from typing import Optional
from uuid import uuid4

from fastapi import Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_, update
from src.auth.dao import UserDAO
from ..auth.dependencies import get_current_user

from src.auth.models import User

from ..auth.service import DatabaseManager as AuthDatabaseManager

from . import exceptions

from ..database import get_async_session
from .dao import LandmarkDAO, ReviewDAO
from .models import Landmark
from .schemas import LandmarkCreate, LandmarkBase, LandmarkCreateDB


class LandmarkCrud:
    
    def __init__(self, db: AsyncSession):
        self.db = db
        
    
    async def create_landmark(self, landmark: LandmarkCreate, request: Request, token: str) -> Landmark:
        
        id = str(uuid4())
                 
        await self.add_to_published(token=token, request=request, landmark_data=id)
        
        db_landmark = await LandmarkDAO.add(
            self.db,
            LandmarkCreateDB(
            **landmark.model_dump(),
            id=id
            )
        )
        
        self.db.add(db_landmark)
        await self.db.commit()
        await self.db.refresh(db_landmark)
        
        return db_landmark
    
    
    async def get_all_landmarks(self, *filter, offset: int = 0, limit: int = 100, **filter_by):
        
        landmarks = await LandmarkDAO.find_all(self.db, *filter, offset=offset, limit=limit, **filter_by)
        
        return landmarks or {"message": "no landmarks found"}
    
    
    async def get_existing_landmark(self, id: str = None, title: str = None) -> Landmark:
        
        if not id and not title: 
            raise exceptions.NoCredentials
        
        print(title)
        
        landmark = await LandmarkDAO.find_one_or_none(self.db,Landmark.id == id)
        if not landmark:
            await LandmarkDAO.find_one_or_none(self.db,Landmark.title == title)
               
        return landmark
    
    async def add_to_favorite(self, landmark_data: str, request: Request, token: str,):
        
        db_manager = AuthDatabaseManager(self.db)
        token_crud = db_manager.token_crud
        user_crud = db_manager.user_crud
        
        token = token.split()[1]
        user_id = await token_crud.get_access_token_payload(access_token=token)
        
        user = await user_crud.get_existing_user(user_id=user_id)
        
        favorite_landmarks = user.favorite_landmarks or []

        if landmark_data not in favorite_landmarks:
            favorite_landmarks.append(landmark_data)

            user_update_data = {"favorite_landmarks": favorite_landmarks}
            user_update = await UserDAO.update(self.db, User.id == user_id, obj_in=user_update_data)

            self.db.add(user_update)
            await self.db.commit()
            await self.db.refresh(user_update)

            return {"Message":"Add to favorite successfull"}
        else:
            return{"Message":"The landmark is already your favorite"}
    
    
    async def remove_from_favorite(self, landmark_data: str, request: Request, token: str):
        
        db_manager = AuthDatabaseManager(self.db)
        token_crud = db_manager.token_crud
        user_crud = db_manager.user_crud
        
        token = token.split()[1]
        user_id = await token_crud.get_access_token_payload(access_token=token)
        
        user = await user_crud.get_existing_user(user_id=user_id)
        
        favorite_landmarks = user.favorite_landmarks or []
    
        if landmark_data in favorite_landmarks:
            favorite_landmarks.remove(landmark_data)

            user_update_data = {"favorite_landmarks": favorite_landmarks}
            user_update = await UserDAO.update(self.db, User.id == user_id, obj_in=user_update_data)

            self.db.add(user_update)
            await self.db.commit()
            await self.db.refresh(user_update)

            return {"Message": "Remove from favorite successful"}
        else:
            return {"Message": "Landmark not found in favorites"}





        
        
    async def add_to_published(self, landmark_data: str, request: Request, token: str):
        
        db_manager = AuthDatabaseManager(self.db)
        token_crud = db_manager.token_crud
        user_crud = db_manager.user_crud
        
        token = token.split()[1]
        user_id = await token_crud.get_access_token_payload(access_token=token)
        
        user = await user_crud.get_existing_user(user_id=user_id)
        
        published_landmarks = user.published_landmarks or []
        
        published_landmarks.append(landmark_data)
        
        user_update_data = {"published_landmarks": published_landmarks}
        user_update = await UserDAO.update(self.db, User.id == user_id, obj_in=user_update_data)
        
        self.db.add(user_update)
        await self.db.commit()
        await self.db.refresh(user_update)
        
        return user

    
    async def delete_landmark(self, id: str = None, title: str = None, address: str = None) -> None:
        
        if not id and not str and not address: 
            raise exceptions.NoCredentials
        
        landmark = await self.get_existing_landmark(id=id, title=title)

        if not landmark:
            raise exceptions.LandmarkDoesNotExist
        
        await LandmarkDAO.delete(self.db, or_(
            id == Landmark.id,
            title == Landmark.title,
            address == Landmark.address))
        
        await self.db.commit()


class ReviewCrud:

    def __init__(self, db: AsyncSession):
        self.db = db

    
    async def create_review(self, title: str, stars: float, description: str):

        ReviewDAO.add()


        
    
    
class DatabaseManager:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.landmark_crud = LandmarkCrud(db)

    # Применение изменений к базе данных
    async def commit(self):
        await self.db.commit()