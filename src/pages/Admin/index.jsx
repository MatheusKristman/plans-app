import { Box, Stack, Typography } from '@mui/material'
import Form from '../../components/Form'

function Admin() {
  return (
    <Box className="container">
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          width: {lg:'45%', md: '100%'},
          background: 'linear-gradient(180deg, #D5A595 0%, #F5E0D9 100%);',
        }}
      >
        <Box sx={{
          width: '400px',
          height: {lg:'500px', md: '300px'},
        }}>
          <img
            src="./assets/images/Login-main-image.png"
            className="main-image"
            alt="imagem de um computador"
          />
        </Box>
      </Stack>
      <Stack
        sx={{
          width: {lg:'55%', md: '100%'},
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexFlow: 'column',
        }}
      >
        <Box sx={{height: '5%'}}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: '400',
            }}
          >
            Logo
          </Typography>
        </Box>
        <Form />
      </Stack>
    </Box>
  )
}

export default Admin
