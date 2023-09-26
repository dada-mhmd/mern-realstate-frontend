import { useSelector } from 'react-redux'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <section className='p-3 w-full max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7'>Profile</h1>

      <form className='flex flex-col gap-y-4'>
        <img
          src={currentUser?.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <input
          type='text'
          placeholder='Username'
          id='username'
          className='border p-3 rounded-lg'
        />
        <input
          type='email'
          id='email'
          placeholder='Email'
          className='border p-3  rounded-lg'
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='border p-3  rounded-lg'
        />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>

      <div className='flex items-center justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </section>
  )
}

export default Profile
