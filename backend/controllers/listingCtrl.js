import Listing from '../models/listingModel.js';
import asyncHandler from 'express-async-handler';

export const createListing = asyncHandler(async (req, res) => {
  const listing = await Listing.create(req.body);
  if (!listing) throw new Error('All fields are required');
  res.status(201).json(listing);
});

export const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) throw new Error('Listing not found');

  // check if the user is the owner of the listing
  if (req.user.id !== listing.userRef) {
    throw new Error(
      'User not authorized, you can only delete your own listings'
    );
  }

  await Listing.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Listing deleted',
  });
});

export const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) throw new Error('Listing not found');
  if (req.user.id !== listing.userRef) {
    throw new Error(
      'User not authorized, you can only update your own listings'
    );
  }

  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedListing);
});
