import React, { useState } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { PlansContext } from '../../contexts/Plans/PlansContext';
import { useContext, useRef } from 'react';
import { mockCities } from '../../utils/Cities/cities';
import { Link } from 'react-router-dom';
import { CgClose } from 'react-icons/cg';
import States from '../States';
import { set } from 'react-hook-form';

function SearchPlans() {
    const { searchPlans, setSearchPlans, allPlans } = useContext(PlansContext);
    const [cityName, setCityName] = useState('Rio de Janeiro');

    let filteredPlan = allPlans.filter((plan) =>
        plan?.city?.includes(cityName)
    );

    const backgroundRef = useRef(null);
    const modalRef = useRef(null);

    const handleCloseModal = () => {
        backgroundRef.current.style.animation = 'fadeOutBG 0.4s ease forwards';
        modalRef.current.style.animation = 'fadeOut 0.2s ease forwards';

        setTimeout(() => {
            setSearchPlans(false);
        }, 400);
    };

    const handleCloseModalOnScreen = (e) => {
        if (e.target.classList.contains('initial-search-bg')) {
            backgroundRef.current.style.animation =
                'fadeOutBG 0.4s ease forwards';
            modalRef.current.style.animation = 'fadeOut 0.2s ease forwards';

            setTimeout(() => {
                setSearchPlans(false);
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
            className='initial-search-bg'
            onClick={handleCloseModalOnScreen}
            ref={backgroundRef}
        >
            <Box
                sx={{
                    backgroundColor: '#fff',
                    display: 'inline-block',
                    width: '100%',
                    height: 'auto',
                    maxWidth: '1000px',
                    verticalAlign: 'middle',
                    position: 'relative',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    zIndex: '3',
                }}
                className='initial-search-modal'
                ref={modalRef}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { lg: 'row-reverse', xs: 'column' },
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: '40%',
                        }}
                    >
                        <img
                            src='./assets/images/test.gif'
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                        <button
                            style={{
                                position: 'absolute',
                                right: '30px',
                                top: '30px',
                                backgroundColor: '#FFF',
                                borderRadius: '8px',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={handleCloseModal}
                        >
                            <CgClose size={25} />
                        </button>
                    </Box>
                    <Box
                        sx={{
                            width: '60%',
                            padding: '30px 25px 35px',
                        }}
                    >
                        <Typography
                            variant='h3'
                            sx={{
                                fontFamily: 'Montserrat',
                                fontWeight: '600',
                                fontSize: '2rem',
                                marginBottom: '100px',
                            }}
                        >
                            Antes de começar
                        </Typography>

                        <States />

                        <Button
                            sx={{
                                width: 'fit-content',
                                marginTop: '50px',
                                borderRadius: '10px',
                                border: 'none',
                                background: '#D40066',
                                color: '#fff',
                                fontSize: '1.25rem',
                                fontWeight: '500',
                                textTransform: 'none',
                                fontFamily: 'montserrat',
                                cursor: 'pointer',
                                padding: '10px 30px',
                                transition: 'filter 0.3s ease',
                                ':hover': {
                                    background: '#D40066',
                                    filter: 'brightness(80%)',
                                },
                            }}
                        >
                            Procurar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default SearchPlans;
