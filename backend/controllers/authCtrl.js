import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'

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
