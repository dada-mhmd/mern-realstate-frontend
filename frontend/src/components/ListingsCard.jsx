import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

const ListingsCard = ({ listing }) => {
  return (
    <section className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing?.imageUrls[0] ||
            'https://media.istockphoto.com/id/1409298953/photo/real-estate-agents-shake-hands-after-the-signing-of-the-contract-agreement-is-complete.webp?b=1&s=170667a&w=0&k=20&c=41IYPuvIWQmDRUXdhWELlGb3IeQulHGQwRCJ_5MtgSo='
          }
          alt={listing?.name}
          className='h-[320px] sm:h-[220px] w-full object-contain hover:scale-105 transition-scale duration-300 '
        />

        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='text-lg font-semibold text-slate-700 truncate'>
            {listing?.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing?.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing?.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold'>
            $
            {listing?.offer
              ? listing?.discountPrice.toLocaleString('us-US')
              : listing?.regularPrice.toLocaleString('us-US')}
            {listing?.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-2'>
            <div className='font-bold text-xs'>
              {listing?.bedrooms > 1
                ? `${listing?.bedrooms} Bedrooms`
                : '1 Bed'}
            </div>
            <div className='font-bold text-xs'>
              {listing?.bathrooms > 1
                ? `${listing?.bathrooms} bathrooms`
                : '1 Bath'}
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default ListingsCard;
