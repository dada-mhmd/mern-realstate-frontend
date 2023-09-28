const CreateListings = () => {
  return (
    <main className='p-3 w-full max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>

      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            id='name'
            maxLength='62'
            minLength='3'
            required
            className='border p-3 rounded-lg'
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
          />

          <div className='flex flex-wrap gap-6'>
            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5' />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='rent' className='w-5' />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='parking' className='w-5' />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' className='w-5' />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-5' />
              <span>Offer</span>
            </div>
          </div>

          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                className='p-3 border border-gray-300 rounded-lg w-10'
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
              />
              <p>Beds</p>
            </div>

            <div className='flex items-center gap-2'>
              <input
                className='p-3 border border-gray-300 rounded-lg w-10'
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
              />
              <p>Bathrooms</p>
            </div>

            <div className='flex items-center gap-2'>
              <input
                className='p-3 border border-gray-300 rounded-lg w-10'
                type='number'
                id='regularPrice'
                min='1'
                max='10'
                required
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                <span className='text-sm'>($ / month)</span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <input
                className='p-3 border border-gray-300 rounded-lg w-10'
                type='number'
                id='discountPrice'
                min='1'
                max='10'
                required
              />
              <div className='flex flex-col items-center'>
                <p>Discounted price</p>
                <span className='text-sm'>($ / month)</span>
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold mt-4'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className='flex gap-4'>
            <input
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button className='p-3 text-red-700 border border-red-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
              Upload
            </button>
          </div>

          <button className='bg-slate-700 mt-5 p-3 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-80'>
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListings;
