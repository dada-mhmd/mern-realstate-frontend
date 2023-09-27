import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

// @desc Register a new user
// @route POST /api/auth/signup
// @access Public
export const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  // validate inputs
  if (!username || !email || !password) {
    throw new Error('Please add all fields');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    newUser,
  });
});

// @desc login  user
// @route POST /api/auth/sign-in
// @access Public

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  // compare password
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error('Invalid credentials');
  }

  // create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // remove password before sending request
  const { password: pass, ...userInfo } = user._doc;

  res.cookie('access_token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    userInfo,
  });
});

// google
export const google = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;
    res
      .cookie('access_token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest);
  } else {
    // create the user
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);
    const newUser = new User({
      username:
        req.body.name.split(' ').join('').toLowerCase() +
        Math.random().toString(36).slice(-4),
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.photo,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = newUser._doc;
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  }
});

// logout
export const signout = asyncHandler(async (req, res) => {
  res.clearCookie('access_token').json({
    success: true,
    message: 'user has been logged out',
  });
});
