! Asset Management System

A full-stack web application for managing company assets, employees, and asset assignments. The system provides an API-driven backend and a web frontend for organizing company resources.

!! Features

- Employee management
- Company asset management
- Assign assets to employees
- User authentication and authorization
- REST API for frontend-backend communication
- PostgreSQL database integration
- Database migrations with Alembic

// Tech Stack

//Frontend
- React
- JavaScript
- CSS / frontend styling framework used in this project

//Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT authentication
- Alembic

//Database
- PostgreSQL

//Development Tools
- uv
- Git and GitHub

// Project Structure

text
AssetManagemen/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── models/
│   │   ├── routers/
│   │   └── schemas/
│   ├── alembic/
│   ├── alembic.ini
│   ├── pyproject.toml
│   └── uv.lock
├── frontend/
├── .gitignore
└── README.md


//Prerequisites

Install the following before running the project:

- Python
- uv
- Node.js and npm
- PostgreSQL

//Backend Setup

Open a terminal in the backend directory:

bash
cd backend


Install the Python dependencies:

bash
uv sync


Create a .env file using the required environment variables. For example:

dotenv
DATABASE_URL=your_database_connection_url


Replace the example value with your actual PostgreSQL connection URL. Never commit real credentials or secret keys.

Start the backend server:

bash
uv run uvicorn app.main:app --reload


The API should be available at:

http://127.0.0.1:8000

Interactive API documentation:

http://127.0.0.1:8000/docs
 
//Frontend Setup

Open another terminal:

bash
cd frontend
npm install


Start the development server:

bash
npm run dev


Open the local URL displayed in your terminal.

Environment Variables

Configure the environment variables required by the backend and frontend before running the application. Keep sensitive values in local environment files and provide safe example files when sharing the project.

Future Improvements

- Add automated tests
- Improve error handling and logging
- Add reporting and analytics
- Deploy the application to a production environment

Author

Developed as a full-stack software development project.
