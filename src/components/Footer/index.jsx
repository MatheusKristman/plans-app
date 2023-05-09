import { Box, Button, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

function Footer() {
  const [supportMessage, setSupportMessage] = useState('');
  const [sendingSupportMessage, setSendingSupportMessage] = useState(false);

  const submitSupportMessage = () => {
    setSendingSupportMessage(true);
  };

  useEffect(() => {
    const sendMessage = () => {
      setSendingSupportMessage(false);
      window.location.assign(`${import.meta.env.VITE_WHATSAPP_BASE_API}${supportMessage}`);
    };

    if (sendingSupportMessage) {
      sendMessage();
    }
  }, [sendingSupportMessage]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: '#E9EBFF',
        justifyContent: 'center',
        width: '100%',
        paddingLeft: {
          xs: '25px',
          md: '60px',
          lg: '120px',
        },
        paddingRight: {
          xs: '25px',
          md: '60px',
          lg: '120px',
        },
        paddingTop: '50px',
      }}
    >
      <Stack
        sx={{
          width: '100%',
          maxWidth: '1400px',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
            },
            gridTemplateRows: {
              xs: '1f 1fr 1fr',
              sm: '1fr 1fr',
              md: '1fr',
            },
            gap: '50px',
            paddingBottom: '100px',
          }}
        >
          <Stack
            sx={{
              width: '100%',
            }}
          >
            <Typography variant='h4' marginBottom='35px'>
              Logo
            </Typography>
            <Typography variant='h7' fontFamily='Montserrat' maxWidth='260px'>
              Encontrado o plano perfeito com facilidade e praticidade
            </Typography>
          </Stack>
          <Stack
            sx={{
              width: '100%',
              gap: '25px',
              alignItems: 'start',
            }}
          >
            <a
              href='#about'
              style={{
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                fontSize: '1.25rem',
              }}
              className='header-menu-item'
            >
              Como funciona
            </a>
            <a
              href='#benefits'
              style={{
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                fontSize: '1.25rem',
              }}
              className='header-menu-item'
            >
              Benefícios
            </a>
            <a
              href='#faq'
              style={{
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                fontSize: '1.25rem',
              }}
              className='header-menu-item'
            >
              FAQ
            </a>
          </Stack>
          <Stack
            sx={{
              width: '100%',
              gap: '8%',
            }}
          >
            <Typography
              variant='h4'
              fontWeight='500'
              fontSize='1.5rem'
              fontFamily='Montserrat'
              marginBottom='35px'
            >
              Suporte
            </Typography>
            <input
              type='text'
              placeholder='Digite sua dúvida aqui'
              style={{
                width: '100%',
                height: '50px',
                paddingLeft: '16px',
                borderRadius: '8px',
                outline: 'none',
                border: '2px solid #979EC2',
                fontSize: '15px',
                marginBottom: '15px',
              }}
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
            />
            <Button
              sx={{
                width: 'fit-content',
                padding: '15px 30px',
                borderRadius: '8px',
                fontSize: '1.125rem',
                fontWeight: 600,
                fontFamily: 'Montserrat',
                lineHeight: 'unset',
                border: 'none',
                background: '#979EC2',
                color: '#fff',
                cursor: 'pointer',
                backgroundColor: '#979EC2',
                transition: 'filter 0.3s ease',
                ':hover': {
                  backgroundColor: '#979EC2',
                  filter: 'brightness(80%)',
                },
                filter: sendingSupportMessage ? 'brightness(80%)' : 'none',
                textTransform: 'none',
              }}
              onClick={submitSupportMessage}
              disabled={sendingSupportMessage}
            >
              {sendingSupportMessage ? 'Enviando' : 'Enviar'}
            </Button>
          </Stack>
        </Box>
        <Stack
          sx={{
            height: '20%',
            borderTop: '2px solid #AAB0F1',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row', md: 'row' },
            paddingY: '5%',
            gap: '15px',
          }}
        >
          <a
            href='https://portfolio-2-0-iota-henna.vercel.app/'
            target='_blank'
            rel='noreferrer noopener'
          >
            <img src='/assets/icons/mk-logo.svg' />
          </a>
          <Typography variant='h7' fontSize='0.875rem' textAlign='center' fontFamily='Montserrat'>
            © Copyright - 2023 - nome da empresa
          </Typography>
          <Typography variant='h7'>Logo Agência</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
