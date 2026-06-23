from fastapi import FastAPI
from app.api.health import router as health_router

app = FastAPI(
    title="Fashion News Agent"
)

app.include_router(health_router)

@app.get("/")
def home():
    return {
        "success": True,
        "message": "AI Service Running"
    }