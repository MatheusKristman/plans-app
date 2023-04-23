import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { PlansContext } from '../../contexts/Plans/PlansContext'
import { useContext } from 'react'
import { mockCityes } from '../../utils/Cityes/cityes'

function SearchPlans() {
  const {searchPlans, setSearchPlans} = useContext(PlansContext)

  return (
    <Box sx={{position: 'absolute', width: '900px', height: '400px', background: '#fff', top: '15%',
      display: 'flex', flexDirection: 'row-reverse', borderRadius: '15px'}}>
      <Box sx={{position: 'relative'}}>
        <img src="./assets/images/SearchPlans-bg.png" alt="imagem de complemento" style={{width: '100%', height: '100%'}} />
        <button style={{width: '30px', height: '30px', borderRadius: '8px',
          border: 'none', background: '#fff', fontSize: '16px', top: '10%',
          position: 'absolute', right: '10%', cursor: 'pointer'}} onClick={() => setSearchPlans(!searchPlans)}>X</button>
      </Box>
      <Stack sx={{width: '59%', height: '100%', borderRadius: '15px', padding: '2%', justifyContent: 'space-evenly'}}>
        <Box>
          <Typography variant='h5' fontWeight="bold">
            Antes de Começar
          </Typography>
        </Box>
        <Stack sx={{
          width: '100%', height: '80%', justifyContent: 'center', gap: '5%'
        }}>
          <Typography variant='h5' fontWeight="medium">
            Qual cidade que você mora?
          </Typography>
          <select name="city" id="city"
            style={{width: '80%', height: '18%', paddingLeft: '2%', borderRadius: '10px', fontSize: '16px'}}
          >
            {mockCityes.map(city => (
              <option value={city.name} key={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          <button type='submit'
          style={{width: '30%', height: '15%', borderRadius: '10px', border: 'none',
            background: '#D40066', color: '#fff', fontSize: '16px', cursor: 'pointer'}}>Procurar</button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default SearchPlans
