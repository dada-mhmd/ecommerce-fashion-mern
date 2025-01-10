import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { deliveryFee, getCartAmount, currency } = useContext(ShopContext);

  return (
    <div className='w-full shadow p-5'>
      <div className='text-2xl'>
        <Title title1={'Cart'} title2={'Total'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>
            {currency} {getCartAmount()}.00
          </p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>
            {currency} {deliveryFee}.00
          </p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
