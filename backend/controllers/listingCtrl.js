import Listing from '../models/listingModel.js';
import asyncHandler from 'express-async-handler';

export const createListing = asyncHandler(async (req, res) => {
  const listing = await Listing.create(req.body);
  if (!listing) throw new Error('All fields are required');
  res.status(201).json(listing);
});
