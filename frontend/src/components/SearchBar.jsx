import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  return (
    showSearch && (
      <div className='shadow-xl text-center rounded-xl w-1/2 mx-auto my-4'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
          <input
            type='text'
            placeholder='Search...'
            className='flex-1 outline-none bg-inherit text-sm'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img src={assets.search_icon} alt='search icon' className='w-4' />
        </div>

        <img
          src={assets.cross_icon}
          alt='cross icon'
          className='inline w-3 cursor-pointer'
          onClick={() => setShowSearch(false)}
        />
      </div>
    )
  );
};

export default SearchBar;
