from fastapi import APIRouter
from app.core.database import db

router = APIRouter()

@router.get("/health")
def health():
    try:
        db.command("ping")

        return {
            "status": "healthy",
            "database": "connected"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }