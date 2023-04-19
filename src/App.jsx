import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Header } from './components';
import { stepsLoop } from './utils/steps/steps';
import { benefitsLoop } from './utils/steps/benefits';

function App() {
  return (
    <Stack sx={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <Header />
      <Stack sx={{width: '80%', height: '300px', position: 'relative', alignItems: 'center', justifyContent: 'center'}}>
        <img src="./assets/images/XMLID_1124_.png" alt="bolinhas" style={{position: 'absolute', left: '-100px', top: '-150px'}} />
        <Box sx={{width: '100%', height: '90%', zIndex: '99999', display: 'flex', justifyContent: 'center',
          flexDirection: 'column', gap: '5%'}}>
          <Typography variant='h5' fontWeight="bold">Seu plano em apenas 3 passos</Typography>
          <Stack direction="row" sx={{width: '100%', height: '80%', alignItems: 'center', justifyContent: 'space-between'}}>
            {stepsLoop.map(step => (
              <Stack direction="row" sx={{width: '32%', height: '70%', border: '2px solid #D40066',
                borderRadius: '10px', position: 'relative', justifyContent: 'center', alignItems: 'center',
                boxShadow: '5px 5px 10px #Aaa'}}
                key={step.id}
              >
                <Box sx={{width: '35px', height: '35px', background: '#D40066',
                  left: '-2px', position: 'absolute', top: '-2px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: '8px', borderBottomRightRadius: '8px'}}>
                  <Typography variant='h7' fontWeight="bold" sx={{color: '#fff'}}>{step.id}</Typography>
                </Box>
                <Box sx={{width: '90%', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', textAlign: 'center'}}>
                  <Box sx={{width: '100%', height: '40%', textAlign: 'center'}}>
                    <Typography variant='h6' fontWeight="bold">{step.name}</Typography>
                  </Box>
                  <Typography variant='h7' fontWeight="600">{step.description}</Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
      <Box sx={{width: '100%', height: '685px', backgroundImage: 'url(./assets/images/main-bg.png)',
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
      </Box>
    </Stack>
  );
}

export default App;
