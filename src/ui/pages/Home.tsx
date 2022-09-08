import { HomePage } from '../components/home';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';

const Home: FC = () => {
  return (
    <>
      <Helmet>
        <title>Go Wild</title>
      </Helmet>
      <div>
        <HomePage />
      </div>
    </>
  );
};

export default Home;
