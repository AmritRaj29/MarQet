const { getIO } = require('../config/socket');

module.exports = {
  notifyShop: (shopId, event, data) => {
    const io = getIO();
    io.to(`shop_${shopId}`).emit(event, data);
  },
  notifyUser: (userId, event, data) => {
    const io = getIO();
    io.to(`user_${userId}`).emit(event, data);
  }
};
