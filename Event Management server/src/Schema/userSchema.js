const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    password: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports =  userSchema;
