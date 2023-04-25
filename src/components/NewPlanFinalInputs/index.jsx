import { Box, Typography } from '@mui/material'
import React from 'react'
import { planTypes } from '../../utils/PlanTypes/planTypes'
import { priorityes } from '../../utils/Priority/piority'

function NewPlanFinalInputs({setUnlimitedCall, setPlanType, setPriority, setDescription}) {
  return (
    <>
      <Box sx={{width: '100%', height: '8%', display: 'flex', alignItems: 'center'}}>
        <label style={{width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
          <input type="radio" name="unlimited-calls" id="sim" onChange={(e) => setUnlimitedCall(e.target.value)} value={true}/>
          Sim
        </label>
        <label style={{width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
          <input type="radio" name="unlimited-calls" id="nao" onChange={(e) => setUnlimitedCall(e.target.value)} value={false}/>
          Não
        </label>
      </Box>
      <Box sx={{width: '100%', height: '90%', display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '3%'}}>
        <label>
          <Typography variant='h7' fontWeight='bold'>Tipo do plano</Typography>
        </label>
        <select name="planType" id="planType"
          style={{width: '100%', height: '45px', border: '2px solid #000',
            background: 'transparent', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'}}
            onChange={(e) => setPlanType(e.target.value)}
          >
          {planTypes.map((plan) => (
            <option
              value={plan.name}
              key={plan.id}
              style={{fontSize: '16px', fontWeight: 'bold'}}
            >{plan.name}</option>
          ))}
        </select>
        <label>
          <Typography variant='h7' fontWeight='bold'>Prioridade</Typography>
        </label>
        <select name="priority" id="priority"
          style={{width: '100%', height: '45px', border: '2px solid #000',
            background: 'transparent', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'}}
            onChange={(e) => setPriority(e.target.value)}
          >
          {priorityes.map((pri) => (
            <option
              value={pri.name}
              key={pri.id}
              style={{fontSize: '16px', fontWeight: 'bold'}}
            >{pri.name}</option>
          ))}
        </select>
        <label>
          <Typography variant='h7' fontWeight='bold'>Descrição:</Typography>
        </label>
        <textarea style={{width: '100%', height: '40%', borderRadius: '10px',
          resize: 'none', border: '2px solid #000', fontSize: '18px', paddingLeft: '10px', paddingTop: '10px'}}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
    </>
  )
}

export default NewPlanFinalInputs
