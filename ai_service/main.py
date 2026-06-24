from fastapi import FastAPI
from app.api.health import router as health_router
from app.api.news import router as news_router
from app.api.analysis import router as analysis_router
from app.workflows.news_scheduler import start_scheduler

app = FastAPI(title="Fashion News Agent")

@app.on_event("startup")
async def startup_event():

    start_scheduler()

app.include_router(health_router)
app.include_router(news_router)
app.include_router(analysis_router)



@app.get("/")
def home():
    return {"success": True, "message": "AI Service Running"}
