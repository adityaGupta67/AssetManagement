from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from app.dependencies import (
    get_db,
    get_current_user,
    require_admin,
)
from app.models.employee import Employee
from app.models.assignment import AssetAssignment
from app.models.user import User
from app.schemas.employee import (
    EmployeeCreate,
    EmployeeUpdate,
    EmployeeResponse,
)
from app.core.exceptions import EmployeeNotFound
from app.core.security import hash_password


router = APIRouter(
    prefix="/employees",
    tags=["Employees"],
)


# --------------------------------------------------
# CREATE EMPLOYEE - ADMIN ONLY
# --------------------------------------------------

@router.post("/", response_model=EmployeeResponse)
def create_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    existing_user = (
        db.query(User)
        .filter(User.username == employee.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User account already exists",
        )

    new_user = User(
        username=employee.email,
        password=hash_password(employee.password),
        role="Employee",
    )

    db.add(new_user)
    db.flush()

    new_employee = Employee(
        user_id=new_user.id,
        employee_code=employee.employee_code,
        name=employee.name,
        email=employee.email,
        phone=employee.phone,
        department=employee.department,
        designation=employee.designation,
        joining_date=employee.joining_date,
    )

    db.add(new_employee)

    db.commit()
    db.refresh(new_employee)

    return new_employee


# --------------------------------------------------
# GET ALL EMPLOYEES - ADMIN ONLY
# --------------------------------------------------

@router.get("/", response_model=list[EmployeeResponse])
def get_employees(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    employees = db.query(Employee).all()

    return employees


# --------------------------------------------------
# GET MY PROFILE - AUTHENTICATED USER
# --------------------------------------------------

@router.get("/me", response_model=EmployeeResponse)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    employee = (
        db.query(Employee)
        .filter(Employee.user_id == current_user.id)
        .first()
    )

    if employee is None:
        raise EmployeeNotFound(
            "Employee profile not found"
        )

    return employee


# --------------------------------------------------
# GET EMPLOYEE BY ID - ADMIN ONLY
# --------------------------------------------------

@router.get("/{employee_id}", response_model=EmployeeResponse)
def get_employee(
    employee_id: UUID,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    employee = (
        db.query(Employee)
        .filter(Employee.id == employee_id)
        .first()
    )

    if employee is None:
        raise EmployeeNotFound(
            "Employee not found"
        )

    return employee


# --------------------------------------------------
# UPDATE EMPLOYEE - ADMIN ONLY
# --------------------------------------------------

@router.put("/{employee_id}", response_model=EmployeeResponse)
def update_employee(
    employee_id: UUID,
    employee_data: EmployeeUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    employee = (
        db.query(Employee)
        .filter(Employee.id == employee_id)
        .first()
    )

    if employee is None:
        raise EmployeeNotFound(
            "Employee not found"
        )

    employee.name = employee_data.name
    employee.email = employee_data.email
    employee.phone = employee_data.phone
    employee.department = employee_data.department
    employee.designation = employee_data.designation

    db.commit()
    db.refresh(employee)

    return employee


# --------------------------------------------------
# DELETE EMPLOYEE - ADMIN ONLY
# --------------------------------------------------
@router.delete("/{employee_id}")
def delete_employee(
    employee_id: UUID,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    employee = (
        db.query(Employee)
        .filter(Employee.id == employee_id)
        .first()
    )

    if employee is None:
        raise EmployeeNotFound(
            "Employee not found"
        )

    # Check if employee currently has an assigned asset
    active_assignment = (
        db.query(AssetAssignment)
        .filter(
            AssetAssignment.employee_id == employee_id,
            AssetAssignment.status == "Assigned",
        )
        .first()
    )

    if active_assignment:
        raise HTTPException(
            status_code=400,
            detail=(
                "Cannot deactivate employee while they "
                "have assigned assets. Return the assets first."
            ),
        )

    # Deactivate employee
    employee.status = "Inactive"

    # Find the User account linked to this employee
    user = (
        db.query(User)
        .filter(User.id == employee.user_id)
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="Linked user account not found",
        )

    # Deactivate the User account too
    user.status = "Inactive"

    db.commit()
    db.refresh(employee)

    return {
        "message": "Employee deactivated successfully",
        "employee_id": employee.id,
        "status": employee.status,
    }