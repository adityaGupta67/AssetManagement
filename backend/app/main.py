from fastapi import FastAPI
from sqlalchemy import text
from app.database import Base, engine
from app.models.employee import Employee
from app.models.asset import Asset
from app.models.assignment import AssetAssignment
from app.models.user import User
from app.routers.employee import router as employee_router
from app.routers.assets import router as asset_router
from app.routers.assignment import router as assignment_router
from app.routers.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
app.include_router(employee_router)
app.include_router(asset_router)
app.include_router(assignment_router)
app.include_router(auth_router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Asset Management API is running"}

@app.get("/db-test")
def db_test():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version();"))
        return {"database": result.scalar()}


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)