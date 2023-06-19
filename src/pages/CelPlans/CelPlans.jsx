import React, { useEffect } from 'react';
import useCelPlansStore from '../../stores/useCelPlansStore';
import useRegisterStore from '../../stores/useRegisterStore';
import { shallow } from 'zustand/shallow';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

import PlansHeader from '../components/PlansHeader';
import CelPlansBody from './components/CelPlansBody.jsx';
import Footer from '../components/Footer';
import RegisterForm from '../components/RegisterForm';

const CelPlans = () => {
  const {
    celPlans,
    setCelPlans,
    allProviders,
    setAllProviders,
    setProviders,
    resetOnLoad,
    setFilteredCelPlans,
  } = useCelPlansStore(
    (state) => ({
      celPlans: state.celPlans,
      setCelPlans: state.setCelPlans,
      allProviders: state.allProviders,
      setAllProviders: state.setAllProviders,
      setProviders: state.setProviders,
      resetOnLoad: state.resetOnLoad,
      setFilteredCelPlans: state.setFilteredCelPlans,
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
          cost: 300,
          franchise: '300GB',
          planType: [],
        };

        api
          .post('plan/cel-plan/filter', data)
          .then((res) => setFilteredCelPlans(res.data))
          .catch((err) => console.log(err))
          .finally(() => {
            setCelPlans([]);
          });

        return;
      }

      api
        .get('plan/cel-plan/all')
        .then((res) => setCelPlans(res.data.filter((plan) => !plan.archived)))
        .catch((err) => console.error(err));

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
    if (allProviders && celPlans.length !== 0) {
      const providerSelected = [];

      for (let i = 0; i < celPlans.length; i++) {
        for (let j = 0; j < allProviders.length; j++) {
          if (
            celPlans[i].provider === allProviders[j]._id &&
            !providerSelected.includes(allProviders[j].providerName)
          ) {
            providerSelected.push(allProviders[j].providerName);
          }
        }
      }

      setProviders(providerSelected);
    }
  }, [allProviders, celPlans]);

  return (
    <div className='cel-plans-container'>
      <PlansHeader
        headerTitle='Planos de Celular'
        headerDesc='Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
      />
      <CelPlansBody />
      {isRegisterFormOpen && <RegisterForm />}
      <Footer />
    </div>
  );
};

export default CelPlans;
