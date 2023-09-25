import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      if (!formData.email || !formData.password) {
        setLoading(false)
        setError('Please add all fields')
        return
      }

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (!data?.success) {
        setLoading(false)
        setError(data?.message)
        return
      }

      setLoading(false)
      setError(null)
      navigate('/')
    } catch (error) {
      setLoading(false)
      setError(error?.message)
    }
  }

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
      </form>
      <div className='flex items-center gap-1 mt-5'>
        <p className='font-medium'>Don't have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700'>Signup</span>
        </Link>
      </div>
      {error && <p className='text-red-500 text-xl'>{error}</p>}
    </section>
  )
}

export default SignIn
