import React, { useEffect } from 'react';

import PlansHeader from '../components/PlansHeader';
import TVPlansBody from './components/TVPlansBody';
import Footer from '../components/Footer';

const TVPlans = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='tv-plans-container'>
      <PlansHeader
        headerTitle='Planos de TV'
        headerDesc='Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
      />
      <TVPlansBody />
      <Footer />
    </div>
  );
};

export default TVPlans;
