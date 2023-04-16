import {Box, Stack, Typography} from '@mui/material'

function CompletePlansCard({plans}) {
  return (
    <>
      {plans.map((plano) => (
        <Box
          key={plano.title}
          sx={{
            width: '100%', height: '100px', borderBottom: '1px solid lightGray',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{ display: 'flex', width: '50%', height: '100%',
              alignItems: 'center', justifyContent: 'start', gap: '5%'
            }}
          >
            <img src={`https://planos-backend.onrender.com/assets/${plano.providerLogo}`} alt={plano.provider}/>
            <Typography variant="h6">
              {plano.title}
            </Typography>
            <Box>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  )
}

export default CompletePlansCard
