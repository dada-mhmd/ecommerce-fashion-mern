// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// import { backendUrl } from '../constants';
// import { assets } from '../assets/assets';

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([]);

//   const getAllOrders = async () => {
//     if (!token) {
//       return null;
//     }

//     try {
//       const res = await axios.post(
//         `${backendUrl}/api/order/list`,
//         {},
//         { headers: { token } }
//       );
//       if (res?.data?.success) {
//         setOrders(res?.data?.orders);
//       } else {
//         toast.error(res?.data?.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.message);
//     }
//   };

//   useEffect(() => {
//     getAllOrders();
//   }, []);

//   return (
//     <div>
//       <h3>Orders</h3>

//       <div>
//         {orders?.map((order, i) => (
//           <div
//             key={i}
//             className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
//           >
//             <div>
//               <img src={assets.parcel_icon} alt='icon' />
//               <div>
//                 <div>
//                   {order?.items?.map((item, i) => {
//                     if (i === order?.items?.length - 1) {
//                       return (
//                         <p key={i}>
//                           {item?.name} x {item?.quantity}
//                           <span>{item?.size}</span>
//                         </p>
//                       );
//                     } else {
//                       return (
//                         <p key={i}>
//                           {item?.name} x {item?.quantity}
//                           <span>{item?.size}</span>,
//                         </p>
//                       );
//                     }
//                   })}
//                 </div>

//                 <div>
//                   <p>
//                     {order?.address.firstName + ' ' + order?.address.lastName}
//                   </p>
//                   <div>
//                     <p>{order?.address?.street + ','}</p>
//                     <p>
//                       {order?.address?.city +
//                         ', ' +
//                         order?.address?.state +
//                         ', ' +
//                         order?.address?.country +
//                         ', ' +
//                         order?.address?.zipCode}
//                     </p>
//                   </div>
//                   <p>{order?.address?.phone}</p>
//                 </div>
//               </div>
//             </div>

//             <p>Items: {order?.items?.length}</p>
//             <p>Payment Method: {order?.paymentMethod}</p>
//             <p>Payment: {order?.payment ? 'Done' : 'Pending'}</p>
//             <p>Date: {new Date(order?.date).toLocaleString()}</p>

//             <p>Total: ${order?.amount}</p>

//             <select>
//               <option value='Order Placed'>Order Placed</option>
//               <option value='Packing'>Packing</option>
//               <option value='Shipped'>Shipped</option>
//               <option value='Out for Delivery'>Out for Delivery</option>
//               <option value='Delivered'>Delivered</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../constants';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    if (!token) return null;
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (res?.data?.success) {
        setOrders(res?.data?.orders);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  const updateStatus = async (e, orderId) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (res?.data?.success) {
        await getAllOrders();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <h3 className='text-3xl font-bold text-gray-800 mb-8 border-b pb-4'>
          Orders Dashboard
        </h3>

        <div className='space-y-6'>
          {orders?.map((order, i) => (
            <div
              key={i}
              className='bg-white rounded-xl shadow-lg overflow-hidden '
            >
              <div className='border-l-4 border-blue-500'>
                <div className='p-6'>
                  <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Order Info Section */}
                    <div className='flex-1'>
                      <div className='flex items-center gap-4 mb-6'>
                        <div className='bg-blue-50 p-3 rounded-lg'>
                          <img
                            src={assets.parcel_icon}
                            alt='icon'
                            className='w-8 h-8'
                          />
                        </div>
                        <div>
                          <h4 className='text-lg font-semibold text-gray-800'>
                            Order #{i + 1}
                          </h4>
                          <p className='text-sm text-gray-500'>
                            {new Date(order?.date).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className='bg-gray-50 rounded-lg p-4 mb-4'>
                        <h5 className='font-medium text-gray-700 mb-3'>
                          Order Items
                        </h5>
                        <div className='space-y-2'>
                          {order?.items?.map((item, i) => (
                            <div
                              key={i}
                              className='flex items-center justify-between text-sm'
                            >
                              <span className='text-gray-800'>
                                {item?.name}
                              </span>
                              <div className='flex items-center gap-3'>
                                <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                                  {item?.size}
                                </span>
                                <span className='text-gray-600'>
                                  x{item?.quantity}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Customer Details */}
                      <div className='bg-gradient-to-r from-gray-50 to-white rounded-lg p-4'>
                        <h5 className='font-medium text-gray-700 mb-3'>
                          Delivery Details
                        </h5>
                        <div className='space-y-2 text-sm'>
                          <p className='font-medium text-gray-800'>
                            <span>Fullname: </span>
                            {order?.address.firstName +
                              ' ' +
                              order?.address.lastName}
                          </p>
                          <p className='text-gray-600'>
                            <span>Street: </span>
                            {order?.address?.street}
                          </p>
                          <p className='text-gray-600'>
                            <span>City, State: </span>
                            {`${order?.address?.city}, ${order?.address?.state}`}
                          </p>
                          <p className='text-gray-600'>
                            <span>Country, Zipcode: </span>
                            {`${order?.address?.country}, ${order?.address?.zipCode}`}
                          </p>
                          <p className='text-blue-600 font-medium'>
                            <span>Phone: </span>
                            {order?.address?.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Status Section */}
                    <div className='lg:w-80 flex flex-col justify-between'>
                      <div className='space-y-4'>
                        <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                          <span className='text-gray-600'>Items</span>
                          <span className='font-semibold'>
                            {order?.items?.length}
                          </span>
                        </div>

                        <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                          <span className='text-gray-600'>Payment Method</span>
                          <span className='font-semibold'>
                            {order?.paymentMethod}
                          </span>
                        </div>

                        <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                          <span className='text-gray-600'>Payment Status</span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order?.payment
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {order?.payment ? 'Paid' : 'Pending'}
                          </span>
                        </div>

                        <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                          <span className='text-gray-600'>Total Amount</span>
                          <span className='text-xl font-bold text-green-600'>
                            ${order?.amount}
                          </span>
                        </div>
                      </div>

                      <select
                        onChange={(e) => updateStatus(e, order?._id)}
                        value={order?.status}
                        className='mt-6 w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 cursor-pointer'
                      >
                        <option value='Order Placed'>Order Placed</option>
                        <option value='Packing'>Packing</option>
                        <option value='Shipped'>Shipped</option>
                        <option value='Out for delivery'>
                          Out for Delivery
                        </option>
                        <option value='Delivered'>Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
