import { Box, Stack, Typography, Button } from '@mui/material';
import { HirePlanForm, ClientRegister, Footer } from '../../components';
import { useContext, useState, useEffect, useRef, createRef } from 'react';
import { PlansContext } from '../../contexts/Plans/PlansContext';
import { Link } from 'react-router-dom';

function HirePlan() {
  const [clientRegisterMenu, setClientRegisterMenu] = useState(false);
  const [planInfos, setPlanInfos] = useState([]);
  const [descOpened, setDescOpened] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

  const { filteredPlans } = useContext(PlansContext);

  const startIndex = 0;
  const currentItems = filteredPlans
    ?.sort((a, b) => a.priority - b.priority)
    ?.slice(startIndex, endIndex);

  const descRef = useRef([]);

  useEffect(() => {
    descRef.current = currentItems.map((el, i) => descRef.current[i] ?? createRef());
  }, []);

  const handleRegisterMenu = (plan) => {
    setPlanInfos(plan);
    setClientRegisterMenu(!clientRegisterMenu);
  };

  const handleReadMore = (desc) => {
    if (descOpened === desc) {
      setDescOpened(0);
      return;
    }

    setDescOpened(desc);
    return;
  };

  const handleViewMoreResults = () => {
    if (endIndex < filteredPlans.length) {
      setEndIndex((prev) => prev + 10);
    }
  };

  return (
    <Stack
      sx={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          backgroundImage: {
            xs: 'url(./assets/images/hireplan-header-bg-mobile.png)',
            sm: 'url(./assets/images/hireplan-header-bg-tablet.png)',
            md: 'url(./assets/images/hireplan-header-bg-tablet.png)',
            lg: 'url(./assets/images/hireplan-header-bg-desktop.png)',
            xl: 'url(./assets/images/hireplan-header-bg-desktop.png)',
          },
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
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
        }}
      >
        <Stack
          sx={{
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
            padding: { xs: '30px 0 350px', sm: '30px 0 90px' },
            maxWidth: '1400px',
            marginLeft: {
              xs: '0',
              lg: 'auto',
            },
            marginRight: {
              xs: '0',
              lg: 'auto',
            },
          }}
        >
          <Link
            to='/'
            style={{
              fontWeight: '600',
              fontSize: '2rem',
              fontFamily: 'Montserrat',
              textDecoration: 'none',
              color: '#252525',
            }}
            className='hire-plan-logo'
          >
            Logo
          </Link>
          <Typography
            variant='h4'
            fontFamily='Montserrat'
            fontSize={{ xs: '2.1rem', md: '3rem' }}
            fontWeight='600'
            marginBottom='25px'
            width={{ xs: '100%', sm: '50%' }}
          >
            Planos de Celular
          </Typography>
          <Typography
            variant='h7'
            fontFamily='Montserrat'
            fontSize={{ xs: '1rem', md: '1.25rem' }}
            width={{ xs: '100%', sm: '50%' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum, ac aliquet odio mattis.
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          width: '100%',
          paddingTop: { xs: '50px', md: '100px' },
          paddingBottom: '200px',
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
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: '0', md: '50px' },
            width: '100%',
            maxWidth: '1400px',
            marginLeft: {
              xs: '0',
              lg: 'auto',
            },
            marginRight: {
              xs: '0',
              lg: 'auto',
            },
            position: 'relative',
          }}
        >
          <HirePlanForm clientRegisterMenu={clientRegisterMenu} />
          <Stack
            sx={{
              width: {
                xs: '100%',
                md: '80%',
              },
              gap: '50px',
              position: 'relative',
              marginTop: { xs: '50px', md: '0' },
            }}
          >
            {currentItems.map((plan, i) => (
              <Box
                sx={{
                  width: '100%',
                  background: '#F0F1F6',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: {
                    xs: '15px 20px',
                    sm: '30px 35px',
                  },
                }}
                key={plan._id}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '15px',
                    marginBottom: '40px',
                  }}
                >
                  <Box
                    sx={{
                      width: '15%',
                      maxWidth: '130px',
                      minWidth: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_BASE}/assets/${plan.providerLogo}`}
                      alt={plan.provider}
                      style={{
                        width: '100%',
                        height: 'auto',
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: '70%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Typography
                      variant='h5'
                      color='#D40066'
                      fontWeight='600'
                      fontFamily='Montserrat'
                      fontSize='1.5rem'
                    >
                      {plan.title.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: '15px',
                    marginBottom: '30px',
                  }}
                >
                  <Box
                    sx={{
                      width: {
                        xs: '100%',
                        sm: '80%',
                      },
                      height: '100%',
                      background: '#D2D6E9',
                      borderRadius: '8px',
                      display: 'grid',
                      gridTemplateColumns: {
                        xs: '1fr 1fr',
                        md: '1fr 1fr 1fr 1fr',
                      },
                      gridTemplateRows: {
                        xs: '1fr 1fr',
                        md: '1fr',
                      },
                      padding: {
                        xs: '8px 13px',
                        sm: '16px 25px',
                      },
                      gap: {
                        xs: '25px 0',
                        md: '0',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight: '2px solid #98A1CC',
                        padding: {
                          xs: '20px 0',
                          md: '0',
                        },
                      }}
                    >
                      <Typography
                        variant='h6'
                        color='#5C679B'
                        fontWeight='600'
                        fontFamily='Montserrat'
                        fontSize='1.5rem'
                        textAlign='center'
                      >
                        {plan.franchise} GIGA
                      </Typography>
                    </Box>
                    <Stack
                      sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        textAlign: 'center',
                        borderRight: {
                          sm: 'none',
                          md: '2px solid #98A1CC',
                        },
                      }}
                    >
                      <Typography
                        variant='h6'
                        color='#5C679B'
                        fontWeight='600'
                        fontSize='0.875rem'
                        fontFamily='Montserrat'
                        marginBottom='10px'
                      >
                        Apps ilimitados
                      </Typography>
                      <Typography
                        variant='h7'
                        color='#5C679B'
                        fontWeight='600'
                        fontSize='0.75rem'
                        fontFamily='Montserrat'
                      >
                        {plan.unlimitedApps?.length !== 0 ? plan.unlimitedApps : 'Nenhum'}
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight: '2px solid #98A1CC',
                      }}
                    >
                      <Typography
                        variant='h6'
                        color='#5C679B'
                        fontWeight='600'
                        fontFamily='Montserrat'
                        fontSize='0.875rem'
                        textAlign='center'
                        marginBottom='10px'
                      >
                        Ligações ilimitadas
                      </Typography>
                      <Typography
                        variant='h7'
                        color='#5C679B'
                        fontWeight='400'
                        fontFamily='Montserrat'
                        fontSize='0.875rem'
                        textAlign='center'
                      >
                        {plan.unlimitedCall === true ? 'Sim' : 'Não'}
                      </Typography>
                    </Stack>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant='h7'
                        color='#5C679B'
                        fontFamily='Montserrat'
                        fontSize='0.875rem'
                        marginRight='5px'
                      >
                        R$
                      </Typography>
                      <Typography
                        variant='h7'
                        color='#5C679B'
                        fontFamily='Montserrat'
                        fontWeight='600'
                        fontSize='1.75rem'
                        marginRight='3px'
                      >
                        {plan.cost
                          .toFixed(2)
                          .toString()
                          .slice(0, plan.cost.toFixed(2).toString().length - 3)}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '5px',
                        }}
                      >
                        <Typography
                          variant='h7'
                          color='#5C679B'
                          fontFamily='Montserrat'
                          fontSize='0.7rem'
                        >
                          {plan.cost
                            .toFixed(2)
                            .toString()
                            .substring(plan.cost.toFixed(2).toString().length - 3)
                            .replace('.', ',')}
                        </Typography>
                        <Typography
                          variant='h7'
                          color='#5C679B'
                          fontFamily='Montserrat'
                          fontSize='0.75rem'
                        >
                          /{plan.period}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: {
                        xs: '100%',
                        sm: 'auto',
                      },
                      height: '100%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}
                  >
                    <button
                      style={{
                        padding: '15px 30px',
                        border: 'none',
                        background: '#D40066',
                        color: '#fff',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '700',
                      }}
                      className='contract-plan-btn'
                      onClick={() => handleRegisterMenu(plan)}
                      disabled={clientRegisterMenu === true}
                    >
                      CONTRATAR
                    </button>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    maxHeight:
                      descOpened === i + 1
                        ? `${descRef.current[i]?.current?.scrollHeight + 80}px`
                        : '80px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Montserrat',
                      fontSize: '1rem',
                    }}
                    ref={descRef.current[i]}
                  >
                    {plan.description}
                  </Typography>
                  {plan.description.length > 300 ? (
                    <Box
                      sx={{
                        width: '100%',
                        height: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        position: descOpened === i + 1 ? 'relative' : 'absolute',
                        bottom: 0,
                        left: 0,
                      }}
                    >
                      <Box
                        sx={{
                          height: '30px',
                          width: '100%',
                          background:
                            'linear-gradient(180deg, rgba(240, 241, 246, 0) 0%, #F0F1F6 100%)',
                        }}
                      ></Box>
                      <button
                        style={{
                          width: '100%',
                          height: '70%',
                          backgroundColor: '#F0f1f6',
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: 'Montserrat',
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: '#5C679B',
                        }}
                        onClick={() => handleReadMore(i + 1)}
                      >
                        {descOpened === i + 1 ? 'Ler menos' : 'Ler mais'}
                      </button>
                    </Box>
                  ) : null}
                </Box>
              </Box>
            ))}
            {filteredPlans.length > endIndex ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  sx={{
                    backgroundColor: '#D40066',
                    color: '#fff',
                    fontFamily: 'Montserrat',
                    fontWeight: '700',
                    fontSize: '1.125rem',
                    textTransform: 'uppercase',
                    padding: '15px 30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'filter 0.3s ease',
                    borderRadius: '8px',
                    lineHeight: '1.25',
                    ':hover': {
                      backgroundColor: '#D40066',
                      filter: 'brightness(80%)',
                    },
                  }}
                  onClick={handleViewMoreResults}
                >
                  Ver mais resultados
                </Button>
              </Box>
            ) : null}
            {clientRegisterMenu && (
              <ClientRegister
                clientRegisterMenu={clientRegisterMenu}
                setClientRegisterMenu={setClientRegisterMenu}
                planInfos={planInfos}
              />
            )}
          </Stack>
        </Box>
      </Box>
      <Footer />
    </Stack>
  );
}

export default HirePlan;
