import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const {
    firstName,
    lastName,
    email,
    street,
    city,
    state,
    zipCode,
    country,
    phone,
  } = formData;

  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products,
    navigate,
  } = useContext(ShopContext);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      switch (method) {
        case 'cod':
          const res = await axios.post(
            backendUrl + '/api/order/place',
            orderData,
            { headers: { token } }
          );
          if (res.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(res.data.message);
          }
          break;

        case 'stripe':
          const stripeRes = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            {
              headers: { token },
            }
          );
          if (stripeRes.data.success) {
            const { session_url } = stripeRes.data;
            window.location.href = session_url;
          } else {
            toast.error(stripeRes.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error.message);
      toast.error('Something went wrong, please try again later');
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'
    >
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title title1='Delivery' title2='Info' />
        </div>

        <div className='flex gap-3'>
          <input
            type='text'
            placeholder='First name'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            required
            value={firstName}
            onChange={onChangeHandler}
            name='firstName'
          />
          <input
            type='text'
            placeholder='Last name'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            required
            value={lastName}
            onChange={onChangeHandler}
            name='lastName'
          />
        </div>

        <input
          type='email'
          placeholder='Email address'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          required
          value={email}
          onChange={onChangeHandler}
          name='email'
        />
        <input
          type='text'
          placeholder='Street'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          required
          value={street}
          onChange={onChangeHandler}
          name='street'
        />

        <div className='flex gap-3'>
          <input
            type='text'
            placeholder='City'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            value={city}
            onChange={onChangeHandler}
            name='city'
          />
          <input
            type='text'
            placeholder='State'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            value={state}
            onChange={onChangeHandler}
            name='state'
          />
        </div>

        <div className='flex gap-3'>
          <input
            type='number'
            placeholder='Zip code'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            value={zipCode}
            onChange={onChangeHandler}
            name='zipCode'
          />
          <input
            type='text'
            placeholder='Country'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            value={country}
            onChange={onChangeHandler}
            name='country'
          />
        </div>
        <input
          type='number'
          placeholder='Phone'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          value={phone}
          onChange={onChangeHandler}
          name='phone'
        />
      </div>

      {/* right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title title1='Payment' title2='Method' />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div
              onClick={() => setMethod('stripe')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === 'stripe' ? 'bg-zinc-600' : ''
                }`}
              ></p>
              <img
                src={assets.stripe_logo}
                alt='stripe logo'
                className='h-5 mx-4'
              />
            </div>
            <div
              onClick={() => setMethod('cod')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === 'cod' ? 'bg-zinc-600' : ''
                }`}
              ></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>
                Cash on Delivery
              </p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button
              type='submit'
              className='bg-black text-white px-16 py-3 text-sm hover:bg-opacity-85'
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
