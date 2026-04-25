require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const { initSocket } = require('./config/socket');
const { attachOrderEvents, getIO } = require('./sockets/orderSocket');

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.io
initSocket(server);
attachOrderEvents(require('./config/socket').getIO());

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
