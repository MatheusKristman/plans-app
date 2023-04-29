import { Box, Stack, Typography } from '@mui/material';
import { HirePlanForm, ClientRegister, Footer } from '../../components';
import { useContext, useState, useEffect, useRef, createRef } from 'react';
import { PlansContext } from '../../contexts/Plans/PlansContext';

function HirePlan() {
    // const [itemsPerPage, setItemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(0);
    const [clientRegisterMenu, setClientRegisterMenu] = useState(false);
    const [planInfos, setPlanInfos] = useState([]);
    const [descOpened, setDescOpened] = useState(0);

    const { filteredPlans } = useContext(PlansContext);

    // const pages = Math.ceil(unarchivedPlans?.length / itemsPerPage);
    const startIndex = 0;
    const endIndex = 10;
    const plansLength = filteredPlans?.length;
    const currentItems = filteredPlans?.slice(startIndex, endIndex);

    const descRef = useRef([]);

    useEffect(() => {
        descRef.current = currentItems.map(
            (el, i) => descRef.current[i] ?? createRef()
        );
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
                        sm: 'url(./assets/images/hireplan-header-bg-mobile.png)',
                        md: 'url(./assets/images/hireplan-header-bg-tablet.png)',
                        lg: 'url(./assets/images/hireplan-header-bg-desktop.png)',
                        xl: 'url(./assets/images/hireplan-header-bg-desktop.png)',
                    },
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top',
                }}
            >
                <Stack
                    sx={{
                        width: '50%',
                        height: '100%',
                        justifyContent: 'space-between',
                        padding: '30px 5% 90px',
                    }}
                >
                    <Typography
                        variant='h5'
                        fontWeight='600'
                        fontSize='2rem'
                        fontFamily='Montserrat'
                        marginBottom='50px'
                    >
                        Logo
                    </Typography>
                    <Typography
                        variant='h4'
                        fontFamily='Montserrat'
                        fontSize='3rem'
                        fontWeight='600'
                        marginBottom='25px'
                    >
                        Planos de Celular
                    </Typography>
                    <Typography
                        variant='h7'
                        fontFamily='Montserrat'
                        fontSize='1.25rem'
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac aliquet odio
                        mattis.
                    </Typography>
                </Stack>
            </Box>

            <Box
                sx={{
                    width: '100%',
                    padding: '100px 5% 200px',
                    display: 'flex',
                    gap: '2%',
                }}
            >
                <HirePlanForm clientRegisterMenu={clientRegisterMenu} />
                <Stack
                    sx={{
                        width: '80%',
                        gap: '50px',
                        position: 'relative',
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
                                padding: '30px 35px',
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
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img
                                        src={`https://planos-backend.onrender.com/assets/${plan.providerLogo}`}
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
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '15px',
                                    marginBottom: '30px',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '80%',
                                        height: '100%',
                                        background: '#D2D6E9',
                                        borderRadius: '8px',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr 1fr',
                                        gridTemplateRows: '1fr',
                                        padding: '16px 25px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
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
                                            fontSize='1.5rem'
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
                                            borderRight: '2px solid #98A1CC',
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
                                            {plan.unlimitedApps?.length !== 0
                                                ? plan.unlimitedApps
                                                : 'Nenhum'}
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
                                            {plan.unlimitedCall === true
                                                ? 'Sim'
                                                : 'Não'}
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
                                                .slice(
                                                    0,
                                                    plan.cost
                                                        .toFixed(2)
                                                        .toString().length - 3
                                                )}
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
                                                    .substring(
                                                        plan.cost
                                                            .toFixed(2)
                                                            .toString().length -
                                                            3
                                                    )
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
                                            ? `${
                                                  descRef.current[i]?.current
                                                      ?.scrollHeight + 80
                                              }px`
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
                                            position:
                                                descOpened === i + 1
                                                    ? 'relative'
                                                    : 'absolute',
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
                                            onClick={() =>
                                                handleReadMore(i + 1)
                                            }
                                        >
                                            {descOpened === i + 1
                                                ? 'Ler menos'
                                                : 'Ler mais'}
                                        </button>
                                    </Box>
                                ) : null}
                            </Box>
                        </Box>
                    ))}
                    {clientRegisterMenu && (
                        <ClientRegister
                            clientRegisterMenu={clientRegisterMenu}
                            setClientRegisterMenu={setClientRegisterMenu}
                            planInfos={planInfos}
                        />
                    )}
                </Stack>
            </Box>
            <Footer />
        </Stack>
    );
}

export default HirePlan;
