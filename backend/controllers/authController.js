const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { z } = require('zod');
const User = require('../models/User');

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(10, 'Valid phone number required'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Generate JWT and set cookie
const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

// @desc    Register a new user
// @route   POST /api/auth/register/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // Validate request
  const validationResult = registerSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400);
    throw new Error(validationResult.error.errors[0].message);
  }

  const { name, email, password, phone } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: 'user',
  });

  if (user) {
    generateTokenAndSetCookie(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Register a new seller
// @route   POST /api/auth/register/seller
// @access  Public
const registerSeller = asyncHandler(async (req, res) => {
  // Validate request
  const validationResult = registerSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400);
    throw new Error(validationResult.error.errors[0].message);
  }

  const { name, email, password, phone } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create seller (User with role shopkeeper)
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: 'shopkeeper',
  });

  if (user) {
    generateTokenAndSetCookie(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login/user
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const validationResult = loginSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400);
    throw new Error(validationResult.error.errors[0].message);
  }

  const { email, password } = req.body;

  // Check for user email and include password to match
  const user = await User.findOne({ email }).select('+password');

  if (user && user.role === 'user' && (await user.matchPassword(password))) {
    generateTokenAndSetCookie(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Auth seller & get token (Login)
// @route   POST /api/auth/login/seller
// @access  Public
const loginSeller = asyncHandler(async (req, res) => {
  const validationResult = loginSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400);
    throw new Error(validationResult.error.errors[0].message);
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (user && user.role === 'shopkeeper' && (await user.matchPassword(password))) {
    generateTokenAndSetCookie(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  registerUser,
  registerSeller,
  loginUser,
  loginSeller,
  logoutUser,
  getUserProfile,
};
