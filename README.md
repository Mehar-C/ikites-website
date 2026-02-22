# Kites Website

A basic **Java** (Spring Boot) backend with a **JavaScript** (React + Vite) frontend.

## Prerequisites

- **Java 17+** and **Maven** for the backend
- **Node.js 18+** and **npm** for the frontend

## Run the backend (Java)

```bash
cd backend
mvn spring-boot:run
```

API runs at **http://localhost:8080**. Try: http://localhost:8080/api/hello

## Run the frontend (JavaScript)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:3000**. It proxies `/api` requests to the backend, so start the backend first if you want the "Hello from Kites backend!" message.

## Project structure

- `backend/` – Spring Boot REST API (Java)
- `frontend/` – React app with Vite (JavaScript, no TypeScript)
