import React from 'react';
import { benefitsLoop } from '../../utils/steps/benefits';
import { Box, Typography, Stack } from '@mui/material';

function Benefits() {
    return (
        <Box
            id='benefits'
            sx={{
                width: { xs: '90%', sm: '90%', md: '80%' },
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '50px',
            }}
        >
            <Stack
                sx={{
                    width: '100%',
                    height: { xs: '90%', sm: '100%', md: '80%' },
                    justifyContent: 'end',
                    gap: '5%',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '90%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: { xs: 'no-wrap', sm: 'no-wrap', md: 'wrap' },
                        flexDirection: {
                            xs: 'column',
                            sm: 'column',
                            md: 'row',
                        },
                        gap: '80px 20px',
                    }}
                >
                    {benefitsLoop.map((benefit) => (
                        <Box
                            key={benefit.id}
                            sx={{
                                width: { sm: '100%', md: '49%' },
                                height: { sm: '20%', md: '40%' },
                                display: 'flex',
                                gap: '20px',
                            }}
                        >
                            <Box sx={{ height: '100%' }}>
                                <img
                                    src={benefit.icon}
                                    style={{ width: '70px', height: '70px' }}
                                    alt='beneficio'
                                />
                            </Box>
                            <Stack
                                sx={{
                                    width: '85%',
                                    height: '100%',
                                    gap: '15px',
                                }}
                            >
                                <Typography
                                    variant='h6'
                                    fontWeight='500'
                                    fontSize='1.5rem'
                                    fontFamily='montserrat'
                                >
                                    {benefit.name}
                                </Typography>
                                <Typography
                                    variant='span'
                                    fontSize='1rem'
                                    lineHeight='26px'
                                >
                                    {benefit.description}
                                </Typography>
                            </Stack>
                        </Box>
                    ))}
                </Box>
            </Stack>
        </Box>
    );
}

export default Benefits;
