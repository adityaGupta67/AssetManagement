from datetime import date, datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class EmployeeCreate(BaseModel):
    employee_code: str
    name: str
    email: str
    phone: str
    department: str
    designation: str
    joining_date: date
    password: str


class EmployeeUpdate(BaseModel):
    name: str
    email: str
    phone: str
    department: str
    designation: str


class EmployeeResponse(BaseModel):
    id: UUID
    user_id: int | None
    employee_code: str
    name: str
    email: str
    phone: str
    department: str
    designation: str
    joining_date: date
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)