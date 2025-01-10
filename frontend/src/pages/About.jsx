import { assets } from '../assets/assets';
import NewsLetter from '../components/NewsLetter';
import Title from '../components/Title';

const About = () => {
  return (
    <div className=''>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title title1={'About'} title2={'Us'} />
      </div>

      <div className='my-10 flex-col flex md:flex-row gap-16'>
        <img
          src={assets.about_img}
          alt='about us image'
          className='w-full md:max-w-[450px]'
        />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            aliquam officiis iste odio nostrum quam, voluptatibus veritatis qui
            tenetur asperiores?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe
            facilis magnam eveniet in ipsa labore architecto, repellendus vel
            hic voluptas provident cupiditate illum, ad nihil veniam quidem
            nesciunt consequuntur non.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto amet
            aspernatur, voluptatum eveniet error nam aliquid alias consequuntur
            reprehenderit hic!
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title title1={'Why'} title2={'Choose Us'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
            deserunt ea doloribus? Ipsam, voluptatibus.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
            deserunt ea doloribus? Ipsam, voluptatibus.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Excpetional Customer Service:</b>
          <p className='text-gray-600'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
            deserunt ea doloribus? Ipsam, voluptatibus.
          </p>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default About;
