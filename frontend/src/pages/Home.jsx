import BestSeller from '../components/BestSeller';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import NewsLetter from '../components/NewsLetter';
import Policy from '../components/Policy';

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <Policy />
      <NewsLetter />
    </div>
  );
};

export default Home;
