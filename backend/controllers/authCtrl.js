import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
export const signup = async (req, res) => {
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
      return res.status(500).json({ message: 'User already exists' })
    }
    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    })
  } catch (error) {
    res.status(500).json(error.message)
  }
}
