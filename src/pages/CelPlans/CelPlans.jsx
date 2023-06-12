import React, { useEffect } from 'react';

import PlansHeader from '../components/PlansHeader';
import CelPlansBody from './components/CelPlansBody.jsx';
import Footer from '../components/Footer';

const CelPlans = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='cel-plans-container'>
      <PlansHeader
        headerTitle='Planos de Celular'
        headerDesc='Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
      />
      <CelPlansBody />
      <Footer />
    </div>
  );
};

export default CelPlans;
