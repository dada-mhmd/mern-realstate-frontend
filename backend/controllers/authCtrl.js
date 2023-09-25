import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

// @desc Register a new user
// @route POST /api/auth/signup
// @access Public
export const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  // check if user exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    throw new Error('User already exists')
  }

  // validate inputs
  if (!username || !email || !password) {
    throw new Error('Please add all fields')
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // create user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  })
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    newUser,
  })
})

// @desc login  user
// @route POST /api/auth/sign-in
// @access Public

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // check if user exists
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('User not found')
  }

  // compare password
  const isPasswordMatched = await bcrypt.compare(password, user.password)
  if (!isPasswordMatched) {
    throw new Error('Invalid credentials')
  }

  // create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })

  // remove password before sending request
  const { password: pass, ...userInfo } = user._doc

  res
    .cookie('access_token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(userInfo)
})
