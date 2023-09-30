import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from 'react-icons/fa';
import { BounceLoader } from 'react-spinners';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';

const Listing = () => {
  SwiperCore.use([Navigation]);

  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(null);
  const [contact, setContact] = useState(false);

  const { id } = useParams();

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/listing/' + id);
        if (!res.ok) {
          setError(true);
          setLoading(false);
          throw new Error('All fields are required');
        }
        const data = await res.json();
        setListing(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);
  return (
    <main>
      {loading && (
        <div className='flex items-center justify-center my-7'>
          <BounceLoader color='gray' size={100} />
        </div>
      )}
      {error && (
        <div className='text-center my-7 '>
          <p className='text-2xl mb-4 text-red-700 font-semibold'>
            Something went wrong!
          </p>
          <Link to={'/'} className='text-slate-700 text-2xl'>
            Go Back
          </Link>
        </div>
      )}

      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing?.imageUrls?.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px] bg-cover'
                  style={{ background: `url(${url}) center no-repeat` }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}

          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing?.name} - $
              {listing?.offer
                ? listing?.discountPrice?.toLocaleString('en-US')
                : listing?.regularPrice?.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing?.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>

            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing?.description}
            </p>

            <ul className='flex flex-wrap items-center gap-4 sm:gap-6 text-green-900 font-semibold text-sm'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed size={30} />
                {listing?.bedrooms > 1 ? `${listing?.bedrooms} Beds` : 'Bed'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath size={20} />
                {listing?.bathrooms > 1
                  ? `${listing?.bathrooms} Baths`
                  : 'Bath'}
              </li>

              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking size={20} />
                {listing?.parking ? 'Parking spot' : 'No Parking'}
              </li>

              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair size={20} />
                {listing?.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
              >
                Contact Owner
              </button>
            )}

            {contact && <Contact listing={listing} />}
          </div>
        </>
      )}
    </main>
  );
};

export default Listing;
