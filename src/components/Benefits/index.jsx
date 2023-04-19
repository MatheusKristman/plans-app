import React from 'react'
import { benefitsLoop } from '../../utils/steps/benefits'
import { Box, Typography, Stack } from '@mui/material'

function Benefits() {
  return (
    <Box sx={{width: '80%', height: '80%', display: 'flex',
    alignItems: 'center', justifyContent: 'center'}}>
      <Stack sx={{width: '100%', height: '70%', justifyContent: 'center', gap: '5%'}}>
        <Typography variant='h5' fontWeight='bold'>Os benefícios levados até você</Typography>
        <Box sx={{width: '100%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap'}}>
          {benefitsLoop.map(benefit => (
            <Box
              key={benefit.id}
              sx={{width: '45%', height: '40%', display: 'flex', alignItems: 'center'}}
            >
              <Box sx={{width: '18%', height: '100%'}}>
                <img src={benefit.icon} alt="" />
              </Box>
              <Stack sx={{width: '80%', height: '100%', gap: '10%'}}>
                <Typography variant='h7' fontWeight="bold">{benefit.name}</Typography>
                <Typography variant='span'>{benefit.description}</Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Stack>
  </Box>
  )
}

export default Benefits
