import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Form from './components/Form';

function App() {
  return (
    <Box sx={{
      display: 'flex',
      flexFlow: 'row-reverse',
      width: '100%',
      height: '100vh',
    }}
    >
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '45%',
          background: 'linear-gradient(180deg, #D5A595 0%, #F5E0D9 100%);',
        }}
      >
        <img
          src="./assets/images/Login-main-image.png"
          className="main-image"
          alt="imagem de um computador"
        />
      </Stack>
      <Stack
        sx={{
          width: '55%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexFlow: 'column',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
          }}
        >
          Bem Vindo
        </Typography>
        <Typography
          variant="span"
          sx={{
            color: '#9F9F9F',
          }}
        >
          Por favor insira suas credenciais
        </Typography>
        <Form />
      </Stack>
    </Box>
  );
}

export default App;
