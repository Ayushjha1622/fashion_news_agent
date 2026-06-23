from app.core.database import db

def get_active_sources():

    sources = list(db.sources.find({}))

    return sources