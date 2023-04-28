import { Box, Stack, Typography } from '@mui/material';
import { HirePlanForm, ClientRegister, Footer } from '../../components';
import { useContext, useState } from 'react';
import { PlansContext } from '../../contexts/Plans/PlansContext';

function HirePlan() {
    // const [itemsPerPage, setItemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(0);
    const [clientRegisterMenu, setClientRegisterMenu] = useState(false);
    const [planInfos, setPlanInfos] = useState([]);

    const { filteredPlans } = useContext(PlansContext);

    // const pages = Math.ceil(unarchivedPlans?.length / itemsPerPage);
    const startIndex = 0;
    const endIndex = 10;
    const plansLength = filteredPlans?.length;
    const currentItems = filteredPlans?.slice(startIndex, endIndex);

    const handleRegisterMenu = (plan) => {
        setPlanInfos(plan);
        setClientRegisterMenu(!clientRegisterMenu);
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
                        height: '1000px',
                        gap: '2%',
                        position: 'relative',
                    }}
                >
                    {currentItems.map((plan) => (
                        <Box
                            sx={{
                                width: '100%',
                                height: '300px',
                                background: '#F0F1F6',
                                borderRadius: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '2%',
                                filter:
                                    clientRegisterMenu === true
                                        ? 'blur(10px)'
                                        : '',
                            }}
                            key={plan._id}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '25%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '20%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img
                                        src={`https://planos-backend.onrender.com/assets/${plan.providerLogo}`}
                                        alt={plan.provider}
                                        style={{ width: '30%', height: '90%' }}
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
                                        fontWeight='bold'
                                    >
                                        {plan.title.toUpperCase()}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '80%',
                                        height: '100%',
                                        background: '#D2D6E9',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '15%',
                                            height: '70%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRight: '2px solid #98A1CC',
                                        }}
                                    >
                                        <Typography
                                            variant='h6'
                                            color='#5C679B'
                                            fontWeight='bold'
                                        >
                                            {plan.franchise} GIGA
                                        </Typography>
                                    </Box>
                                    <Stack
                                        sx={{
                                            width: '30%',
                                            height: '70%',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRight: '2px solid #98A1CC',
                                        }}
                                    >
                                        <Typography
                                            variant='h6'
                                            color='#5C679B'
                                            fontWeight='medium'
                                        >
                                            Apps ilimitados
                                        </Typography>
                                        <Typography
                                            variant='h7'
                                            color='#5C679B'
                                        >
                                            {plan.unlimitedApps}
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        sx={{
                                            width: '30%',
                                            height: '70%',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRight: '2px solid #98A1CC',
                                        }}
                                    >
                                        <Typography
                                            variant='h6'
                                            color='#5C679B'
                                            fontWeight='medium'
                                        >
                                            Ligações ilimitadas
                                        </Typography>
                                        <Typography
                                            variant='h7'
                                            color='#5C679B'
                                        >
                                            {plan.unlimitedCall === true
                                                ? 'Para todo o Brasil'
                                                : 'Não'}
                                        </Typography>
                                    </Stack>
                                    <Box
                                        sx={{
                                            width: '20%',
                                            height: '70%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant='h7'
                                            color='#5C679B'
                                            fontWeight='bold'
                                        >
                                            R$ {plan.cost.toFixed(2)}/
                                            {plan.period}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: '20%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <button
                                        style={{
                                            width: '80%',
                                            height: '30%',
                                            border: 'none',
                                            background: '#D40066',
                                            color: '#fff',
                                            fontSize: '16px',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                        }}
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
                                    height: '25%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                }}
                            >
                                <Typography>{plan.description}</Typography>
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
