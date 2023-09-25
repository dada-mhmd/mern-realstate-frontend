import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <section className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg outline-none'
          id='username'
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg outline-none'
          id='email'
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg outline-none'
          id='password'
        />
        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          type='submit'
        >
          Sign up
        </button>
      </form>
      <div className='flex items-center gap-1 mt-5'>
        <p className='font-medium'>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-700'>Login</span>
        </Link>
      </div>
    </section>
  )
}

export default SignUp
