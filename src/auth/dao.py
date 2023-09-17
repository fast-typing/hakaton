from .models import User, Refresh_token
from .schemas import RefreshSessionCreate, RefreshSessionUpdate, UserCreateDB, UserUpdate
from ..dao import BaseDAO


class UserDAO(BaseDAO[User, UserCreateDB, UserUpdate]):
    model = User


class RefreshTokenDAO(BaseDAO[Refresh_token, RefreshSessionCreate, RefreshSessionUpdate]):
    model = Refresh_token
    