import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <img src={assets.logo} alt='logo' className='mb-5 w-32' />
          <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum non
            minus odit laborum distinctio voluptate doloribus deleniti autem
            repudiandae ratione.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>Company</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>Get In Touch</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+961-12345678</li>
            <li>example@example.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center font-medium'>
          Copyright © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
