import React, { useState, useRef, createRef, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { aboutLoop } from '../../utils/About/about';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

function About() {
    const [aboutArr, setAboutArr] = useState([...aboutLoop]);
    const [aboutId, setAboutId] = useState('');

    const handleMoreAbout = (index) => {
        const aboutArrCopy = aboutLoop.map((item, i) => {
            if (i === index) {
                item.isOpen = !item.isOpen;

                return item;
            }
            item.isOpen = false;

            return item;
        });

        setAboutArr(aboutArrCopy);
    };

    const answerRef = useRef([]);

    useEffect(() => {
        answerRef.current = aboutLoop.map(
            (el, i) => answerRef.current[i] ?? createRef()
        );
    }, []);

    return (
        <Box
            sx={{
                width: '80%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <Stack sx={{ gap: '25px', marginBottom: '60px' }}>
                <Typography
                    variant='h5'
                    fontWeight='600'
                    fontFamily='montserrat'
                    fontSize='2rem'
                >
                    Um pouco mais sobre (Nome da empresa)
                </Typography>
                <Typography variant='h7'>
                    Somos um comparador de ofertas de serviços financeiros e de
                    telecom. Utilizando nossa ferramenta, você encontra planos
                    de celular.
                </Typography>
            </Stack>
            <Stack
                sx={{
                    width: '100%',
                    height: { xs: '75%', sm: '80%', md: '50%' },
                    gap: '10%',
                    justifyContent: 'center',
                }}
            >
                {aboutLoop.map((item, i) => (
                    <Stack
                        key={item.id}
                        sx={{
                            width: '100%',
                            // height: aboutId === item.id ? '60%' : '25%',
                            paddingTop: '25px',
                            paddingBottom: '25px',
                            borderBottom: '2px solid lightGray',
                            justifyContent: 'center',
                            gap: '15%',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '35%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleMoreAbout(i)}
                        >
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '90%',
                                }}
                            >
                                <Typography variant='h7'>
                                    {item.name}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '3%',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                {item.isOpen ? (
                                    <IoIosArrowUp color='#D40066' />
                                ) : (
                                    <IoIosArrowDown color='#D40066' />
                                )}
                            </Box>
                        </Box>
                        <Stack
                            direction='row'
                            sx={{
                                width: '100%',
                                paddingTop: item.isOpen ? '20px' : '0px',
                                alignItems: 'center',
                                paddingLeft: '2%',
                                display: 'flex',
                                maxHeight: item.isOpen ? '50vh' : '0px',
                                overflow: 'hidden',
                                transition:
                                    'max-height 0.3s ease, padding-top 0.3s ease',
                            }}
                            ref={answerRef.current[i]}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    paddingTop: '15px',
                                    paddingBottom: '15px',
                                    borderLeft: '2px solid #D40066',
                                    paddingLeft: '2%',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    fontFamily='montserrat'
                                    fontSize='1rem'
                                >
                                    {item.description}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
}

export default About;
