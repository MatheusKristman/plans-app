/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { TextField, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import login from '../../utils/Login';
import { Navigate } from 'react-router-dom';

function Form() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logged, setLogged] = useState(false);

  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }

  function handleSubmit(event) {
    event.preventDefault();
    login(email, password, setLogged);
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        {
          logged && (<Navigate to="/dashboard" replace={true} />)
        }
        <TextField
          required
          label="Email"
          variant="outlined"
          sx={{
            width: '400px',
            height: '60px',
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={{
        position: 'relative',
      }}
      >
        <TextField
          required
          label="Senha"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          sx={{
            width: '400px',
            height: '60px',
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        type="submit"
        disabled={email === '' || password.length < 5}
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
