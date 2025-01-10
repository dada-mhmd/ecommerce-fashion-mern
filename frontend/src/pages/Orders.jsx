import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
  const { backendUrl, currency, token } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const fetchOrders = async () => {
    try {
      if (!token) return null;

      const res = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (res?.data?.success) {
        let allOrderItems = [];
        res?.data?.orders?.map((order) => {
          order?.items?.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item['userId'] = order.userId;
            allOrderItems.push(item);
          });
        });

        setOrderData(allOrderItems.reverse());
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title title1='My' title2='Orders' />
      </div>

      <div className=''>
        {orderData?.slice(1, 4).map((item, i) => (
          <div
            key={i}
            className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
          >
            <div className='flex items-start gap-6 text-sm'>
              <img
                src={item?.image[0]}
                alt='product image'
                className='w-16 sm:w-20'
              />
              <div>
                <p className='sm:text-base font-medium'>{item?.name}</p>
                <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                  <p>
                    {currency}
                    {item?.price}
                  </p>
                  <p>Quantity: {item?.quantity}</p>
                  <p>Size: {item?.size}</p>
                </div>

                <p className='mt-1'>
                  Date:
                  <span className='text-gray-500'>
                    {new Date(item?.date).toLocaleDateString()}
                  </span>
                </p>
                <p className='mt-1'>
                  Payment:
                  <span className='text-gray-500 ml-1'>
                    {item?.paymentMethod}
                  </span>
                </p>
              </div>
            </div>

            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item?.status}</p>
              </div>

              <button
                onClick={fetchOrders}
                className='border px-4 py-2 text-sm font-medium rounded-sm'
              >
                Track order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
