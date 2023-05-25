import React from 'react';
import useDashboardPageStore from '../../stores/useDashboardPageStore';
import { shallow } from 'zustand/shallow';

import DashboardHeader from '../components/DashboardHeader';
import DashboardPlanBox from './components/DashboardPlanBox';
import DashboardPlanActiveStatus from './components/DashboardPlanActiveStatus';
import DashboardPlanArchivedStatus from './components/DashboardPlanArchivedStatus';

const Dashboard = () => {
  // const { closeMenu } = useDashboardPageStore(
  //   (state) => ({
  //     closeMenu: state.closeMenu,
  //   }),
  //   shallow
  // );

  return (
    <div className='dashboard-component-container'>
      <div className='dashboard-component-wrapper'>
        <DashboardHeader pageName='Dashboard' searchPlaceholder='Pesquise o nome do plano...' />

        <div className='dashboard-component-info'>
          <div className='dashboard-component-active-wrapper'>
            <h3 className='dashboard-component-mobile-title'>Dashboard</h3>
            <DashboardPlanActiveStatus />

            <div className='dashboard-component-plans-wrapper'>
              <DashboardPlanBox
                providerIconPath='/assets/icons/claro.png'
                planTitle='Claro Controle 25GB Fidelizado'
                contactValue='5'
                totalValue={150.4}
                createdValue='24/03/2023'
              />
            </div>
          </div>

          <div className='dashboard-component-archived-wrapper'>
            <DashboardPlanArchivedStatus />

            <div className='dashboard-component-archived-plans-wrapper'>
              <DashboardPlanBox
                providerIconPath='/assets/icons/claro.png'
                planTitle='Claro Controle 25GB Fidelizado'
                contactValue='5'
                totalValue={150.4}
                createdValue='24/03/2023'
                archivedValue='24/03/2023'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
