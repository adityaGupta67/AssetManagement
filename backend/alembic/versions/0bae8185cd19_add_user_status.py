"""add user status

Revision ID: 0bae8185cd19
Revises: c5a20f8cbadb
Create Date: 2026-08-18 13:37:10.137622
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "0bae8185cd19"
down_revision: Union[str, Sequence[str], None] = "c5a20f8cbadb"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column(
            "status",
            sa.String(length=20),
            nullable=False,
            server_default="Active",
        ),
    )


def downgrade() -> None:
    op.drop_column(
        "users",
        "status",
    )