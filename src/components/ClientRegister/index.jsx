import { Box, Stack, Typography } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { CgClose } from 'react-icons/cg';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { format, isValid } from 'date-fns';
import InputMask from 'react-input-mask';

function ClientRegister({ clientRegisterMenu, setClientRegisterMenu, planInfos }) {
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [motherName, setMotherName] = useState('');
  const [cel, setCel] = useState('');
  const [planId, setPlanId] = useState(planInfos?._id);
  const [validCpf, setIsValidCpf] = useState();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const api = useApi();

  const backgroundRef = useRef(null);
  const modalRef = useRef(null);

  const schema = yup.object({
    name: yup
      .string()
      .min(6, 'Insira acima de 6 caracteres')
      .max(50, 'Insira abaixo de 50 caracteres')
      .required('Nome é obrigatório'),
    cpf: yup
      .string()
      .min(6, 'Insira acima de 6 caracteres')
      .max(50, 'Insira abaixo de 50 caracteres')
      .required('CPF é obrigatório'),
    dateOfBirth: yup
      .string()
      .min(10, 'Data de nascimento é obrigatório')
      .required('Data de nascimento é obrigatório'),
    motherName: yup
      .string()
      .min(6, 'Insira acima de 6 caracteres')
      .max(50, 'Insira abaixo de 50 caracteres')
      .required('Nome da mãe é obrigatório'),
    cel: yup
      .string()
      .min(14, 'Insira o número de celular corretamente')
      .required('Número de celular é obrigatório'),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const handleCpfChange = (e) => {
    const { value } = e.target;

    const cpf = value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');

    return cpf;
  };

  const handleTelChange = (e) => {
    const { value } = e.target;

    const phoneNumber = value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');

    return phoneNumber;
  };

  const isValidCpf = (cpf) => {
    if (cpf === '') return false;
    // Elimina CPFs inválidos conhecidos
    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false;
    }

    return true;
  };

  const handleCloseModal = () => {
    backgroundRef.current.style.animation = 'fadeOutBG 0.4s ease forwards';
    modalRef.current.style.animation = 'fadeOut 0.2s ease forwards';

    setTimeout(() => {
      setClientRegisterMenu(false);
    }, 400);
  };

  const handleCloseModalOnScreen = (e) => {
    if (e.target.classList.contains('initial-search-bg')) {
      backgroundRef.current.style.animation = 'fadeOutBG 0.4s ease forwards';
      modalRef.current.style.animation = 'fadeOut 0.2s ease forwards';

      setTimeout(() => {
        setClientRegisterMenu(false);
      }, 400);
    }
  };

  const handleSubmitRegister = async () => {
    setSubmitting(true);
    setMessage(
      `Olá, gostaria de saber mais sobre o plano, segue os dados: Nome:%20${name};%20CPF:%20${cpf};%20Data%20de%20Nascimento:%20${dateOfBirth};%20Nome%20Completo%20da%20Mãe:%20${motherName};%20Celular:%20${cel};%20Plano:%20${
        planInfos.title
      };%20Fraquia:%20${planInfos.franchise}GB;%20Valor:%20R$%20${planInfos.cost
        .toFixed(2)
        .replace('.', ',')};`
    );
  };

  useEffect(() => {
    const saveDataAndRedirect = async () => {
      let valid = isValidCpf(cpf);

      setIsValidCpf(valid);

      if (!valid) {
        setError(!error);
        return;
      }

      const response = await api.registerLead(name, cpf, dateOfBirth, motherName, cel, planId);
      console.log(response);

      if (response.registered) {
        console.log('redirecionando');
        window.location.assign(`${import.meta.env.VITE_WHATSAPP_BASE_API}${message}`);
        setSubmitting(false);
      }
    };

    if (submitting && message !== '') {
      saveDataAndRedirect();
    }
  }, [submitting, message]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(32, 33, 36, .5)',
        zIndex: '9',
        '::before': {
          content: '""',
          height: '100%',
          display: 'inline-block',
          verticalAlign: 'middle',
        },
        overflow: 'auto',
        padding: {
          xs: '25px',
          sm: '50px',
        },
      }}
      ref={backgroundRef}
      className='initial-search-bg'
      onClick={handleCloseModalOnScreen}
    >
      <Box
        sx={{
          display: 'inline-block',
          width: '100%',
          height: 'auto',
          maxWidth: '1000px',
          verticalAlign: 'middle',
          background: '#fff',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: '16px',
          overflow: 'hidden',
          zIndex: '3',
        }}
        ref={modalRef}
        className='initial-search-modal'
      >
        <Box
          sx={{
            width: '100%',
            height: '235px',
            backgroundImage: {
              xs: 'url(./assets/images/register-client-header-mobile.png)',
              sm: 'url(./assets/images/register-client-header-tablet.png)',
              md: 'url(./assets/images/registerClient-header.png)',
            },
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top right',
            position: 'relative',
          }}
        >
          <button
            style={{
              width: '40px',
              height: '40px',
              background: '#fff',
              border: 'none',
              borderRadius: '8px',
              position: 'absolute',
              top: '30px',
              right: '30px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={handleCloseModal}
          >
            <CgClose size={25} color='#252525' />
          </button>
          <Box
            sx={{
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: '0px',
              left: '0px',
              padding: '20px 30px',
              borderTopRightRadius: '16px',
              borderTopLeftRadius: {
                xs: '16px',
                sm: '0',
              },
              width: {
                xs: '100%',
                sm: 'auto',
              },
            }}
          >
            <Typography
              variant='h7'
              fontFamily='Montserrat'
              fontWeight='600'
              fontSize={{ xs: '1.5rem', sm: '1.875rem' }}
              textAlign='center'
              color='#252525'
            >
              Confirme seus dados
            </Typography>
          </Box>
        </Box>
        <Stack
          sx={{
            width: '100%',
            flexDirection: 'row',
            padding: '35px 30px',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column-reverse',
              md: 'row',
            },
            gap: '35px',
          }}
        >
          <form className='register-client-form' onSubmit={handleSubmit(handleSubmitRegister)}>
            <Stack gap='5px' marginBottom='15px'>
              <Typography
                variant='h7'
                fontWeight='500'
                fontSize='1.25rem'
                color='#252525'
                fontFamily='Montserrat'
              >
                Nome Completo
              </Typography>
              <input
                {...register('name')}
                type='text'
                name='name'
                style={{
                  width: '100%',
                  height: '50px',
                  borderRadius: '8px',
                  padding: '0 16px',
                  fontSize: '1rem',
                  fontFamily: 'Montserrat',
                  transition: 'border 0.3s ease',
                  color: '#252525',
                }}
                className='client-name-input'
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                autoComplete='off'
              />
            </Stack>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: '1fr 1fr',
                },
                gridTemplateRows: {
                  xs: '1fr 1fr',
                  md: '1fr',
                },
                gap: '10px',
                marginBottom: '15px',
              }}
            >
              <Stack sx={{ width: '100%' }}>
                <Typography
                  variant='h7'
                  fontFamily='Montserrat'
                  fontSize='1.25rem'
                  fontWeight='500'
                  color='#252525'
                  marginBottom='5px'
                >
                  {!error ? 'CPF' : 'CPF Inválido'}
                </Typography>
                <input
                  {...register('cpf')}
                  type='text'
                  name='cpf'
                  style={{
                    width: '100%',
                    height: '50px',
                    borderRadius: '8px',
                    padding: '0 16px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    color: '#252525',
                  }}
                  className='client-cpf-input'
                  onChange={(e) => setCpf(handleCpfChange(e))}
                  value={cpf}
                  required
                />
              </Stack>
              <Stack gap='4px' sx={{ width: '100%' }}>
                <Typography
                  variant='h7'
                  fontFamily='Montserrat'
                  fontSize='1.25rem'
                  fontWeight='500'
                  color='#252525'
                >
                  Data de nascimento
                </Typography>
                <InputMask
                  {...register('dateOfBirth')}
                  name='dateOfBirth'
                  type='text'
                  mask='99/99/9999'
                  style={{
                    width: '100%',
                    height: '50px',
                    borderRadius: '8px',
                    padding: '0 16px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    color: '#252525',
                  }}
                  className='client-birth-input'
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </Stack>
            </Box>

            <Stack gap='5px' marginBottom='15px'>
              <Typography
                variant='h7'
                fontFamily='Montserrat'
                fontSize='1.25rem'
                fontWeight='500'
                color='#252525'
              >
                Nome completo da mãe
              </Typography>
              <input
                {...register('motherName')}
                name='motherName'
                type='text'
                style={{
                  width: '100%',
                  height: '50px',
                  borderRadius: '8px',
                  padding: '0 16px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  color: '#252525',
                }}
                className='client-mother-name-input'
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
              />
            </Stack>
            <Stack gap='5px' marginBottom='15px'>
              <Typography
                variant='h7'
                fontFamily='Montserrat'
                fontSize='1.25rem'
                fontWeight='500'
                color='#252525'
              >
                Celular + DDD
              </Typography>
              <input
                {...register('cel')}
                name='cel'
                type='tel'
                style={{
                  width: '100%',
                  height: '50px',
                  borderRadius: '8px',
                  padding: '0 16px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  color: '#252525',
                }}
                className='client-tel-input'
                value={cel}
                onChange={(e) => setCel(handleTelChange(e))}
              />
            </Stack>
            <label
              style={{
                width: '100%',
                height: '10%',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-around',
                marginBottom: '25px',
              }}
            >
              <input
                type='checkbox'
                name='Authorization'
                id=''
                style={{ accentColor: '#D40066' }}
                required
              />
              <Typography variant='h7' width='90%'>
                Autorizo a comunicação referente ao meu pedido e confirmação dos dados para
                contratação do plano.
              </Typography>
            </label>
            <button
              style={{
                width: '100%',
                background: '#D40066',
                color: '#fff',
                fontSize: '1.25rem',
                fontWeight: '700',
                border: 'none',
                borderRadius: '8px',
                padding: '15px 50px',
                cursor: 'pointer',
                filter: submitting ? 'brightness(80%)' : 'none',
              }}
              className='client-btn'
              type='submit'
              disabled={submitting}
            >
              {submitting ? 'FAZENDO PEDIDO' : 'FAZER PEDIDO'}
            </button>
          </form>
          <Stack
            sx={{
              width: {
                xs: '100%',
                md: '50%',
              },
              height: 'fit-content',
              background: '#EFEFEF',
              borderRadius: '8px',
              padding: '25px',
            }}
          >
            <Typography
              variant='h7'
              fontFamily='Montserrat'
              fontSize='1.5rem'
              fontWeight='600'
              textAlign='center'
              color='#252525'
              marginBottom='35px'
            >
              Resumo do Pedido
            </Typography>
            <Box
              sx={{
                width: '100%',
                paddingBottom: '50px',
                borderBottom: '2px solid lightGray',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '15px',
                }}
                className='register-client-product-box'
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: '15px',
                  }}
                >
                  <Box
                    sx={{
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                    }}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_BASE}/assets/${planInfos.providerLogo}`}
                      alt='Provedor image'
                      style={{
                        width: '90%',
                        height: 'auto',
                      }}
                    />
                  </Box>
                  <Stack
                    sx={{
                      justifyContent: 'center',
                      gap: '5px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Montserrat',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#252525',
                      }}
                    >
                      {planInfos.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'Montserrat',
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: '#252525',
                      }}
                    >
                      {planInfos.franchise}GB
                    </Typography>
                  </Stack>
                </Box>

                <Typography
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Montserrat',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#252525',
                  }}
                >
                  R$ {planInfos.cost.toFixed(2).replace('.', ',')}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '30px',
              }}
              className='register-client-total-box'
            >
              <Typography
                sx={{
                  fontFamily: 'Montserrat',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#252525',
                }}
              >
                Total
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Montserrat',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#252525',
                }}
              >
                R$ {planInfos.cost.toFixed(2).replace('.', ',')}/{planInfos.period}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default ClientRegister;
