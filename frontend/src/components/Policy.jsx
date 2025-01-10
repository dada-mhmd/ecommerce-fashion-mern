import { assets } from '../assets/assets';

const Policy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div className='border p-4'>
        <img
          src={assets.exchange_icon}
          alt='exchange icon'
          className='w-12 m-auto mb-5'
        />
        <p className='font-semibold'>Easy Exchange at your fingertips</p>
        <p className='text-gray-500'>
          We Offer a wide range of free exchange options
        </p>
      </div>

      <div className='border p-4'>
        <img
          src={assets.quality_icon}
          alt='quality icon'
          className='w-12 m-auto mb-5'
        />
        <p className='font-semibold'>7 Days Return Policy</p>
        <p className='text-gray-500'>
          We Offer 7 days return policy for all our products
        </p>
      </div>

      <div className='border p-4'>
        <img
          src={assets.support_img}
          alt='support icon'
          className='w-12 m-auto mb-5'
        />
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-500 max-w-sm'>
          We offer 24/7 customer support to help you with any issues you may
          have
        </p>
      </div>
    </div>
  );
};

export default Policy;
