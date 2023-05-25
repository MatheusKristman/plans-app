import React from 'react';

import DashboardHeader from '../components/DashboardHeader';
import ProvidersStatusBox from './components/ProvidersStatusBox';
import ProviderBox from './components/ProviderBox';

const Providers = () => {
  return (
    <div className='providers-component-container'>
      <div className='providers-component-wrapper'>
        <DashboardHeader
          pageName='Operadoras'
          searchPlaceholder='Pesquise o nome da operadora...'
        />

        <div className='providers-component-info'>
          <ProvidersStatusBox />

          <div className='providers-component-providers-wrapper'>
            <ProviderBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Providers;
