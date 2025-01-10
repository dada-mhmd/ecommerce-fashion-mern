import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
  return (
    <nav className='flex items-center justify-between px-[4%] py-2'>
      <img src={assets.logo} alt='logo' className='w-[max(10%,80px)]' />
      <button
        onClick={() => setToken('')}
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full sm:text-sm'
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
