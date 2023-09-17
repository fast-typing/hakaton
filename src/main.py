from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from src.api.routers import router as api_router
from src.auth.routers import router as auth_router
from src.profile.routers import router as profile_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title='hatakon'
)

app.include_router(api_router, tags=["API"])
app.include_router(auth_router, tags=["AUTH"])
app.include_router(profile_router, tags=["PROFILE"])

origins = [
    "http://localhost",
    "http://localhost:8000",
    "*",
]

# Добавление middleware для CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)