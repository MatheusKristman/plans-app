import React, { useEffect } from 'react';
import api from '../../services/api';
import useInternetPlansStore from '../../stores/useInternetPlansStore';
import useRegisterForm from '../../stores/useRegisterStore';
import { useParams } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import PlansHeader from '../components/PlansHeader';
import InternetPlansBody from './components/InternetPlansBody';
import Footer from '../components/Footer';
import RegisterForm from '../components/RegisterForm';
import useRegisterStore from '../../stores/useRegisterStore';

const InternetPlans = () => {
  const {
    internetPlans,
    setInternetPlans,
    allProviders,
    setAllProviders,
    setProviders,
    resetOnLoad,
    setFilteredInternetPlans,
  } = useInternetPlansStore(
    (state) => ({
      internetPlans: state.internetPlans,
      setInternetPlans: state.setInternetPlans,
      allProviders: state.allProviders,
      setAllProviders: state.setAllProviders,
      setProviders: state.setProviders,
      resetOnLoad: state.resetOnLoad,
      setFilteredInternetPlans: state.setFilteredInternetPlans,
    }),
    shallow
  );
  const { isRegisterFormOpen } = useRegisterStore(
    (state) => ({
      isRegisterFormOpen: state.isRegisterFormOpen,
    }),
    shallow
  );

  const cep = useParams()?.cep || '';

  useEffect(() => {
    const fetchPlans = () => {
      if (cep !== '' && cep.length === 9 && cep.includes('-')) {
        const data = {
          cep,
          provider: [],
          cost: 500,
          download: '1000MB',
          technology: [],
        };

        api
          .post('plan/internet-plan/filter', data)
          .then((res) => setFilteredInternetPlans(res.data))
          .catch((err) => console.error(err))
          .finally(() => {
            setInternetPlans([]);
          });

        return;
      }

      api
        .get('plan/internet-plan/all')
        .then((res) => setInternetPlans(res.data.filter((plan) => !plan.archived)));

      api
        .get('provider/all')
        .then((res) => setAllProviders(res.data))
        .catch((err) => console.error(err));
    };
    window.scrollTo(0, 0);

    resetOnLoad();

    fetchPlans();
  }, []);

  useEffect(() => {
    if (allProviders && internetPlans.length !== 0) {
      const providersSelected = [];
      for (let i = 0; i < internetPlans.length; i++) {
        for (let j = 0; j < allProviders.length; j++) {
          if (
            internetPlans[i].provider === allProviders[j]._id &&
            !providersSelected.includes(allProviders[j].providerName)
          ) {
            providersSelected.push(allProviders[j].providerName);
          }
        }
      }
      setProviders(providersSelected);
    }
  }, [allProviders, internetPlans]);

  return (
    <div className='internet-plans-container'>
      <PlansHeader
        headerTitle='Planos de Banda Larga'
        headerDesc='Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
      />
      <InternetPlansBody />
      {isRegisterFormOpen && <RegisterForm />}
      <Footer />
    </div>
  );
};

export default InternetPlans;
