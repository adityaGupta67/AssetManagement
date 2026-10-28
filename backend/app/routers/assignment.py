from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import require_admin
from app.models.employee import Employee
from app.models.asset import Asset
from app.models.assignment import AssetAssignment
from app.schemas.assignment import (
    AssignmentCreate,
    AssignmentResponse,
)


router = APIRouter(
    prefix="/assignments",
    tags=["Assignments"],
)


# --------------------------------------------------
# ASSIGN ASSET - ADMIN ONLY
# --------------------------------------------------

@router.post(
    "/",
    response_model=AssignmentResponse,
)
def assign_asset(
    assignment_data: AssignmentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    employee = (
        db.query(Employee)
        .filter(
            Employee.id == assignment_data.employee_id
        )
        .first()
    )

    if employee is None:
        raise HTTPException(
            status_code=404,
            detail="Employee not found",
        )

    asset = (
        db.query(Asset)
        .filter(
            Asset.id == assignment_data.asset_id
        )
        .first()
    )

    if asset is None:
        raise HTTPException(
            status_code=404,
            detail="Asset not found",
        )

    if asset.status != "Available":
        raise HTTPException(
            status_code=400,
            detail="Asset is not available",
        )

    assignment = AssetAssignment(
        employee_id=employee.id,
        asset_id=asset.id,
        assigned_date=date.today(),
        status="Assigned",
    )

    asset.status = "Assigned"

    db.add(assignment)
    db.commit()
    db.refresh(assignment)

    return assignment


# --------------------------------------------------
# RETURN ASSET - ADMIN ONLY
# --------------------------------------------------

@router.put(
    "/{assignment_id}/return",
    response_model=AssignmentResponse,
)
def return_asset(
    assignment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    assignment = (
        db.query(AssetAssignment)
        .filter(
            AssetAssignment.id == assignment_id
        )
        .first()
    )

    if assignment is None:
        raise HTTPException(
            status_code=404,
            detail="Assignment not found",
        )

    if assignment.status != "Assigned":
        raise HTTPException(
            status_code=400,
            detail="Asset has already been returned",
        )

    asset = (
        db.query(Asset)
        .filter(
            Asset.id == assignment.asset_id
        )
        .first()
    )

    if asset is None:
        raise HTTPException(
            status_code=404,
            detail="Asset not found",
        )

    assignment.status = "Returned"
    assignment.returned_date = date.today()

    asset.status = "Available"

    db.commit()
    db.refresh(assignment)

    return assignment


# --------------------------------------------------
# GET ALL ASSIGNMENTS - ADMIN ONLY
# --------------------------------------------------

@router.get(
    "/",
    response_model=list[AssignmentResponse],
)
def get_assignments(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    assignments = (
        db.query(AssetAssignment)
        .all()
    )

    return assignments