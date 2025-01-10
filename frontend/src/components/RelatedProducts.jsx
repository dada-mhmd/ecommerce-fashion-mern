import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const related = products.filter(
        (product) =>
          product.category === category && product.subCategory === subCategory
      );
      setRelatedProducts(related.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title title1={'Related'} title2={'Products'} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {relatedProducts?.map((product, i) => (
          <ProductItem
            key={i}
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
