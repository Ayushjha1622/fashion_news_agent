from fastapi import FastAPI
from app.api.health import router as health_router
from app.api.news import router as news_router
from app.api.analysis import router as analysis_router
from app.api.topic import router as topic_router
from app.api.competitor import router as competitor_router
from app.api.source import router as source_router
from app.workflows.news_scheduler import start_scheduler
from fastapi.middleware.cors import CORSMiddleware
from app.api.brief import (router as brief_router)
from app.api.dashboard import (router as dashboard_router)
from app.api.analytics import (router as analytics_router)
app = FastAPI(title="Fashion News Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():

    start_scheduler()

app.include_router(health_router)
app.include_router(news_router)
app.include_router(analysis_router)
app.include_router(topic_router)
app.include_router(competitor_router)
app.include_router(source_router)
app.include_router(brief_router)
app.include_router(dashboard_router)
app.include_router(analytics_router)



@app.get("/")
def home():
    return {"success": True, "message": "AI Service Running"}
