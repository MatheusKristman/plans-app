import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { PlansContext } from '../../contexts/Plans/PlansContext';
import { HiPlus, HiMinus } from 'react-icons/hi';

function ClientsCard({ clients }) {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [planData, setPlanData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [clientId, setClientId] = useState('');

  const { allPlans, search } = useContext(PlansContext);

  const pages = Math.ceil(clients.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = clients.slice(startIndex, endIndex);

  let filteredClients =
    search.length > 0 ? clients?.filter((client) => client.name.includes(search)) : [];

  const handleShowMore = (client) => {
    setShowMore(!showMore);
    setClientId(client._id);
    setPlanData(allPlans.filter((plan) => plan._id.includes(client.plan)));
    if (showMore) {
      setClientId('');
    }
  };

  const insertMaskInCpf = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  };

  // useEffect(() => {
  //     console.log(planData);
  // }, [currentItems]);

  return (
    <>
      {search.length > 0 && filteredClients.length === 0 ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Montserrat',
              fontWeight: '600',
              fontSize: '1.5rem',
              color: '#B0B0B0',
            }}
          >
            Nenhum resultado encontrado
          </Typography>
        </Box>
      ) : search.length > 0 ? (
        filteredClients?.map((client, i) => (
          <Stack
            sx={{
              width: '100%',
              padding: '25px 0',
              borderBottom: '2px solid lightGray',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              overflowY: 'auto',
              gap: '50px',
            }}
            key={client.name + i}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: {
                  xs: 'flex-start',
                  md: 'center',
                },
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
                gap: '50px',
              }}
            >
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'start',
                  gap: '25px',
                }}
              >
                <Box
                  sx={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#F5E0D9',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={`https://planos-backend.onrender.com/assets/${
                      allPlans.filter((plan) => plan._id === client.plan)[0]?.providerLogo
                    }`}
                    alt='logo'
                    style={{
                      width: '80%',
                      height: 'auto',
                    }}
                  />
                </Box>
              </Stack>
              <Stack
                sx={{
                  flexDirection: 'row',
                  width: '80%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '50px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '50px',
                  }}
                >
                  <Stack
                    sx={{
                      minWidth: '150px',
                      maxWidth: '150px',
                      width: '150px',
                      height: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant='h7'
                      fontWeight='500'
                      fontSize='1.125rem'
                      fontFamily='Montserrat'
                      color='#252525'
                    >
                      {client.name}
                    </Typography>
                    <Typography
                      variant='span'
                      sx={{
                        color: '#b0b0b0',
                        fontFamily: 'Montserrat',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                      }}
                    >
                      Nome
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      minWidth: '150px',
                      height: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant='h7'
                      fontWeight='500'
                      fontSize='1.125rem'
                      fontFamily='Montserrat'
                      color='#252525'
                    >
                      {client.cel}
                    </Typography>
                    <Typography
                      variant='span'
                      sx={{
                        color: '#b0b0b0',
                        fontFamily: 'Montserrat',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                      }}
                    >
                      Celular
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      minWidth: '150px',
                      height: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant='h7'
                      fontWeight='500'
                      fontSize='1.125rem'
                      fontFamily='Montserrat'
                      color='#252525'
                    >
                      {insertMaskInCpf(client.cpf)}
                    </Typography>
                    <Typography
                      variant='span'
                      sx={{
                        color: '#b0b0b0',
                        fontFamily: 'Montserrat',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                      }}
                    >
                      Cpf
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      width: '150px',
                      height: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant='h7'
                      fontWeight='500'
                      fontSize='1.125rem'
                      fontFamily='Montserrat'
                      color='#252525'
                    >
                      {client.dateOfBirth}
                    </Typography>
                    <Typography
                      variant='span'
                      sx={{
                        color: '#b0b0b0',
                        fontFamily: 'Montserrat',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                      }}
                    >
                      Data de nascimento
                    </Typography>
                  </Stack>
                </Box>
                <Stack
                  sx={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <button
                    style={{
                      width: '30px',
                      height: '30px',
                      background: '#D40066',
                      border: 'none',
                      borderRadius: '4px',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className='client-show-more-btn'
                    onClick={() => handleShowMore(client)}
                  >
                    {showMore && clientId === client._id ? <HiMinus /> : <HiPlus />}
                  </button>
                </Stack>
              </Stack>
            </Box>
            <Box
              sx={{
                display:
                  clientId === client._id
                    ? 'flex'
                    : {
                        xs: 'flex',
                        md: 'none',
                      },
                width: {
                  xs: '100%',
                  md: '80%',
                },
                justifyContent: 'flex-start',
                gap: '50px',
              }}
            >
              <Stack
                sx={{
                  minWidth: '150px',
                  maxWidth: '150px',
                  width: '150px',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  variant='h7'
                  fontWeight='500'
                  fontSize='1.125rem'
                  fontFamily='Montserrat'
                  color='#252525'
                >
                  {planData[0]?.title}
                </Typography>
                <Typography
                  variant='span'
                  sx={{
                    color: '#b0b0b0',
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                    fontSize: '0.875rem',
                  }}
                >
                  Plano
                </Typography>
              </Stack>
              <Stack
                sx={{
                  width: '150px',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  variant='h7'
                  fontWeight='500'
                  fontSize='1.125rem'
                  fontFamily='Montserrat'
                  color='#252525'
                >
                  {client.dateOfBirth}
                </Typography>
                <Typography
                  variant='span'
                  sx={{
                    color: '#b0b0b0',
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                    fontSize: '0.875rem',
                  }}
                >
                  Data de Contato
                </Typography>
              </Stack>
            </Box>
          </Stack>
        ))
      ) : (
        currentItems.map((client) => (
          <Stack
            sx={{
              width: '100%',
              padding: '25px 0',
              borderBottom: '2px solid lightGray',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              overflowY: 'auto',
              gap: '50px',
            }}
            key={client.name}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: {
                  xs: 'flex-start',
                  md: 'center',
                },
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
                gap: '50px',
              }}
            >
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'start',
                  gap: '25px',
                }}
              >
                <Box
                  sx={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#F5E0D9',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={`https://planos-backend.onrender.com/assets/${
                      allPlans.filter((plan) => plan._id === client.plan)[0]?.providerLogo
                    }`}
                    alt='logo'
                    style={{
                      width: '80%',
                      height: 'auto',
                    }}
                  />
                </Box>
              </Stack>
              <Stack
                sx={{
                  flexDirection: 'row',
                  width: '80%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '50px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '50px',
                  }}
                >
                  <Stack
                    sx={{
                      minWidth: '150px',
                      maxWidth: '150px',
                      width: '150px',
                      height: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant='h7'
                      fontWeight='500'
                      fontSize='1.125rem'
                      fontFamily='Montserrat'
                      color='#252525'
                    >
                      {client.name}
                    </Typography>
                    <Typography
                      variant='span'
                      sx={{
                        color: '#b0b0b0',
                        fontFamily: 'Montserrat',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                      }}
                    >
                      Nome
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      minWidth: '150px',
                      height: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant='h7'
                      fontWeight='500'
                      fontSize='1.125rem'
                      fontFamily='Montserrat'
                      color='#252525'
                    >
                      {client.cel}
                    </Typography>
                    <Typography
                      variant='span'
                      sx={{
                        color: '#b0b0b0',
                        fontFamily: 'Montserrat',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                      }}
                    >
                      Celular
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      minWidth: '150px',
                      height: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant='h7'
                      fontWeight='500'
                      fontSize='1.125rem'
                      fontFamily='Montserrat'
                      color='#252525'
                    >
                      {insertMaskInCpf(client.cpf)}
                    </Typography>
                    <Typography
                      variant='span'
                      sx={{
                        color: '#b0b0b0',
                        fontFamily: 'Montserrat',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                      }}
                    >
                      Cpf
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      width: '150px',
                      height: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant='h7'
                      fontWeight='500'
                      fontSize='1.125rem'
                      fontFamily='Montserrat'
                      color='#252525'
                    >
                      {client.dateOfBirth}
                    </Typography>
                    <Typography
                      variant='span'
                      sx={{
                        color: '#b0b0b0',
                        fontFamily: 'Montserrat',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                      }}
                    >
                      Data de nascimento
                    </Typography>
                  </Stack>
                </Box>
                <Stack
                  sx={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <button
                    style={{
                      width: '30px',
                      height: '30px',
                      background: '#D40066',
                      border: 'none',
                      borderRadius: '4px',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className='client-show-more-btn'
                    onClick={() => handleShowMore(client)}
                  >
                    {showMore && clientId === client._id ? <HiMinus /> : <HiPlus />}
                  </button>
                </Stack>
              </Stack>
            </Box>
            <Box
              sx={{
                display:
                  clientId === client._id
                    ? 'flex'
                    : {
                        xs: 'flex',
                        md: 'none',
                      },
                width: {
                  xs: '100%',
                  md: '80%',
                },
                justifyContent: 'flex-start',
                gap: '50px',
              }}
            >
              <Stack
                sx={{
                  minWidth: '150px',
                  maxWidth: '150px',
                  width: '150px',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  variant='h7'
                  fontWeight='500'
                  fontSize='1.125rem'
                  fontFamily='Montserrat'
                  color='#252525'
                >
                  {planData[0]?.title}
                </Typography>
                <Typography
                  variant='span'
                  sx={{
                    color: '#b0b0b0',
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                    fontSize: '0.875rem',
                  }}
                >
                  Plano
                </Typography>
              </Stack>
            </Box>
          </Stack>
        ))
      )}
      {filteredClients.length === 0 && (
        <Box
          sx={{
            marginTop: '50px',
            width: '100%',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            flexWrap: 'wrap',
          }}
        >
          {Array.from(Array(pages), (item, index) => {
            return (
              <button
                value={index}
                onClick={(e) => setCurrentPage(Number(e.target.value))}
                style={{
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  border: 'none',
                  color: currentPage === index ? '#fff' : '#D40066',
                  background: currentPage === index ? '#D40066' : '#fff',
                  borderRadius: '8px',
                  border: '2px solid #D40066',
                }}
                key={`page-${index}`}
              >
                {index + 1}
              </button>
            );
          })}
        </Box>
      )}
    </>
  );
}

export default ClientsCard;
