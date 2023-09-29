import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from './../firebase/firebase';
import {
  DeleteUserFailure,
  DeleteUserStart,
  DeleteUserSuccess,
  UpdateUserFailure,
  UpdateUserStart,
  UpdateUserSuccess,
  SignOutStart,
  SignOutSuccess,
  SignOutFailure,
} from '../redux/slices/userSlices/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const fileRef = useRef(null);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(UpdateUserStart());
      const res = await fetch(`/api/user/update/${currentUser?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data) {
        dispatch(UpdateUserFailure(data?.message));
        return;
      }
      dispatch(UpdateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(UpdateUserFailure(error?.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(DeleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser?._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(DeleteUserFailure(res?.message));
        return;
      }
      dispatch(DeleteUserSuccess(data));
    } catch (error) {
      dispatch(DeleteUserFailure(error?.message));
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(SignOutStart());
      const res = await fetch('/api/auth/signout', {
        method: 'GET',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(SignOutFailure(res?.message));
        return;
      }
      dispatch(SignOutSuccess(data));
    } catch (error) {
      dispatch(SignOutFailure(error?.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser?._id}`);
      const data = await res.json();
      if (!res.ok) {
        setShowListingsError(true);
        return;
      }
      setShowListingsError(false);
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  // delete listing
  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='p-3 w-full max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7'>Profile</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-y-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />

        <img
          onClick={() => fileRef.current.click()}
          src={formData?.avatar || currentUser?.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />

        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image Upload (You can only upload images and must be less
              than 2 mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className='text-green-700'>Image Upload Complete</span>
          ) : null}
        </p>

        <input
          type='text'
          placeholder='Username'
          id='username'
          className='border p-3 rounded-lg outline-none'
          defaultValue={currentUser?.username}
          onChange={handleChange}
        />
        <input
          type='email'
          id='email'
          placeholder='Email'
          className='border p-3 rounded-lg outline-none'
          defaultValue={currentUser?.email}
          onChange={handleChange}
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='border p-3  rounded-lg outline-none'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? <BeatLoader color='#fff' /> : 'Update'}
        </button>

        <Link
          to={'/create-listing'}
          className='bg-red-500 text-white rounded-lg p-3 uppercase hover:opacity-95 text-center'
        >
          Create Listing
        </Link>
      </form>

      <div className='flex items-center justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete Account
        </span>
        <span onClick={handleLogout} className='text-red-700 cursor-pointer'>
          Sign Out
        </span>
      </div>

      <p className='text-red-700 mt-5'>{error?.message}</p>
      <p className='text-green-700'>
        {updateSuccess ? 'User updated successfully' : ''}
      </p>

      <button onClick={handleShowListings} className='text-green-700 w-full'>
        Show listings
      </button>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {userListings?.map((listing) => (
            <div
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
              key={listing._id}
            >
              <Link to={`/listing/${listing?._id}`}>
                <img
                  className='h-16 w-16 object-contain'
                  src={listing?.imageUrls[0]}
                  alt='listing cover'
                />
              </Link>
              <Link
                className='flex-1 text-sm text-slate-700 font-semibold truncate'
                to={`/listing/${listing?._id}`}
              >
                <p>{listing?.name}</p>
              </Link>
              <div className='flex flex-col items-center'>
                <button
                  onClick={() => handleDeleteListing(listing?._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing?._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Profile;
