import { Box, Button, Stack, Typography } from '@mui/material';

function Footer() {
    return (
        <Box
            sx={{
                width: '100%',
                background: '#E9EBFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: { xs: '0px', sm: '10%', md: '50px' },
            }}
        >
            <Stack sx={{ width: '80%', height: '100%' }}>
                <Stack
                    sx={{
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', sm: 'row', md: 'row' },
                        paddingBottom: '100px',
                    }}
                >
                    <Stack
                        sx={{
                            width: { xs: '100%', sm: '30%', md: '30%' },
                        }}
                    >
                        <Typography variant='h4' marginBottom='35px'>
                            Logo
                        </Typography>
                        <Typography
                            variant='h7'
                            fontFamily='Montserrat'
                            maxWidth='260px'
                        >
                            Encontrado o plano perfeito com facilidade e
                            praticidade
                        </Typography>
                    </Stack>
                    <Stack
                        sx={{
                            width: { xs: '100%', sm: '30%', md: '30%' },
                            height: { xs: '35%', sm: '100%', md: '100%' },
                            gap: '25px',
                            alignItems: {
                                xs: 'start',
                                sm: 'center',
                                md: 'start',
                            },
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
                            width: { xs: '80%', sm: '30%', md: '30%' },
                            height: {
                                xs: '50%',
                                sm: '100%',
                                md: '100%',
                                gap: '8%',
                            },
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
                                textTransform: 'none',
                            }}
                        >
                            Enviar
                        </Button>
                    </Stack>
                </Stack>
                <Stack
                    sx={{
                        height: '20%',
                        borderTop: '2px solid #AAB0F1',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', sm: 'row', md: 'row' },
                        paddingY: '5%',
                    }}
                >
                    <Typography variant='h7'>Logo da Equipe</Typography>
                    <Typography variant='h7' fontSize='0.875rem'>
                        © Copyright - 2023 - nome da empresa
                    </Typography>
                    <Typography variant='h7'>Logo Agência</Typography>
                </Stack>
            </Stack>
        </Box>
    );
}

export default Footer;
