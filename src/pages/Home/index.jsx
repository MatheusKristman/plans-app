import { useEffect, useState } from 'react'
import Sidebar from '../../components/Navbar/index.'
import { Box, Stack, Typography } from '@mui/material'
import SearchBar from '../../components/SearchBar'
import { fetchFromApi } from '../../utils/fetchFromApi'
import Planos from '../../components/Planos'

function Home() {
  const [selectedOption, setSelectedOption] = useState('Dashboard')
  const [planos, setPlanos] = useState([])

  useEffect(() => {
    fetchFromApi().then(data => setPlanos(data.plans))
  }, [selectedOption])

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        gap: '5%'
      }}
    >
      <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <Stack
        sx={{
          width: '73%',
          height: '100%',
        }}
      >
        <Box sx={{
          width: '100%',
          height: '10%',
          padding: '1%',
        }}>
          <Stack
            direction="row"
            sx={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10%'
            }}
          >
            <Typography
              variant='h5'
              sx={{
                fontWeight: '600',
                alignSelf: 'flex-end'
              }}
            >
              {selectedOption}
            </Typography>
            <SearchBar />
          </Stack>
        </Box>
        <Planos planos={planos} />
      </Stack>
    </Box>
  )
}

export default Home
