# Zenovo — Curated Experiences

This repository contains a full-stack booking system showcasing the Zenovo curated experiences marketplace.

## Backend
- `.NET 8` Web API
- `Entity Framework Core` with SQL Server (LocalDB)
- Swagger API documentation
- Requires a local `.NET` SDK installation to build and run

## Frontend
- `React` + `TypeScript`
- `Vite`
- `Tailwind CSS`

## Setup

### Backend
1. Open a terminal in `server`.
2. Run `dotnet restore`.
3. Run `dotnet run`.

The API will listen at `http://localhost:5000` by default.

### Backend .env
1. Copy `.env.example` to `.env`.
2. Update the `ConnectionStrings__DefaultConnection` value if you want to use a different SQL Server instance.

### Frontend
1. Open a terminal in `client`.
2. Run `npm install`.
3. Run `npm run dev`.

The frontend will run at `http://localhost:5173` and proxy `/api` requests to the backend.

## Default Admin
-- Email: `admin@zenovo.com`
-- Password: `Admin@123`

## Important Notes
- The backend uses `appsettings.json` with a LocalDB connection string. Update `server/appsettings.json` if you prefer SQL Server or PostgreSQL.
- Use Swagger for API testing at `http://localhost:5000/swagger` once the backend is running.
