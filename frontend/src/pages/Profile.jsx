import { useEffect, useState, useRef } from 'react';
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
  UpdateUserFailure,
  UpdateUserStart,
  UpdateUserSuccess,
} from '../redux/slices/userSlices/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

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
      </form>

      <div className='flex items-center justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>

      <p className='text-red-700 mt-5'>{error?.message}</p>
      <p className='text-green-700'>
        {updateSuccess ? 'User updated successfully' : ''}
      </p>
    </section>
  );
};

export default Profile;
