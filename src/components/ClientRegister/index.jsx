import { Box, Stack, Typography } from '@mui/material';
import { useState, useRef } from 'react';
import { useApi } from '../../hooks/useApi';
import { CgClose } from 'react-icons/cg';

function ClientRegister({
    clientRegisterMenu,
    setClientRegisterMenu,
    planInfos,
}) {
    const [cpf, setCpf] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [motherName, setMotherName] = useState('');
    const [cel, setCel] = useState('');
    const [planId, setPlanId] = useState(planInfos?._id);
    const [validCpf, setIsValidCpf] = useState();
    const [error, setError] = useState(false);

    const api = useApi();

    const backgroundRef = useRef(null);
    const modalRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = isValidCpf(cpf);
        setIsValidCpf(valid);
        if (!valid) {
            setError(!error);
            return;
        }
        const response = await api.registerLead(
            name,
            cpf,
            dateOfBirth,
            motherName,
            cel,
            planId
        );
        console.log(response);
    };

    const isValidCpf = (cpf) => {
        cpf.replace(/[^\d]+/g, '');
        if (cpf === '') return false;
        // Elimina CPFs invalidos conhecidos
        if (
            cpf.length != 11 ||
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
        )
            return false;
        // Valida 1º digito
        let add = 0;
        for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(9))) return false;
        // Valida 2º digito
        add = 0;
        for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(10))) return false;
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
            backgroundRef.current.style.animation =
                'fadeOutBG 0.4s ease forwards';
            modalRef.current.style.animation = 'fadeOut 0.2s ease forwards';

            setTimeout(() => {
                setClientRegisterMenu(false);
            }, 400);
        }
    };

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
                        backgroundImage:
                            'url(./assets/images/registerClient-header.png)',
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
                        }}
                    >
                        <Typography
                            variant='h7'
                            fontFamily='Montserrat'
                            fontWeight='600'
                            fontSize='1.875rem'
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
                        gap: '35px',
                    }}
                >
                    <form
                        style={{
                            width: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        onSubmit={handleSubmit}
                    >
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
                                type='text'
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
                                required
                                autoComplete='off'
                            />
                        </Stack>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gridTemplateRows: '1fr',
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
                                    type='text'
                                    maxLength='11'
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
                                    onChange={(e) => setCpf(e.target.value)}
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
                                <input
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
                                    className='client-birth-input'
                                    onChange={(e) =>
                                        setDateOfBirth(e.target.value)
                                    }
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
                                type='tel'
                                maxLength='11'
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
                                onChange={(e) => setCel(e.target.value)}
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
                                Autorizo a comunicação referente ao meu pedido e
                                confirmação dos dados para contratação do plano.
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
                            }}
                            className='client-btn'
                            type='submit'
                        >
                            FAZER PEDIDO
                        </button>
                    </form>
                    <Stack
                        sx={{
                            width: '50%',
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
                                            src='./assets/icons/discman.png'
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
                                    R${' '}
                                    {planInfos.cost
                                        .toFixed(2)
                                        .replace('.', ',')}
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
                                R$ {planInfos.cost.toFixed(2).replace('.', ',')}
                                /{planInfos.period}
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}

export default ClientRegister;
