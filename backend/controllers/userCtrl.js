import User from '../models/userModel.js';
import Listing from './../models/listingModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

export const updateUser = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id) {
    throw new Error('User not authorized');
  }

  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      },
    },
    { new: true }
  );

  const { password, ...others } = updatedUser._doc;
  res.status(200).json(others);
});

// delete user
export const deleteUser = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id) {
    throw new Error('You can only delete your account');
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).clearCookie('access_token').json({
    success: true,
    message: 'user has been deleted',
  });
});

// @desc Get user listings
// @route GET /api/users/listings/:id
// @access Private
export const getUserListings = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id) {
    throw new Error('User not authorized');
  } else {
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json(listings);
  }
});
