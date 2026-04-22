const express = require('express');
const router = express.Router();
const {
  registerUser,
  registerSeller,
  loginUser,
  loginSeller,
  logoutUser,
  getUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register/user', registerUser);
router.post('/register/seller', registerSeller);
router.post('/login/user', loginUser);
router.post('/login/seller', loginSeller);
router.post('/logout', logoutUser);
router.get('/me', protect, getUserProfile);

module.exports = router;
