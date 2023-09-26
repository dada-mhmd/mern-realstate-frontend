import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase/firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/slices/userSlices/userSlice'
import { useNavigate } from 'react-router-dom'
const OAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    try {
      // auth with google/firebase
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      })
      const data = await res.json()
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      console.log('Could not sign in with google', error)
    }
  }

  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-600 hover:opacity-95 text-white p-3 rounded-lg uppercase'
    >
      Continue with google
    </button>
  )
}

export default OAuth
