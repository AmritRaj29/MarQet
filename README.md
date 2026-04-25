# MarQet

A hyperlocal marketplace built with a modern full-stack architecture.

## Architecture

This project is a monorepo containing three main workspaces:
- `client`: Next.js 14 frontend (App Router, TailwindCSS, shadcn/ui, Framer Motion, GSAP).
- `backend`: Node.js Express backend (TypeScript, MongoDB, Socket.io).
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

2. **Environment Variables (`backend/.env`)**:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:3000
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

3. **How to Run**:
   ```bash
   npm run dev
   ```
   This starts both the client and backend concurrently using npm workspaces.

## API Overview

| Feature | Endpoint | Method | Role | Description |
|---|---|---|---|---|
| **Auth** | `/api/auth/register` | POST | Public | Register user/shopkeeper |
| **Auth** | `/api/auth/login` | POST | Public | Login |
| **Auth** | `/api/auth/me` | GET | Protected | Get profile |
| **Auth** | `/api/auth/location` | PATCH | Protected | Update location |
| **Shops** | `/api/shops` | POST | Shopkeeper | Create a shop |
| **Shops** | `/api/shops/nearby` | GET | Protected | Find shops via `$near` |
| **Products** | `/api/products` | POST | Shopkeeper | Create product |
| **Products** | `/api/products/shop/:id` | GET | Public | Products by shop |
| **Orders** | `/api/orders` | POST | Protected | Create order |
| **Orders** | `/api/orders/:id/status` | PATCH | Shopkeeper | Update status |
| **Payments** | `/api/payments/paylater/:id/approve` | PATCH | Shopkeeper | Approve credit |
| **Payments** | `/api/payments/credit/repay` | POST | Protected | Repay balance |
| **Search** | `/api/search` | GET | Public | Search items (AI-style) |
| **Search** | `/api/search/compare` | GET | Public | Price comparison |

## Real-Time Events (Socket.io)

Clients must connect and emit a `join` event with their `{ userId, role, shopId }` to join their room (`user_ID` or `shop_ID`).

| Event | Target | Description |
|---|---|---|
| `newOrder` | Shopkeeper | Emitted when a new order is placed at their shop. |
| `orderStatusUpdate` | User | Emitted when their order transitions (e.g. packed, ready). |
| `orderCancelled` | Shopkeeper | Emitted when a user cancels an order. |
| `paylaterApproved` | User | Emitted when a shopkeeper approves their PayLater request. |
| `paylaterRejected` | User | Emitted when a shopkeeper rejects their PayLater request. |

## Test Case Checklist

- [x] **pickup + cash_pickup**: Valid payment combination.
- [x] **pickup + cash_delivery**: Invalid payment combination (rejected).
- [x] **delivery + platform on non-subscribed shop**: Rejected based on subscription logic.
- [x] **delivery + platform on subscribed shop**: Successfully processed.
- [x] **PayLater Full Flow**: Order placed -> Approved -> User credit drops -> User repays -> Log marked paid.
- [x] **Smart Keyword Search**: Searching "milk" returns "doodh" via internal dictionary, sorted cheapest first.
- [x] **Socket Notifications**: New orders dynamically ping the specific shop's socket room.
- [x] **State Machine Security**: Order status strictly enforces `placed -> packed -> ready -> delivered`.
