import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <aside className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-sm'>
        <NavLink
          to='/add'
          className={
            'flex items-center gap-3 border border-r-0 px-3 py-2 rounded-lg'
          }
        >
          <img src={assets.add_icon} alt='add icon' className='size-5' />
          <p className='hidden md:block'>Add Products</p>
        </NavLink>
        <NavLink
          to='/list'
          className={
            'flex items-center gap-3 border border-r-0 px-3 py-2 rounded-lg'
          }
        >
          <img src={assets.order_icon} alt='add icon' className='size-5' />
          <p className='hidden md:block'>List Products</p>
        </NavLink>
        <NavLink
          to='/orders'
          className={
            'flex items-center gap-3 border border-r-0 px-3 py-2 rounded-lg'
          }
        >
          <img src={assets.order_icon} alt='add icon' className='size-5' />
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
