import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { About, Benefits, Header } from './components';
import { stepsLoop } from './utils/steps/steps';

function App() {

  return (
    <Stack sx={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <Header />
      <Stack sx={{width: {xs: '90%', sm: '90%', md: '80%'}, height: {xs: '700px', sm: '900px', md: '300px'}, position: 'relative', alignItems: 'center', justifyContent: 'center'}}>
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
      <Box sx={{width: '100%', height: {xs: '700px', sm: '400px', md: '400px'}, background: '#E9EBFF', display: 'flex', alignItems: 'center',
        justifyContent: 'center', paddingTop: {xs: '0px', sm: '10%', md: '0px'}}}>
        <Stack sx={{width: '80%', height: '100%'}}>
          <Stack sx={{height: '85%', paddingTop: {xs: '15%', sm: '2%', md: '2%'}, justifyContent: 'space-between', flexDirection: {xs: 'column', sm: 'row', md: 'row'}}}>
            <Stack sx={{width: {xs: '100%', sm: '30%', md: '30%'}, height: {xs: '35%', sm: '100%', md: '100%'}, gap: '10%'}}>
              <Typography variant='h4'>Logo</Typography>
              <Typography variant='h7'>Encontrado o plano perfeito com facilidade e praticidade</Typography>
            </Stack>
            <Stack sx={{width: {xs: '100%', sm: '30%', md: '30%'}, height: {xs: '35%', sm: '100%', md: '100%'}, gap: '8%',
              alignItems: {xs: 'start',sm: 'center', md: 'start'}}}>
              <Typography variant='h7'>Como funciona</Typography>
              <Typography variant='h7'>Benefícios</Typography>
              <Typography variant='h7'>FAQ</Typography>
            </Stack>
            <Stack sx={{width: {xs: '80%', sm: '30%', md: '30%'}, height: {xs: '50%', sm: '100%', md: '100%', gap: '8%'}}}>
              <Typography variant='h4'>Suporte</Typography>
              <input type="text" placeholder='Digite sua dúvida aqui' style={{width: '100%', height: '50px', paddingLeft: '3%',
                borderRadius: '8px', outline: 'none', border: '2px solid gray', fontSize: '15px'}} />
              <button style={{width: '100px', height: '40px', borderRadius: '8px', fontSize: '16px', border: 'none',
                background: '#979EC2', color: '#fff', cursor: 'pointer'}}>Enviar</button>
            </Stack>
          </Stack>
          <Stack sx={{height: '20%', borderTop: '2px solid lightGray', alignItems: 'center', justifyContent: 'space-between',
            flexDirection: {xs: 'column', sm: 'row', md: 'row'}, paddingY: '5%'}}>
            <Typography variant='h7'>Logo da Equipe</Typography>
            <Typography variant='h7'>© Copyright - 2023 - nome da empresa</Typography>
            <Typography variant='h7'>Logo Agência</Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

export default App;
