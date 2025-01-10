import { useContext, useEffect, useState, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState(products);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState('relevant'); // State for sorting

  const toggleFilter = (value, setFilter) => (e) => {
    setFilter((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        (category.length === 0 || category.includes(product.category)) &&
        (subCategory.length === 0 || subCategory.includes(product.subCategory))
    );

    if (showSearch && search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply sorting based on sortOption
    switch (sortOption) {
      case 'low-high':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'relevant':
      default:
        // You can implement your own relevance logic here if needed

        break;
    }

    return filtered;
  }, [products, category, subCategory, sortOption, showSearch, search]);

  useEffect(() => {
    setFilterProducts(filteredProducts);
  }, [filteredProducts]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        {/* Filter toggle button only visible on small screens */}
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2 sm:hidden'
        >
          Filters
          <img
            src={assets.dropdown_icon}
            alt='dropdown'
            className={`h-3 ${showFilter ? 'rotate-90' : ''}`}
          />
        </p>

        {/* Filter section: always visible on larger screens, toggleable on mobile */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <FilterSection
            title='Categories'
            options={['Men', 'Women', 'Kids']}
            handleChange={toggleFilter('category', setCategory)}
          />
          <FilterSection
            title='Type'
            options={['Topwear', 'Bottomwear', 'Winterwear']}
            handleChange={toggleFilter('subCategory', setSubCategory)}
          />
        </div>
      </div>

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title title1='All' title2='Collections' />
          {/* Sort product */}
          <select
            className='border-2 border-gray-300 text-sm px-2'
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value='relevant'>Sort By: Relevant</option>
            <option value='low-high'>Sort By: Low - High</option>
            <option value='high-low'>Sort By: High - Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const FilterSection = ({ title, options, handleChange }) => (
  <div className='mb-5'>
    <p className='mb-3 text-sm font-medium'>{title}</p>
    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
      {options.map((option) => (
        <label key={option} className='flex gap-2'>
          <input
            type='checkbox'
            className='w-3'
            value={option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}
    </div>
  </div>
);

export default Collection;
