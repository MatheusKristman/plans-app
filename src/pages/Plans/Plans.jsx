import React from 'react';
import usePlansStore from '../../stores/usePlansStore';
import { shallow } from 'zustand/shallow';

import DashboardHeader from '../components/DashboardHeader';
import PlansCategories from './components/PlansCategories';
import PlansStatusBox from './components/PlansStatusBox';
import CelPlanBox from './components/CelPlanBox';
import InternetPlanBox from './components/InternetPlanBox';
import TVPlanBox from './components/TVPlanBox';
import PlansArchivedStatusBox from './components/PlansArchivedStatusBox';
import CelPlansArchivedBox from './components/CelPlansArchivedBox.jsx';
import InternetPlansArchivedBox from './components/InternetPlansArchivedBox';
import TVPlansArchivedBox from './components/TVPlansArchivedBox';
import EditInternetPlanForm from './components/EditInternetPlanForm';
import EditCelPlanForm from './components/EditCelPlanForm';
import EditTVPlanForm from './components/EditTVPlanForm';
import InternetDetailsBox from './components/InternetDetailsBox';
import CelDetailsBox from './components/CelDetailsBox';
import TVDetailsBox from './components/TVDetailsBox';

const Plans = () => {
  const {
    isEditInternetFormOpen,
    isEditCelFormOpen,
    isEditTVFormOpen,
    isInternetDetailsBoxOpen,
    isCelDetailsBoxOpen,
    isTVDetailsBoxOpen,
  } = usePlansStore(
    (state) => ({
      isEditInternetFormOpen: state.isEditInternetFormOpen,
      isEditCelFormOpen: state.isEditCelFormOpen,
      isEditTVFormOpen: state.isEditTVFormOpen,
      isInternetDetailsBoxOpen: state.isInternetDetailsBoxOpen,
      isCelDetailsBoxOpen: state.isCelDetailsBoxOpen,
      isTVDetailsBoxOpen: state.isTVDetailsBoxOpen,
    }),
    shallow
  );

  return (
    <div className='plans-component-container'>
      {isEditInternetFormOpen && <EditInternetPlanForm />}
      {isEditCelFormOpen && <EditCelPlanForm />}
      {isEditTVFormOpen && <EditTVPlanForm />}
      {isInternetDetailsBoxOpen && <InternetDetailsBox />}
      {isCelDetailsBoxOpen && <CelDetailsBox />}
      {isTVDetailsBoxOpen && <TVDetailsBox />}

      <div className='plans-component-wrapper'>
        <DashboardHeader pageName='Planos' searchPlaceholder='Pesquise o nome do plano...' />

        <div className='plans-component-info'>
          <h3 className='plans-component-mobile-title'>Planos</h3>
          <PlansCategories />

          <div className='plans-component-active-plans'>
            <PlansStatusBox />

            <div className='plans-component-plans-wrapper'>
              <InternetPlanBox />
              <CelPlanBox />
              <TVPlanBox />
            </div>
          </div>

          <div className='plans-component-archived-plans'>
            <PlansArchivedStatusBox />

            <div className='plans-component-archived-plans-wrapper'>
              <InternetPlansArchivedBox />
              <CelPlansArchivedBox />
              <TVPlansArchivedBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
