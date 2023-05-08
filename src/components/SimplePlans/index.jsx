import { Box, Stack, Typography, Button } from '@mui/material';
import { useContext, useEffect } from 'react';

import { AddNewPlan, SimplePlansCard } from '../index';
import { PlansContext } from '../../contexts/Plans/PlansContext';
import Loading from '../Loading';

function SimplePlans() {
  const { allPlans, loading, plansMenu, handleNewPlan } = useContext(PlansContext);

  useEffect(() => {
    if (plansMenu) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'unset';
    }
  }, [plansMenu]);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          overflowY: 'auto',
          flexDirection: 'column',
          overflowX: 'hidden',
        }}
      >
        <Stack
          sx={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '50px',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            gap: '25px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Montserrat',
              fontWeight: '500',
              fontSize: '1.125rem',
            }}
          >
            Planos ativos: {allPlans?.filter((plano) => !plano.archived)?.length}
          </Typography>
          <Button
            variant='contained'
            sx={{
              width: {
                xs: '100%',
                sm: 'fit-content',
              },
              background: '#D40066',
              padding: '10px 30px',
              fontFamily: 'Montserrat',
              fontWeight: '600',
              fontSize: '1.125rem',
              transition: 'filter 0.3s ease',
              '&:hover': { background: '#D40066', filter: 'brightness(80%)' },
            }}
            onClick={handleNewPlan}
            disabled={plansMenu}
          >
            Novo Plano
          </Button>
        </Stack>
        {loading === true ? <Loading /> : <SimplePlansCard />}
      </Box>
      {plansMenu && <AddNewPlan menuTitle='Novo Plano' />}
    </>
  );
}

export default SimplePlans;
