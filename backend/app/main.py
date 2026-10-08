from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes.farm import router as farm_router
from .config import get_settings

settings = get_settings()
app = FastAPI(title=settings.app_name, version="0.3.0")
app.add_middleware(CORSMiddleware, allow_origins=settings.allowed_origins, allow_credentials=False, allow_methods=["GET"], allow_headers=["*"])
app.include_router(farm_router, prefix="/api/v1")


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "vivasaiyi-phase-3"}
