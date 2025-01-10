const NewsLetter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>
        Subscribe now & get 10% discount
      </p>
      <p className='text-gray-500 mt-3'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, cum.
      </p>

      <form
        onSubmit={handleSubmit}
        className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'
      >
        <input
          type='email'
          placeholder='Enter your email'
          className='w-full sm:flex-1 outline-none'
          required
        />
        <button className='bg-black text-white text-sm px-10 py-4 hover:opacity-85'>
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
