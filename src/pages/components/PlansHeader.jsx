import React, { useEffect } from 'react';
import useInternetPlansStore from '../../stores/useInternetPlansStore';
import useGeneralStore from '../../stores/useGeneralStore';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

const PlansHeader = ({ headerTitle, headerDesc }) => {
  const { isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useInternetPlansStore(
    (state) => ({
      isMobileMenuOpen: state.isMobileMenuOpen,
      openMobileMenu: state.openMobileMenu,
      closeMobileMenu: state.closeMobileMenu,
    }),
    shallow
  );
  const { modalAnimation, activateModalAnimation, deactivateModalAnimation } = useGeneralStore(
    (state) => ({
      modalAnimation: state.modalAnimation,
      activateModalAnimation: state.activateModalAnimation,
      deactivateModalAnimation: state.deactivateModalAnimation,
    }),
    shallow
  );

  const navigate = useNavigate();

  const handleMobileMenu = () => {
    if (isMobileMenuOpen) {
      deactivateModalAnimation();

      setTimeout(() => {
        closeMobileMenu();
      }, 500);
    } else {
      openMobileMenu();
      activateModalAnimation();
    }
  };

  useEffect(() => {
    console.log('isMobileMenuOpen: ', isMobileMenuOpen);
    console.log('modalAnimation: ', modalAnimation);
  }, [isMobileMenuOpen, modalAnimation]);

  return (
    <header className='header-container'>
      <div className='header-top-box'>
        <div className='header-top-wrapper wrapper'>
          <div className='header-logo-box'>
            <h4 onClick={() => navigate('/')} className='header-logo'>
              Logo
            </h4>
          </div>

          <nav className='header-mobile-nav'>
            <button onClick={handleMobileMenu} className='header-menu-button'>
              {isMobileMenuOpen ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                  />
                </svg>
              )}
            </button>

            {isMobileMenuOpen && (
              <ul
                className={
                  modalAnimation
                    ? 'header-menu-list animate__animated animate__faster animate__fadeInRight'
                    : 'header-menu-list animate__animated animate__faster animate__fadeOutRight'
                }
              >
                <li
                  onClick={() => {
                    navigate('/planos/banda-larga');
                    deactivateModalAnimation();

                    setTimeout(() => {
                      closeMobileMenu();
                    }, 500);
                  }}
                  className='header-menu-item'
                >
                  Banda Larga
                </li>
                <li
                  onClick={() => {
                    navigate('/planos/celular');
                    deactivateModalAnimation();

                    setTimeout(() => {
                      closeMobileMenu();
                    }, 500);
                  }}
                  className='header-menu-item'
                >
                  Celular
                </li>
                <li
                  onClick={() => {
                    navigate('/planos/tv');
                    deactivateModalAnimation();

                    setTimeout(() => {
                      closeMobileMenu();
                    }, 500);
                  }}
                  className='header-menu-item'
                >
                  TV
                </li>
              </ul>
            )}
          </nav>

          <nav className='header-nav'>
            <ul className='header-menu-list'>
              <li onClick={() => navigate('/planos/banda-larga')} className='header-menu-item'>
                Banda Larga
              </li>
              <li onClick={() => navigate('/planos/celular')} className='header-menu-item'>
                Celular
              </li>
              <li onClick={() => navigate('/planos/tv')} className='header-menu-item'>
                TV
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className='header-bottom-box'>
        <div className='header-bottom-wrapper wrapper'>
          <h3 className='header-bottom-title'>{headerTitle}</h3>
          <p className='header-bottom-desc'>{headerDesc}</p>
          {/* TODO criar um texto */}
        </div>
      </div>
    </header>
  );
};

export default PlansHeader;
