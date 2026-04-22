require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const configureSocket = require('./config/socket');

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.io
configureSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
