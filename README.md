# MarQet

A hyperlocal marketplace built with a modern full-stack architecture.

## Architecture

This project is a monorepo containing three main workspaces:
- `client`: Next.js 14 frontend (App Router, TailwindCSS, shadcn/ui, Framer Motion, GSAP).
- `server`: Node.js Express backend (TypeScript, MongoDB, Socket.io).
- `shared`: Shared TypeScript types and interfaces.

## Prerequisites
- Node.js (v18+)
- npm
- MongoDB (running locally or via MongoDB Atlas)

## Setup Instructions

1. Install dependencies from the root directory:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `server/.env.example` to `server/.env` and update the values.
   - Copy `client/.env.example` to `client/.env` and update the values.

3. Run the development environment:
   ```bash
   npm run dev
   ```
   This will start both the client and server concurrently using npm workspaces.
