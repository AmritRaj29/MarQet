const requireRole = (...roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403);
      throw new Error(`Not authorized, required role: ${roles.join(' or ')}`);
    }
  };
};

module.exports = { requireRole };
