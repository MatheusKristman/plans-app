import {  Box, Typography } from '@mui/material'
import React from 'react'
import { franchisesNames } from '../../utils/Franchises/franchises'

function NewPlanInput({setInputTitle, inputTitle, setInputValue, inputValue, setInputDuration, inputDuration}) {
  return (
    <>
      <label style={{width: '100%', height: '25%', display: 'flex', flexDirection: 'column', gap: '5px'}}>
        <Typography variant="h7" fontWeight="bold" mt="5px">Título</Typography>
        <input type="text" style={{height: '50px', border: '2px solid #000', borderRadius: '10px', paddingLeft: '10px',
          fontSize: '20px', background: 'transparent'}}
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
      </label>
      <label style={{width: '100%', height: '25%', display: 'flex', flexDirection: 'column', gap: '5px'}}>
        <Typography variant="h7" fontWeight="bold" mt="5px">Valor</Typography>
        <input type="text" style={{height: '50px', border: '2px solid #000', borderRadius: '10px', paddingLeft: '10px',
          fontSize: '20px', background: 'transparent'}}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <Box sx={{width: '100%', height: '13%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}} >
        <label style={{width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
          <input type="radio" name="plan-duration" id="dia" value={`${inputDuration}dias`}/>
          <input type="text" value={inputDuration}
            onChange={(e) => setInputDuration(e.target.value)} style={{width: '30px', height: '30px', textAlign: 'center'}} />
          dias
        </label>
        <label style={{width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
          <input type="radio" name="plan-duration" id="mes" value={inputDuration} style={{background: '#D40066'}} />
          mes
        </label>
      </Box>
      <Box sx={{width: '100%', height: '25%', display: 'flex', alignItems: 'start',
        justifyContent: 'center', flexDirection: 'column', gap: '15%'}}>
        <label>
          <Typography variant='h7' fontWeight='bold'>Selecione a franquia de internet</Typography>
        </label>
        <select name="franchise" id="franchise"
          style={{width: '100%', height: '45px', border: '2px solid #000',
            background: 'transparent', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'}}>
          {franchisesNames.map((franchise) => (
            <option
              value={franchise.name}
              key={franchise.id}
              style={{fontSize: '16px', fontWeight: 'bold'}}
            >{franchise.name}</option>
          ))}
        </select>
      </Box>
    </>
  )
}

export default NewPlanInput
