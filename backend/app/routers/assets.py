from datetime import date
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user, require_admin
from app.models.asset import Asset
from app.models.assignment import AssetAssignment
from app.models.employee import Employee
from app.schemas.assets import (
    AssetCreate,
    AssetUpdate,
    AssetResponse,
)


router = APIRouter(
    prefix="/assets",
    tags=["Assets"],
)


# --------------------------------------------------
# ASSIGNMENT REQUEST SCHEMA
# --------------------------------------------------

class AssignAssetRequest(BaseModel):
    employee_id: UUID
    assigned_date: date


# --------------------------------------------------
# CREATE ASSET - ADMIN ONLY
# --------------------------------------------------

@router.post("/", response_model=AssetResponse)
def create_asset(
    asset_data: AssetCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    existing_asset = (
        db.query(Asset)
        .filter(Asset.asset_code == asset_data.asset_code)
        .first()
    )

    if existing_asset:
        raise HTTPException(
            status_code=400,
            detail="Asset code already exists",
        )

    asset = Asset(
        asset_code=asset_data.asset_code,
        asset_name=asset_data.asset_name,
        category=asset_data.category,
        brand=asset_data.brand,
        model=asset_data.model,
        serial_number=asset_data.serial_number,
        purchase_date=asset_data.purchase_date,
        purchase_cost=asset_data.purchase_cost,
        status="Available",
    )

    db.add(asset)
    db.commit()
    db.refresh(asset)

    return asset


# --------------------------------------------------
# GET ALL ASSETS - ADMIN ONLY
# --------------------------------------------------

@router.get("/", response_model=list[AssetResponse])
def get_assets(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return db.query(Asset).all()


# --------------------------------------------------
# ASSIGN ASSET - ADMIN ONLY
# --------------------------------------------------

@router.post("/{asset_id}/assign")
def assign_asset(
    asset_id: int,
    data: AssignAssetRequest,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    asset = (
        db.query(Asset)
        .filter(Asset.id == asset_id)
        .first()
    )

    if asset is None:
        raise HTTPException(
            status_code=404,
            detail="Asset not found",
        )

    if asset.status == "Assigned":
        raise HTTPException(
            status_code=400,
            detail="Asset is already assigned",
        )

    employee = (
        db.query(Employee)
        .filter(Employee.id == data.employee_id)
        .first()
    )

    if employee is None:
        raise HTTPException(
            status_code=404,
            detail="Employee not found",
        )

    if employee.status != "Active":
        raise HTTPException(
            status_code=400,
            detail="Cannot assign an asset to an inactive employee",
        )

    assignment = AssetAssignment(
        asset_id=asset.id,
        employee_id=employee.id,
        assigned_date=data.assigned_date,
        status="Assigned",
    )

    asset.status = "Assigned"

    try:
        db.add(assignment)
        db.commit()
        db.refresh(assignment)
    except Exception:
        db.rollback()
        raise

    return {
        "message": "Asset assigned successfully",
        "assignment_id": assignment.id,
        "asset_id": asset.id,
        "asset_code": asset.asset_code,
        "employee_id": str(employee.id),
        "employee_name": employee.name,
        "assigned_date": assignment.assigned_date,
        "status": assignment.status,
    }


# --------------------------------------------------
# GET MY ASSETS - AUTHENTICATED USER
# --------------------------------------------------

@router.get("/my-assets")
def get_my_assets(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    assignments = (
        db.query(AssetAssignment)
        .join(
            Employee,
            Employee.id == AssetAssignment.employee_id,
        )
        .filter(
            Employee.user_id == current_user.id,
            AssetAssignment.status == "Assigned",
        )
        .all()
    )

    return [
        {
            "id": assignment.asset.id,
            "asset_code": assignment.asset.asset_code,
            "asset_name": assignment.asset.asset_name,
            "category": assignment.asset.category,
            "status": assignment.asset.status,
            "assigned_date": assignment.assigned_date,
        }
        for assignment in assignments
    ]


# --------------------------------------------------
# GET SINGLE ASSET - ADMIN ONLY
# --------------------------------------------------

@router.get("/{asset_id}", response_model=AssetResponse)
def get_asset(
    asset_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    asset = (
        db.query(Asset)
        .filter(Asset.id == asset_id)
        .first()
    )

    if asset is None:
        raise HTTPException(
            status_code=404,
            detail="Asset not found",
        )

    return asset


# --------------------------------------------------
# UPDATE ASSET - ADMIN ONLY
# --------------------------------------------------

@router.put("/{asset_id}", response_model=AssetResponse)
def update_asset(
    asset_id: int,
    asset_data: AssetUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    asset = (
        db.query(Asset)
        .filter(Asset.id == asset_id)
        .first()
    )

    if asset is None:
        raise HTTPException(
            status_code=404,
            detail="Asset not found",
        )

    asset.asset_name = asset_data.asset_name
    asset.category = asset_data.category
    asset.brand = asset_data.brand
    asset.model = asset_data.model
    asset.purchase_date = asset_data.purchase_date
    asset.purchase_cost = asset_data.purchase_cost

    db.commit()
    db.refresh(asset)

    return asset


# --------------------------------------------------
# DELETE ASSET - ADMIN ONLY
# --------------------------------------------------

@router.delete("/{asset_id}")
def delete_asset(
    asset_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    asset = (
        db.query(Asset)
        .filter(Asset.id == asset_id)
        .first()
    )

    if asset is None:
        raise HTTPException(
            status_code=404,
            detail="Asset not found",
        )

    assignment_history = (
        db.query(AssetAssignment)
        .filter(AssetAssignment.asset_id == asset_id)
        .first()
    )

    if assignment_history:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete asset because assignment history exists.",
        )

    db.delete(asset)
    db.commit()

    return {"message": "Asset deleted successfully"}
