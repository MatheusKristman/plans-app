import { useState } from 'react'
import Sidebar from '../../components/Sidebar/index.'
import { Box, Stack, Typography } from '@mui/material'
import { SearchBar } from '../../components'

import { Planos } from '../../components'

function Dashboard() {
  const [selectedOption, setSelectedOption] = useState('Dashboard')

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', gap: '5%'}}>
      <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <Stack sx={{ width: '73%', height: '100%', }}>
        <Box sx={{ width: '100%', height: '10%',padding: '1%',}}>
          <Stack direction="row" sx={{ width: '100%', height: '100%',
            justifyContent: 'center', alignItems: 'center', gap: '10%'
          }}
          >
            <Typography variant='h5' sx={{ fontWeight: '600', alignSelf: 'flex-end'}}>
              {selectedOption}
            </Typography>
            <SearchBar />
          </Stack>
        </Box>
        <Planos />
      </Stack>
    </Box>
  )
}

export default Dashboard
