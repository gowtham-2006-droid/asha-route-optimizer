from fastapi import APIRouter
from app.api.v1 import auth, patients, routes, dashboard, workers, villages

api_v1_router = APIRouter()
api_v1_router.include_router(auth.router)
api_v1_router.include_router(patients.router)
api_v1_router.include_router(routes.router)
api_v1_router.include_router(dashboard.router)
api_v1_router.include_router(workers.router)
api_v1_router.include_router(villages.router)
