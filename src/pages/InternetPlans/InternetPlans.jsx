import React, { useEffect } from 'react';

import PlansHeader from '../components/PlansHeader';
import InternetPlansBody from './components/InternetPlansBody';
import Footer from '../components/Footer';

const InternetPlans = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='internet-plans-container'>
      <PlansHeader
        headerTitle='Planos de Banda Larga'
        headerDesc='Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
      />
      <InternetPlansBody />
      <Footer />
    </div>
  );
};

export default InternetPlans;
