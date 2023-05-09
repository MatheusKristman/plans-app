import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { franchisesNames } from '../../utils/Franchises/franchises';

function NewPlanInput({
  setTitle,
  title,
  setCost,
  cost,
  setInputDays,
  inputDays,
  setPeriod,
  period,
  franchise,
  setFranchise,
}) {
  useEffect(() => {
    console.log(inputDays);
  }, [inputDays]);

  return (
    <>
      <label
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          marginBottom: '15px',
        }}
      >
        <Typography
          variant='h7'
          fontFamily='Montserrat'
          fontWeight='500'
          fontSize='1.25rem'
          color='#252525'
        >
          Título
        </Typography>
        <input
          type='text'
          style={{
            height: '50px',
            borderRadius: '10px',
            paddingLeft: '16px',
            fontSize: '1rem',
            background: 'transparent',
            color: '#252525',
          }}
          className='new-plan-title-input'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          marginBottom: '15px',
        }}
      >
        <Typography
          variant='h7'
          fontFamily='Montserrat'
          fontWeight='500'
          fontSize='1.25rem'
          color='#252525'
        >
          Valor
        </Typography>
        <input
          type='number'
          style={{
            height: '50px',
            borderRadius: '10px',
            paddingLeft: '16px',
            fontSize: '1rem',
            background: 'transparent',
            color: '#252525',
          }}
          className='new-plan-cost-input'
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
      </label>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginBottom: '15px',
          gap: '15px',
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Montserrat',
            fontSize: '1rem',
          }}
        >
          <input
            type='radio'
            name='plan-duration'
            onChange={(e) => setPeriod(e.target.value)}
            id={`${inputDays} dias`}
            value={`${inputDays} dias`}
            style={{
              accentColor: '#D40066',
              marginRight: '10px',
            }}
            required
          />
          <input
            type='text'
            value={inputDays}
            onChange={(e) => {
              setInputDays(e.target.value);
              setPeriod(`${e.target.value} dias`);
            }}
            style={{
              width: '30px',
              height: '30px',
              textAlign: 'center',
              marginRight: '10px',
            }}
            required={period !== '1 mês'}
          />
          dias
        </label>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Montserrat',
            fontSize: '1rem',
          }}
        >
          <input
            type='radio'
            name='plan-duration'
            id='mes'
            value='1 mês'
            style={{
              accentColor: '#D40066',
              marginRight: '10px',
            }}
            onChange={(e) => setPeriod(e.target.value)}
            required
          />
          mes
        </label>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'center',
          flexDirection: 'column',
          marginBottom: '15px',
        }}
      >
        <label
          style={{
            marginBottom: '5px',
          }}
        >
          <Typography
            variant='h7'
            fontFamily='Montserrat'
            fontWeight='500'
            fontSize='1.25rem'
            color='#252525'
          >
            Selecione a franquia de internet
          </Typography>
        </label>
        <select
          name='franchise'
          id='franchise'
          style={{
            width: '100%',
            height: '50px',
            background: 'transparent',
            borderRadius: '10px',
            paddingLeft: '16px',
            fontSize: '1rem',
            fontFamily: 'Montserrat',
            cursor: 'pointer',
          }}
          className='new-plan-franchise-input'
          onChange={(e) => setFranchise(e.target.value)}
          value={franchise}
        >
          {franchisesNames.map((franchise) => (
            <option
              value={franchise.name}
              key={franchise.id}
              style={{ fontSize: '16px', fontWeight: 'bold' }}
            >
              {franchise.name}
            </option>
          ))}
        </select>
      </Box>
    </>
  );
}

export default NewPlanInput;
