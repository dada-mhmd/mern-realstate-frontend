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

export const getListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) throw new Error('Listing not found');
  res.status(200).json(listing);
});

// search
export const getListings = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 8;
  const startIndex = parseInt(req.query.startIndex) || 0;
  let offer = req.query.offer;
  if (offer === undefined || offer === 'false') {
    offer = { $in: [false, true] };
  }
  let furnished = req.query.furnished;
  if (furnished === undefined || furnished === 'false') {
    furnished = { $in: [false, true] };
  }
  let parking = req.query.parking;
  if (parking === undefined || parking === 'false') {
    parking = { $in: [false, true] };
  }
  let type = req.query.type;
  if (type === undefined || type === 'all') {
    type = { $in: ['sale', 'rent'] };
  }
  const searchTerm = req.query.searchTerm || '';

  const sort = req.query.sort || 'createdAt';

  const order = req.query.order || 'desc';

  const listings = await Listing.find({
    name: { $regex: searchTerm, $options: 'i' },
    offer,
    furnished,
    parking,
    type,
  })
    .sort({ [sort]: order })
    .limit(limit)
    .skip(startIndex);

  res.status(200).json(listings);
});
