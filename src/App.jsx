import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { About, Home, Profile, SignIn, SignUp } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
