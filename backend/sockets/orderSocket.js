// Event Constants
const NEW_ORDER = 'newOrder';
const ORDER_STATUS_UPDATE = 'orderStatusUpdate';
const PAYLATER_APPROVED = 'paylaterApproved';
const PAYLATER_REJECTED = 'paylaterRejected';
const ORDER_CANCELLED = 'orderCancelled';

// Attach specific listeners to the socket io instance (for future use)
const attachOrderEvents = (io) => {
  io.on('connection', (socket) => {
    // We could add listeners for client-side order events here,
    // e.g. socket.on('typing', ...)
  });
};

module.exports = {
  NEW_ORDER,
  ORDER_STATUS_UPDATE,
  PAYLATER_APPROVED,
  PAYLATER_REJECTED,
  ORDER_CANCELLED,
  attachOrderEvents,
};
