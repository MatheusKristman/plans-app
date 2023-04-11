/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { TextField, Button, Typography } from '@mui/material';
import React, { useState } from 'react';

function Form() {
  const [showPassword, setShowPassword] = useState(false);

  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }

  return (
    <form className="login-form" action="">
      <div>
        <TextField
          id="outlined"
          required
          label="Email"
          variant="outlined"
          sx={{
            width: '400px',
            height: '60px',
          }}
        />
      </div>
      <div style={{
        position: 'relative',
      }}
      >
        <TextField
          id="outlined"
          required
          label="Senha"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          sx={{
            width: '400px',
            height: '60px',
          }}
        />
        <img
          src={showPassword ? './assets/icons/visible.png' : './assets/icons/visibility.png'}
          alt="icone de olho"
          onClick={handleClickShowPassword}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: '15px',
            right: '20px',
          }}
        />
      </div>
      <Button
        variant="contained"
        sx={{
          background: '#D40066',
          width: '400px',
          height: '60px',
          borderRadius: '4px',
          fontSize: '18px',
          fontWeight: '500',
          '&:hover': {
            background: '#D40066',
          },
        }}
      >
        Entrar
      </Button>
      <Typography
        variant="span"
        sx={{
          color: '#9F9F9F',
          cursor: 'pointer',
        }}
      >
        Esqueci minha senha
      </Typography>
    </form>
  );
}

export default Form;
