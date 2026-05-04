const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      // Password is no longer required as Google/OTP users might not have one
      minlength: 6,
      select: false,
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    role: {
      type: String,
      enum: ['user', 'shopkeeper'],
      default: 'user',
    },
    authProvider: {
      type: String,
      enum: ['local', 'google', 'phone'],
      default: 'local',
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    avatar: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0]
      },
    },
    address: String,
    addresses: [
      {
        label: String,
        street: String,
        city: String,
        state: String,
        pincode: String,
        lat: Number,
        lng: Number,
      }
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        qty: {
          type: Number,
          default: 1
        }
      }
    ],
    creditBalance: {
      type: Number,
      default: 0,
    },
    creditHistory: [
      {
        shopId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Shop',
        },
        amount: Number,
        date: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ['pending', 'approved', 'paid'],
          default: 'pending',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.index({ location: '2dsphere' });

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
