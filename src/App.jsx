import React, { useContext } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { About, Benefits, Footer, Header } from './components';
import { stepsLoop } from './utils/steps/steps';
import { PlansContext } from './contexts/Plans/PlansContext';

function App() {

  const {searchPlans} = useContext(PlansContext)

  return (
    <Stack sx={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <Header />
      <Stack sx={{width: {xs: '90%', sm: '90%', md: '80%'}, height: {xs: '700px', sm: '900px', md: '300px'},
        position: 'relative', alignItems: 'center', justifyContent: 'center', filter: searchPlans && 'blur(10px)'}}>
        <img src="./assets/images/XMLID_1124_.png" alt="bolinhas" style={{position: 'absolute', left: '-100px', top: '-150px', width: '300px', height: '300px'}} />
        <Box sx={{width: '100%', height: '90%', zIndex: '99999', display: 'flex', justifyContent: 'center',
          flexDirection: 'column', gap: '5%'}}>
          <Typography variant='h5' fontWeight="semiBold">Seu plano em apenas 3 passos</Typography>
          <Stack sx={{width: '100%', height: '70%', alignItems: 'center', justifyContent: 'space-between', flexDirection: {sm: 'column', md: 'row'}}}>
            {stepsLoop.map(step => (
              <Stack direction="row" sx={{width: {xs: '100%',sm: '100%', md: '32%'}, height: {xs: '30%', sm: '25%',md: '70%'}, border: '2px solid #D40066',
                borderRadius: '10px', position: 'relative', justifyContent: 'center', alignItems: 'center', background: '#fff',
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
                    <Typography variant='h6' fontWeight="medium">{step.name}</Typography>
                  </Box>
                  <Typography variant='h7' fontWeight="400">{step.description}</Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
      <Box sx={{width: '100%', height: {xs: '700px', sm: '700px',md: '500px'}, backgroundImage: 'url(./assets/images/main-bg.png)',
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Benefits />
      </Box>
      <Box sx={{width: '100%', height: {xs: '750px', sm: '600px',md: '600px'}, background: 'linear-gradient(180deg, rgba(255,241,238,1) 0%, rgba(255,255,255,1) 53%)',
        alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
        <About />
      </Box>
      <Footer />
    </Stack>
  );
}

export default App;
