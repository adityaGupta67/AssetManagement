from sqlalchemy import String, Float, Date
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class Asset(Base):
    __tablename__ = "assets"

    id: Mapped[int] = mapped_column(primary_key=True)

    asset_code: Mapped[str] = mapped_column(
        String(20),
        unique=True,
        nullable=False,
    )

    asset_name: Mapped[str] = mapped_column(String(100))

    category: Mapped[str] = mapped_column(String(50))

    brand: Mapped[str] = mapped_column(String(100))

    model: Mapped[str] = mapped_column(String(100))

    serial_number: Mapped[str] = mapped_column(
        String(100),
        unique=True,
    )

    purchase_date: Mapped[Date] = mapped_column(Date)

    purchase_cost: Mapped[float] = mapped_column(Float)

    status: Mapped[str] = mapped_column(
        String(20),
        default="Available",
    )