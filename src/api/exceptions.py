from fastapi import HTTPException


class NoCredentials(HTTPException):
    def __init__(self):
        super().__init__(status_code=404, detail="Credentials was not found")
        
        
class LandmarkAlreadyExists(HTTPException):
    def __init__(self):
        super().__init__(status_code=409, detail="Landmark already exists")
        
        
class LandmarkDoesNotExist(HTTPException):
    def __init__(self):
        super().__init__(status_code=409, detail="Landmark Does Not Exist")
        