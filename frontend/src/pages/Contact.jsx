import { assets } from '../assets/assets';
import NewsLetter from '../components/NewsLetter';
import Title from '../components/Title';

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title title1={'Contact'} title2={'Us'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img
          src={assets.contact_img}
          alt='contact us image'
          className='w-full md:max-w-[480px]'
        />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Beirut, Lebanon</p>
          <p className='text-gray-500'>
            Phone: +961 000222
            <br /> Email: info@mywebsite.com
          </p>
          <p className='font-semibold text-xl text-gray-600'>Careers</p>
          <p className='text-gray-500'>Learn more about our teams and jobs</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default Contact;
