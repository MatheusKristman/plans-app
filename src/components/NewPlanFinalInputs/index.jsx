import { Box, Typography } from '@mui/material';
import React from 'react';
import { planTypes } from '../../utils/PlanTypes/planTypes';
import { priorityes } from '../../utils/Priority/piority';

function NewPlanFinalInputs({
  setUnlimitedCall,
  setPlanType,
  planType,
  setPriority,
  priority,
  setDescription,
  description,
}) {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '15px',
          gap: '15px',
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <input
            type='radio'
            name='unlimited-calls'
            id='sim'
            onChange={(e) => setUnlimitedCall(e.target.value)}
            value={true}
            style={{
              accentColor: '#D40066',
              marginRight: '10px',
            }}
            required
          />
          Sim
        </label>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <input
            type='radio'
            name='unlimited-calls'
            id='nao'
            onChange={(e) => setUnlimitedCall(e.target.value)}
            value={false}
            style={{
              accentColor: '#D40066',
              marginRight: '10px',
            }}
            required
          />
          Não
        </label>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
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
            Tipo do plano
          </Typography>
        </label>
        <select
          name='planType'
          id='planType'
          style={{
            width: '100%',
            height: '50px',
            background: 'transparent',
            borderRadius: '10px',
            fontSize: '1rem',
            cursor: 'pointer',
            paddingLeft: '16px',
            marginBottom: '15px',
          }}
          className='new-plan-plan-type-input'
          value={planType}
          onChange={(e) => setPlanType(e.target.value)}
        >
          {planTypes.map((plan) => (
            <option
              value={plan.name}
              key={plan.id}
              style={{ fontSize: '16px', fontWeight: 'bold' }}
            >
              {plan.name}
            </option>
          ))}
        </select>
        <label style={{ marginBottom: '5px' }}>
          <Typography
            variant='h7'
            fontFamily='Montserrat'
            fontWeight='500'
            fontSize='1.25rem'
            color='#252525'
          >
            Prioridade
          </Typography>
        </label>
        <select
          name='priority'
          id='priority'
          style={{
            width: '100%',
            height: '50px',
            background: 'transparent',
            borderRadius: '10px',
            paddingLeft: '16px',
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: '15px',
          }}
          className='new-plan-priority-input'
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          {priorityes.map((pri) => (
            <option value={pri.name} key={pri.id} style={{ fontSize: '16px', fontWeight: 'bold' }}>
              {pri.name}
            </option>
          ))}
        </select>
        <label style={{ marginBottom: '5px' }}>
          <Typography
            variant='h7'
            fontFamily='Montserrat'
            fontWeight='500'
            fontSize='1.25rem'
            color='#252525'
          >
            Descrição
          </Typography>
        </label>
        <textarea
          style={{
            width: '100%',
            height: '150px',
            borderRadius: '10px',
            resize: 'none',
            fontSize: '1rem',
            padding: '16px',
          }}
          className='new-plan-desc-textarea'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
    </>
  );
}

export default NewPlanFinalInputs;
