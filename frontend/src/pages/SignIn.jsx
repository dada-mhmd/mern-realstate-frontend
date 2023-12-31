import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/slices/userSlices/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.password) {
        dispatch(signInFailure('Please fill in all fields'));
        return;
      }

      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!data?.success) {
        dispatch(signInFailure(data?.message));
        return;
      }

      dispatch(signInSuccess(data.userInfo));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error?.message));
    }
  };

  return (
    <section className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg outline-none'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg outline-none'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          type='submit'
        >
          {loading ? (
            <BeatLoader
              aria-label='Loading Spinner'
              className='text-center w-full mx-auto'
              color='white'
              size={15}
            />
          ) : (
            'Sign In'
          )}
        </button>

        {/* OAuth btn */}
        <OAuth />
      </form>
      <div className='flex items-center gap-1 mt-5'>
        <p className='font-medium'>Don't have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700'>Signup</span>
        </Link>
      </div>
      {error && <p className='text-red-500 text-xl'>{error}</p>}
    </section>
  );
};

export default SignIn;
