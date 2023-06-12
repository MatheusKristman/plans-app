import React, { useEffect } from 'react';
import api from '../../services/api';
import useInternetPlansStore from '../../stores/useInternetPlansStore';

import PlansHeader from '../components/PlansHeader';
import InternetPlansBody from './components/InternetPlansBody';
import Footer from '../components/Footer';
import { shallow } from 'zustand/shallow';

const InternetPlans = () => {
  const { internetPlans, setInternetPlans } = useInternetPlansStore(
    (state) => ({
      internetPlans: state.internetPlans,
      setInternetPlans: state.setInternetPlans,
    }),
    shallow
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    api
      .get('plan/internet-plan/all')
      .then((res) => setInternetPlans(res.data.filter((plan) => plan.category === 'Internet')));
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
