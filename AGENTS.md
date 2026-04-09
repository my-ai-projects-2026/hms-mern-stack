# Agent Instructions & Tech Stack Context

This document provides system instructions, architectural context, and tech stack details for AI agents and developers working on this project.

## Tech Stack Overview

This project is built using a modern variant of the **MERN (MongoDB, Express, React, Node)** stack, enhanced with powerful modern tooling.

### 🧱 Full-Stack Core
- **Database**: MongoDB (MERN Stack)
- **Backend Framework**: Express.js (v5)
- **Frontend Library**: React (v19)
- **Runtime & Package Manager**: Bun
- **Language**: TypeScript (across both frontend and backend)

### 🖥️ Frontend (`/clients`)
- **Framework**: [TanStack Start](https://tanstack.com/start) / TanStack Router for type-safe routing and full-stack React capabilities.
- **Data Fetching**: TanStack React Query
- **Styling**: Tailwind CSS (v4) with `clsx` and `tailwind-merge` for class management.
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library
- **Linting & Formatting**: Biome (`biomejs`)

### ⚙️ Backend (`/backend`)
- **Server**: Express.js 
- **Security & Utilities**: Helmet, CORS, Cookie-Parser, Morgan (logging)
- **Architecture**: Standard REST API architecture.

## Project Structure
- `clients/`: Contains the frontend UI and TanStack Start application.
- `backend/`: Contains the Express server handling the standalone API logic and database interactions.
  - `middlewares/`: Express error handling and request processing middlewares (e.g., `error.middleware.ts`).
  - `utils/`: Reusable backend utility classes and functions (e.g., `ApiError.ts`).
  - `src/`: Core application source code.
    - `config/`: Configuration setups such as database connection parameters.
    - `controllers/`: Route request handlers and core business logic.
    - `lib/`: Shared backend libraries (e.g., `auth.ts`).
    - `server.ts`: Entry point for the Express backend application.

## Key Instructions for Agents

1. **Package Management**: Use `bun` for managing dependencies (`bun install`, `bun add`) instead of `npm` or `yarn`.
2. **TypeScript**: Write strict, well-typed TypeScript for all new files. Use type-only imports (`import type {}`) when importing types, as governed by `verbatimModuleSyntax`.
3. **Styling**: Use utility classes via Tailwind CSS v4. Avoid creating separate CSS files unless absolutely necessary.
4. **Backend Error Handling**: Use the existing `ApiError` utility and global error handlers. Ensure the global error handlers are always mounted at the very bottom of the Express routing stack.
5. **Formatting**: Rely on Biome for linting and formatting within the `clients` directory.
6. **Code Modification**: Always ask the user for permission before modifying the codebase.
