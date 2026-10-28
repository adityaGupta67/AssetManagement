from datetime import date

from pydantic import BaseModel, ConfigDict
from uuid import UUID


class AssignmentCreate(BaseModel):
    employee_id: UUID
    asset_id: int


class AssignmentResponse(BaseModel):
    id: int
    employee_id: UUID
    asset_id: int
    assigned_date: date
    returned_date: date | None
    status: str

    model_config = ConfigDict(from_attributes=True)