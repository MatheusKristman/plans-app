import React from 'react';

const ProviderBox = () => {
  return (
    <div className='providers-component-provider-container'>
      <div className='providers-component-provider-box'>
        <div className='providers-component-info-box'>
          <div className='providers-component-image-title-box'>
            <div className='providers-component-image-box'>
              {/* TODO mudar depois para receber do servidor */}
              <img
                src='/assets/icons/claro.png'
                alt='Claro'
                className='providers-component-image'
              />
            </div>

            <h2 className='providers-component-provider-name'>Claro</h2>
          </div>

          <div className='providers-component-registered-box'>
            <span className='providers-component-registered-value'>6</span>
            <span className='providers-component-registered-desc'>Planos cadastrados</span>
          </div>
        </div>

        <div className='providers-component-buttons-box'>
          <button className='providers-component-details-button'>Ver Detalhes</button>

          <button className='providers-component-edit-button'>Editar</button>
        </div>
      </div>
    </div>
  );
};

export default ProviderBox;
