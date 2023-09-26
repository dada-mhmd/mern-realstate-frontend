import express from 'express'
import { google, signin, signup } from '../controllers/authCtrl.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)

// google route
router.post('/google', google)

export default router
