const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user (user or shopkeeper)
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role, location, address } = req.body;

  // Validate required fields
  if (!name || !email || !password || !phone) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Convert location to GeoJSON if provided
  let geoJsonLocation = { type: 'Point', coordinates: [0, 0] };
  if (location && location.lat !== undefined && location.lng !== undefined) {
    geoJsonLocation = {
      type: 'Point',
      coordinates: [location.lng, location.lat]
    };
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: role || 'user',
    location: geoJsonLocation,
    address: address || '',
  });

  if (user) {
    const token = generateToken(user._id, user.role);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  // Find user by email (+password since it's select: false in schema)
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id, user.role);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  // req.user is set by the protect middleware
  res.json(req.user);
});

// @desc    Update user location
// @route   PUT /api/auth/location
// @access  Private
const updateLocation = asyncHandler(async (req, res) => {
  const { lat, lng } = req.body;

  if (lat === undefined || lng === undefined) {
    res.status(400);
    throw new Error('Please provide lat and lng');
  }

  const user = await User.findById(req.user._id);

  if (user) {
    user.location = {
      type: 'Point',
      coordinates: [lng, lat]
    };
    
    const updatedUser = await user.save();
    
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Authenticate with Google (Mock)
// @route   POST /api/auth/google
// @access  Public
const googleAuth = asyncHandler(async (req, res) => {
  const { name, email, googleId, role } = req.body;

  if (!email || !googleId) {
    res.status(400);
    throw new Error('Please provide Google credentials');
  }

  let user = await User.findOne({ email });

  if (!user) {
    // Create new user via Google
    user = await User.create({
      name: name || 'Google User',
      email,
      googleId,
      phone: '0000000000', // Dummy phone for Google users
      role: role || 'user',
      authProvider: 'google',
    });
  } else if (!user.googleId) {
    // Link Google to existing account
    user.googleId = googleId;
    user.authProvider = 'google';
    await user.save();
  }

  const token = generateToken(user._id, user.role);
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
});

// @desc    Send OTP (Mock)
// @route   POST /api/auth/send-otp
// @access  Public
const sendOtp = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    res.status(400);
    throw new Error('Please provide phone number');
  }

  // In a real app, integrate Twilio or Firebase SMS here.
  console.log(`[MOCK] OTP 123456 sent to phone: ${phone}`);

  res.json({ message: 'OTP sent successfully. Use 123456 to verify.' });
});

// @desc    Verify OTP and login (Mock)
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = asyncHandler(async (req, res) => {
  const { phone, otp, role, name, email } = req.body;

  if (!phone || !otp) {
    res.status(400);
    throw new Error('Please provide phone and OTP');
  }

  // Mock verification
  if (otp !== '123456') {
    res.status(401);
    throw new Error('Invalid OTP');
  }

  let user = await User.findOne({ phone });

  if (!user) {
    if (!name || !email) {
      res.status(400);
      throw new Error('Name and email are required for first-time OTP login');
    }
    // Create new user via OTP
    user = await User.create({
      name,
      email,
      phone,
      role: role || 'user',
      authProvider: 'phone',
    });
  }

  const token = generateToken(user._id, user.role);
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateLocation,
  googleAuth,
  sendOtp,
  verifyOtp,
};
