from ..auth.models import User
from ..auth.schemas import UserCreateDB, UserUpdate
from ..dao import BaseDAO


class UserDAO(BaseDAO[User, UserCreateDB, UserUpdate]):
    model = User