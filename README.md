# Zenovo — Curated Experiences

A full-stack booking system showcasing the Zenovo curated experiences marketplace.

Summary
- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** .NET 8 Web API + Entity Framework Core
- **DB:** LocalDB (SQL Server) by default

Quick start

Backend (server)

1. Open a terminal in the `server` folder.
2. Restore dependencies and run:

```powershell
**Zenovo — Curated Experiences**

A full-stack booking marketplace for curated experiences. This repository contains the frontend app (React + TypeScript) and the backend API (.NET 8) used to manage businesses, offers, slots, and bookings.

One-minute prototype demo: [Watch the 1-minute demo](REPLACE_WITH_VIDEO_LINK)

Table of contents

- Overview
- Features
- Architecture
- Quick start
- Configuration
- Developing
- API
- Demo
- Contributing
- License & contact

Overview

Zenovo is a marketplace where businesses can publish experience offers, manage available slots, and accept bookings. The project is split into two main folders: [client](client) (frontend) and [server](server) (backend).

Features

- Public offers listing and search
- Offer detail pages with booking flow
- Business owner flows: create/edit offers and manage slots
- Admin dashboard for managing offers and bookings
- Email-like booking confirmation flow (local/dev)

Architecture

- Frontend: React, TypeScript, Vite, Tailwind CSS — source in [client/src](client/src)
- Backend: .NET 8 Web API, Entity Framework Core — source in [server](server)
- Database: LocalDB (SQL Server) by default; connection in [server/appsettings.json](server/appsettings.json)

Quick start

Prerequisites

- .NET 8 SDK
- Node.js (16+) and npm

Run backend

```powershell
cd server
dotnet restore
dotnet run
```

Run frontend

```bash
cd client
npm install
npm run dev
```
Configuration

- Update database connection and other settings in [server/appsettings.json](server/appsettings.json).
- For production, use environment variables or your deployment platform's secrets to override connection strings.

Developing

- Frontend source: [client/src](client/src)
- Backend source: [server](server)
- Run both locally for end-to-end testing.

