import express from 'express';
import {
  deleteUser,
  getUser,
  getUserListings,
  updateUser,
} from '../controllers/userCtrl.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);
router.get('/:id', verifyToken, getUser);

export default router;
