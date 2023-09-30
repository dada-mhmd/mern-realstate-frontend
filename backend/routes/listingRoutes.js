import express from 'express';
import {
  createListing,
  deleteListing,
  getListing,
  getListings,
  updateListing,
} from '../controllers/listingCtrl.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/get', getListings);
router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.put('/update/:id', verifyToken, updateListing);
router.get('/:id', getListing);

export default router;
