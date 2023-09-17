from typing import Optional
from fastapi import APIRouter, Depends, Request

from ..auth.service import DatabaseManager
from ..auth.dependencies import get_current_active_user, get_current_user
from ..auth.models import User
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_async_session
from ..auth import schemas

from .dao import *

router = APIRouter()

@router.post("/get_user_by_token", response_model=schemas.User)
async def get_user_by_token(
    request: Request,
    token: schemas.TokenEnd = None, 
    db: AsyncSession = Depends(get_async_session),
) -> Optional[User]:
    
    db_manager = DatabaseManager(db)
    user_crud = db_manager.user_crud
    
    if not token: 
        return await user_crud.get_user_by_token(request.cookies.get('refresh_token'))
    else: 
        return await user_crud.get_user_by_token(token.token) 

@router.get("/favorite_landmarks")
async def get_favorite_landmarks(
    request: Request,
    db: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(get_current_user),
    ):

    return current_user.favorite_landmarks

@router.get("/published_landmarks")
async def get_published_landmarks(
    request: Request,
    current_user: User = Depends(get_current_user),  
    db: AsyncSession = Depends(get_async_session),
    ):

    return current_user.published_landmarks


