from datetime import date
from pydantic import BaseModel, ConfigDict


class AssetCreate(BaseModel):
    asset_code: str
    asset_name: str
    category: str
    brand: str
    model: str
    serial_number: str
    purchase_date: date
    purchase_cost: float


class AssetUpdate(BaseModel):
    asset_name: str
    category: str
    brand: str
    model: str
    purchase_date: date
    purchase_cost: float


class AssetResponse(BaseModel):
    id: int
    asset_code: str
    asset_name: str
    category: str
    brand: str
    model: str
    serial_number: str
    purchase_date: date
    purchase_cost: float
    status: str

    model_config = ConfigDict(
        from_attributes=True
    )