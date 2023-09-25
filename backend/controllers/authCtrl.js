import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    })
    if (newUser) {
      throw new Error('User already exists')
    }
    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    })
  } catch (error) {
    next(error)
  }
}
