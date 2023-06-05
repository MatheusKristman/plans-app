import React from 'react';

import HomeHeader from './components/HomeHeader';
import HomeHero from './components/HomeHero';
import HomeHowItWorks from './components/HomeHowItWorks';
import HomeBenefits from './components/HomeBenefits';
import HomeFAQ from "./components/HomeFAQ";

const Home = () => {
  return (
    <div className='container'>
      <HomeHeader />
      <HomeHero />
      <HomeHowItWorks />
      <HomeBenefits />
      <HomeFAQ />
    </div>
  );
};

export default Home;
