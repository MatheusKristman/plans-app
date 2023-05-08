import { useState } from 'react';
import Sidebar from '../../components/Sidebar/index.';
import { Box, Stack, Typography } from '@mui/material';
import { SearchBar, SimplePlans } from '../../components';
import Planos from '../Planos';
import Clientes from '../Clientes';
import { HiBars3 } from 'react-icons/hi2';

function Dashboard() {
  const [selectedOption, setSelectedOption] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'relative',
      }}
    >
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <Stack
        sx={{
          width: { xs: '100%', lg: '70%' },
          height: 'auto',
          margin: '0 auto',
          padding: '0 25px 100px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            padding: '30px 0 75px',
          }}
        >
          <Stack
            direction='row'
            sx={{
              width: '100%',
              height: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className='dashboard-mobile-menu-btn'
            >
              <HiBars3 />
            </button>
            <Typography
              variant='h5'
              sx={{
                fontWeight: '600',
                alignSelf: 'center',
                fontFamily: 'Montserrat',
                fontSize: { xs: '1.25rem', sm: '1.875rem' },
                color: '#252525',
                marginRight: { xs: '0', sm: '25px' },
              }}
            >
              {selectedOption}
            </Typography>
            <SearchBar />
          </Stack>
        </Box>
        {selectedOption === 'Dashboard' && <SimplePlans />}
        {selectedOption === 'Planos' && <Planos />}
        {selectedOption === 'Clientes' && <Clientes />}
      </Stack>
    </Box>
  );
}

export default Dashboard;
