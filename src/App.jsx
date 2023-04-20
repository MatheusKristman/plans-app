import React, {useState} from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Benefits, Header } from './components';
import { stepsLoop } from './utils/steps/steps';
import { aboutLoop } from './utils/About/about';
import {FiArrowDownCircle, FiArrowUpCircle} from 'react-icons/fi';

function App() {
  const [aboutOn, setAboutOn] = useState(false);
  const [aboutId, setAboutId] = useState('');

  const handleMoreAbout = (about) => {
    setAboutId(about.id)
    setAboutOn(!aboutOn)
    if(aboutOn) {
      setAboutId('')
    }
  }

  return (
    <Stack sx={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <Header />
      <Stack sx={{width: '80%', height: {sm: '900px', md: '300px'}, position: 'relative', alignItems: 'center', justifyContent: 'center'}}>
        <img src="./assets/images/XMLID_1124_.png" alt="bolinhas" style={{position: 'absolute', left: '-100px', top: '-150px'}} />
        <Box sx={{width: '100%', height: '90%', zIndex: '99999', display: 'flex', justifyContent: 'center',
          flexDirection: 'column', gap: '5%'}}>
          <Typography variant='h5' fontWeight="bold">Seu plano em apenas 3 passos</Typography>
          <Stack sx={{width: '100%', height: '80%', alignItems: 'center', justifyContent: 'space-between', flexDirection: {sm: 'column', md: 'row'}}}>
            {stepsLoop.map(step => (
              <Stack direction="row" sx={{width: {sm: '100%', md: '32%'}, height: {sm: '25%',md: '70%'}, border: '2px solid #D40066',
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
      <Box sx={{width: '100%', height: {sm: '700px',md: '500px'}, backgroundImage: 'url(./assets/images/main-bg.png)',
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Benefits />
      </Box>
      <Box sx={{width: '100%', height: {xs: '750px', sm: '600px',md: '600px'}, background: 'linear-gradient(180deg, rgba(255,239,235,1) 0%, rgba(255,255,255,1) 53%)',
        alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
        <Box sx={{width: '80%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <Stack sx={{gap: '12%', height: {xs: '20%', sm: '13%', md: '13%'}}}>
            <Typography variant='h5' fontWeight="bold">Um pouco mais sobre (Nome da empresa)</Typography>
            <Typography variant='h7' >Somos um comparador de ofertas de serviços financeiros e de telecom. Utilizando nossa ferramenta, você encontra planos de celular.</Typography>
          </Stack>
          <Stack sx={{width: '100%' , height: {xs: '80%', sm: '80%', md: '50%'}, gap: '10%', justifyContent: 'center'}}>
            {aboutLoop.map(item => (
              <Stack key={item.id} sx={{ width: '100%', height: aboutId === item.id ? '35%' : '15%', borderBottom: '2px solid lightGray', justifyContent: 'center', gap: '15%'}}>
                <Box sx={{width: '100%', height: '35%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Box sx={{height: '100%', display: 'flex', alignItems: 'center', width: '90%'}}>
                    <Typography variant='h7'>{item.name}</Typography>
                  </Box>
                  <Box
                    sx={{height: '100%', display: 'flex', alignItems: 'center', width: '3%', justifyContent: 'center', cursor: 'pointer'}}
                    onClick={() => handleMoreAbout(item)}
                  >
                    {
                      aboutOn && aboutId === item.id ? <FiArrowUpCircle /> : <FiArrowDownCircle />
                    }
                  </Box>
                </Box>
                <Stack direction="row" sx={{width: '100%', height: '60%', alignItems: 'center', paddingLeft: '2%', display: aboutId === item.id ? 'flex' : 'none'}}>
                  <Box sx={{width: '100%', height: '100%', borderLeft: '2px solid #D40066', paddingLeft: '2%', display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                    <Typography>{item.description}</Typography>
                  </Box>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>
      <Box sx={{width: '100%', height: {xs: '600px', sm: '400px', md: '400px'}, background: '#E9EBFF', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Stack sx={{width: '80%', height: '100%'}}>
          <Stack sx={{height: '85%', paddingTop: '2%', justifyContent: 'space-between', flexDirection: {xs: 'column', sm: 'row', md: 'row'}}}>
            <Stack sx={{width: {xs: '70%', sm: '30%', md: '30%'}, height: {xs: '50%', sm: '100%', md: '100%'}, gap: '10%'}}>
              <Typography variant='h4'>Logo</Typography>
              <Typography variant='h7'>Encontrado o plano perfeito com facilidade e praticidade</Typography>
            </Stack>
            <Stack sx={{width: {xs: '70%', sm: '30%', md: '30%'}, height: {xs: '50%', sm: '100%', md: '100%'}, gap: '8%',}}>
              <Typography variant='h4'>Lorem</Typography>
              <Typography variant='h7'>Como funciona</Typography>
              <Typography variant='h7'>Benefícios</Typography>
              <Typography variant='h7'>FAQ</Typography>
            </Stack>
            <Stack sx={{width: {xs: '70%', sm: '30%', md: '30%'}, height: {xs: '50%', sm: '100%', md: '100%', gap: '8%'}}}>
              <Typography variant='h4'>Suporte</Typography>
              <input type="text" placeholder='Digite sua dúvida aqui' style={{width: '250px', height: '50px', paddingLeft: '3%',
                borderRadius: '8px', outline: 'none', border: '2px solid gray', fontSize: '16px'}} />
              <button style={{width: '100px', height: '40px', borderRadius: '8px', fontSize: '16px', border: 'none',
                background: '#979EC2', color: '#fff', cursor: 'pointer'}}>Enviar</button>
            </Stack>
          </Stack>
          <Stack direction="row" sx={{height: '15%', borderTop: '2px solid lightGray', alignItems: 'center', justifyContent: 'space-between'}}>
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
