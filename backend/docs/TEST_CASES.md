# MarQet Test Cases

This document outlines the core operational scenarios for MarQet backend validation.

## 1. Order & Payment Combinations
- ✅ **pickup + cash_pickup (valid)**
  - Users choosing pickup must select either cash_pickup, upi, or paylater. 
- ❌ **pickup + cash_delivery (invalid)**
  - Should throw an error: `Invalid paymentType 'cash_delivery' for mode 'pickup'`.
- ❌ **delivery + platform on non-subscribed shop (invalid)**
  - Should throw an error: `Shop must be subscribed to use platform delivery`.
- ✅ **delivery + platform on subscribed shop (valid)**
  - Order should successfully process if the shop has an active Premium/Basic subscription.

## 2. PayLater Flow
- ✅ **PayLater Full Flow**
  1. User places order with `paymentType="paylater"`.
  2. Order is created with `payLaterStatus="pending_approval"`.
  3. Shopkeeper approves the request.
  4. User's `creditBalance` goes up; a pending `creditHistory` log is created.
  5. User repays the exact amount.
  6. User's `creditBalance` drops; the log is marked as `paid`.

## 3. Product Search & AI Compare
- ✅ **Search "milk"**
  - Returns direct matches ("milk") and Hindi variants ("doodh") thanks to the internal `normalizeProduct` dictionary.
  - Automatically sorted with the cheapest option first.
  - The absolute cheapest option contains the boolean flag `isCheapest: true`.

## 4. WebSockets & Real-Time Events
- ✅ **Socket: New Order**
  - When an order is placed, `socketService.notifyShop` emits the `newOrder` event directly to the specific `shop_{id}` room.
- ✅ **Socket: Order Updates**
  - Status updates emit `orderStatusUpdate` directly to the `user_{id}` room.

## 5. Order State Machine Validation
- ✅ **State Transitions**
  - The system enforces `placed -> packed -> ready -> delivered`.
  - Cannot skip states (e.g., jumping from `placed` directly to `delivered` throws a transition error).
  - Cannot regress backward in the chain.
