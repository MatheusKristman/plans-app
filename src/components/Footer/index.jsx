import {Box, Stack, Typography} from '@mui/material'

function Footer() {
  return (
    <Box sx={{width: '100%', height: {xs: '700px', sm: '400px', md: '400px'}, background: '#E9EBFF', display: 'flex', alignItems: 'center',
      justifyContent: 'center', paddingTop: {xs: '0px', sm: '10%', md: '0px'}}}>
      <Stack sx={{width: '80%', height: '100%'}}>
        <Stack sx={{height: '85%', paddingTop: {xs: '15%', sm: '2%', md: '2%'}, justifyContent: 'space-between', flexDirection: {xs: 'column', sm: 'row', md: 'row'}}}>
          <Stack sx={{width: {xs: '100%', sm: '30%', md: '30%'}, height: {xs: '35%', sm: '100%', md: '100%'}, gap: '10%'}}>
            <Typography variant='h4'>Logo</Typography>
            <Typography variant='h7'>Encontrado o plano perfeito com facilidade e praticidade</Typography>
          </Stack>
          <Stack sx={{width: {xs: '100%', sm: '30%', md: '30%'}, height: {xs: '35%', sm: '100%', md: '100%'}, gap: '8%',
            alignItems: {xs: 'start',sm: 'center', md: 'start'}}}>
            <Typography variant='h7'>Como funciona</Typography>
            <Typography variant='h7'>Benefícios</Typography>
            <Typography variant='h7'>FAQ</Typography>
          </Stack>
          <Stack sx={{width: {xs: '80%', sm: '30%', md: '30%'}, height: {xs: '50%', sm: '100%', md: '100%', gap: '8%'}}}>
            <Typography variant='h4'>Suporte</Typography>
            <input type="text" placeholder='Digite sua dúvida aqui' style={{width: '100%', height: '50px', paddingLeft: '3%',
              borderRadius: '8px', outline: 'none', border: '2px solid gray', fontSize: '15px'}} />
            <button style={{width: '100px', height: '40px', borderRadius: '8px', fontSize: '16px', border: 'none',
              background: '#979EC2', color: '#fff', cursor: 'pointer'}}>Enviar</button>
          </Stack>
        </Stack>
        <Stack sx={{height: '20%', borderTop: '2px solid lightGray', alignItems: 'center', justifyContent: 'space-between',
          flexDirection: {xs: 'column', sm: 'row', md: 'row'}, paddingY: '5%'}}>
          <Typography variant='h7'>Logo da Equipe</Typography>
          <Typography variant='h7'>© Copyright - 2023 - nome da empresa</Typography>
          <Typography variant='h7'>Logo Agência</Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer
