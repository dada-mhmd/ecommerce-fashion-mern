import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productDetails, setProductDetails] = useState(false);
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const fetchProductDetails = async () => {
    products?.map((product) => {
      if (product._id === productId) {
        setProductDetails(product);
        setImage(product.image[0]);
        return;
      }
    });
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId, products]);

  return productDetails ? (
    <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product details */}
      <div className='flex gap-12 flex-col sm:flex-row'>
        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productDetails?.image.map((productImg, index) => (
              <img
                src={productImg}
                alt={productDetails.name}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                onClick={() => setImage(productImg)}
              />
            ))}
          </div>

          {/* main product image */}
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt='product image' className='w-full h-auto' />
          </div>
        </div>

        {/* right - product info */}
        <div className='flex-1'>
          <h1 className='font-semibold text-2xl mt-2'>
            {productDetails?.name}
          </h1>

          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt='' className='w-3' />
            <img src={assets.star_icon} alt='' className='w-3' />
            <img src={assets.star_icon} alt='' className='w-3' />
            <img src={assets.star_icon} alt='' className='w-3' />
            <img src={assets.star_dull_icon} alt='' className='w-3' />
            <p className='pl-2'>(131)</p>
          </div>

          <p className='mt-5 text-3xl font-medium'>
            {currency} {productDetails?.price}
          </p>

          <p className='mt-5 text-gray-600 md:w-4/5'>
            {productDetails?.description}
          </p>

          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productDetails?.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    selectedSize === size && 'border-black border-2'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productDetails._id, selectedSize)}
            className='bg-black text-white text-sm px-8 py-3 hover:opacity-85 active:bg-gray-700'
          >
            Add To Cart
          </button>
          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on Delivery Available</p>
            <p>Easy Returns and Exchange Available</p>
          </div>
        </div>
      </div>

      {/* description & reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <p className='border font-bold px-5 py-3 text-sm'>Description</p>
          <p className='border font-bold px-5 py-3 text-sm'>Reviews (12)</p>
        </div>

        <div className='flex flex-col gap-4 border p-6 text-sm text-gray-600'>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde porro
            dolore ipsam quas perspiciatis facere, pariatur deleniti. Sequi,
            mollitia corporis Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Nostrum libero accusamus voluptate, aspernatur
            inventore impedit.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, maiores accusamus vero itaque deleniti est?
          </p>
        </div>
      </div>

      {/* related products */}
      <RelatedProducts
        category={productDetails?.category}
        subCategory={productDetails?.subCategory}
      />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
