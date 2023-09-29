import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { About, CreateListings, Home, Profile, SignIn, SignUp } from './pages';
import { Header } from './components';
import PrivateRoute from './components/PrivateRoute';
import UpdateListing from './pages/listings/UpdateListing';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListings />} />
          <Route path='/update-listing/:id' element={<UpdateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
