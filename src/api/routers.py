from typing import Optional
from fastapi import APIRouter, Depends, Request, Response
from sqlalchemy.ext.asyncio import AsyncSession

from .dao import LandmarkDAO
from .service import DatabaseManager
from .schemas import LandmarkCreate, LandmarkBase, Landmark, LandmarkId
from ..database import get_async_session


router = APIRouter()


@router.post("/create_landmark/", response_model=Landmark)
async def create_landmark(
    request: Request,
    landmark_data: LandmarkCreate,
    token: str,
    db: AsyncSession = Depends(get_async_session),
) -> Landmark:
    db_manager = DatabaseManager(db)
    landmark_crud = db_manager.landmark_crud
    
    if token: 
        return await landmark_crud.create_landmark(token=token, request=request, landmark=landmark_data)


@router.post("/get_landmark/", response_model=Landmark)
async def get_landmark(
    landmark_data: LandmarkId,
    db: AsyncSession = Depends(get_async_session),
) -> Landmark:
    db_manager = DatabaseManager(db)
    landmark_crud = db_manager.landmark_crud
    
    return await landmark_crud.get_existing_landmark(id=landmark_data.id)


# Получение списка всех пользователей
@router.get("/read_all_landmarks")
async def get_all_landmarks(
    offset: int = 0,
    limit: int = 10,
    db: AsyncSession = Depends(get_async_session),
):
    db_manager = DatabaseManager(db)
    landmark_crud = db_manager.landmark_crud
    
    return await landmark_crud.get_all_landmarks(offset=offset, limit=limit)



@router.delete("/delete_landmark")
async def delete_landmark(
    id: str = None,
    title: str = None,
    address: str = None,
    db: AsyncSession = Depends(get_async_session),
):
    
    db_manager = DatabaseManager(db)
    landmark_crud = db_manager.landmark_crud
    
    await landmark_crud.delete_landmark(id=id, title=title, address=address)
    
    return {"message": "Deleting successful"}


@router.post("/add_to_favorite")
async def add_to_favorite(
    request: Request,
    landmark_id: LandmarkId,
    token: str,
    db: AsyncSession = Depends(get_async_session),
):
      
    db_manager = DatabaseManager(db)
    landmark_crud = db_manager.landmark_crud
    
    return await landmark_crud.add_to_favorite(token=token, request=request, landmark_data=landmark_id.id)


@router.post("/remove_from_favorite")
async def remove_from_favorite(
    request: Request,
    landmark_id: LandmarkId,
    token: str,
    db: AsyncSession = Depends(get_async_session),
):
      
    db_manager = DatabaseManager(db)
    landmark_crud = db_manager.landmark_crud
    
    return await landmark_crud.remove_from_favorite(token=token, request=request, landmark_data=landmark_id.id)

