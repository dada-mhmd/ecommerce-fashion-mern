import axios from 'axios';
import { backendUrl } from '../constants';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const List = ({ token }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res?.data?.success) {
        setProducts(res?.data?.products);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        {
          headers: { token },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        await getProducts();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <p className='mb-2'>All Products</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {products?.map((product, i) => (
          <div
            key={i}
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border gap-2 text-sm'
          >
            <img src={product?.image[0]} alt={product?.name} className='w-12' />
            <p>{product?.name}</p>
            <p>{product?.category}</p>
            <p>${product?.price}</p>
            <p
              onClick={() => removeProduct(product._id)}
              className='text-right md:text-center cursor-pointer text-lg'
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
