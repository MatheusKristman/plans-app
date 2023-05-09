/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { TextField, Button, Typography, Box } from '@mui/material';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Form() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoadingAdminLogin, setIsLoadingAdminLogin] = useState(false);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSignIn(e) {
    e.preventDefault();
    setIsLoadingAdminLogin(true);
    try {
      if (email && password) {
        const isLogged = await auth.signIn(email, password);
        if (isLogged) {
          setIsLoadingAdminLogin(false);
          navigate('/dashboard');
          return;
        }
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      toast.error(error.response.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setEmail('');
      setPassword('');
      setIsLoadingAdminLogin(false);
      setInterval(() => {
        setErrorMessage('');
      }, 4000);
    }
  }

  return (
    <form className='login-form' onSubmit={handleSignIn}>
      <Typography
        variant='h2'
        sx={{
          fontWeight: '600',
          fontSize: '2.188rem',
          fontFamily: 'Montserrat',
          color: '#252525',
          marginBottom: '5px',
          textAlign: 'center',
        }}
      >
        Bem Vindo
      </Typography>
      <Typography
        variant='span'
        sx={{
          fontFamily: 'Montserrat',
          fontSize: '1rem',
          color: '#9F9F9F',
          marginBottom: '50px',
          textAlign: 'center',
        }}
      >
        Por favor insira suas credenciais
      </Typography>
      <Box
        sx={{
          width: {
            xs: '100%',
            md: '400px',
          },
          maxWidth: '400px',
        }}
      >
        <TextField
          required
          label='Email'
          variant='outlined'
          value={email}
          sx={{
            width: '100%',
            height: '60px',
            marginBottom: '15px',
            borderRadius: '8px',
            fontFamily: 'Montserrat',
            fontSize: '1rem',
            color: '#252525',
          }}
          helperText={errorMessage}
          error={errorMessage.length > 6}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: {
            xs: '100%',
            md: '400px',
          },
          maxWidth: '400px',
        }}
      >
        <TextField
          required
          label='Senha'
          variant='outlined'
          type={showPassword ? 'text' : 'password'}
          sx={{
            width: '100%',
            height: '60px',
            marginBottom: '25px',
            borderRadius: '8px',
            fontFamily: 'Montserrat',
            fontSize: '1rem',
            color: '#252525',
          }}
          value={password}
          helperText={errorMessage}
          error={errorMessage.length > 6}
          onChange={(e) => setPassword(e.target.value)}
        />
        <img
          src={showPassword ? './assets/icons/visible.png' : './assets/icons/visibility.png'}
          alt='icone de olho'
          onClick={() => setShowPassword(!showPassword)}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: '15px',
            right: '20px',
          }}
        />
      </Box>
      <Button
        variant='contained'
        type='submit'
        sx={{
          background: '#D40066',
          width: {
            xs: '100%',
            md: '400px',
          },
          maxWidth: '400px',
          height: '60px',
          borderRadius: '4px',
          fontSize: '18px',
          fontWeight: '500',
          transition: 'filter 0.3s ease',
          '&:hover': {
            filter: 'brightness(80%)',
            background: '#D40066',
          },
          marginBottom: '15px',
        }}
        disabled={email === '' || password.length < 5 || isLoadingAdminLogin}
      >
        {isLoadingAdminLogin ? 'Entrando' : 'Entrar'}
      </Button>
      <Typography variant='span' sx={{ color: '#9F9F9F', cursor: 'pointer', textAlign: 'center' }}>
        Esqueci minha senha
      </Typography>
    </form>
  );
}

export default Form;
