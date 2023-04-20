import { Box, Stack, Typography } from "@mui/material"

function Header() {
  return (
    <Stack sx={{width: '100%', height: {sm: '1150px',md: '880px'}, justifyContent: 'center',
        alignItems: 'center', backgroundImage: 'url("./assets/images/header-bg.png")',
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <Stack sx={{width: {xs: '90%', sm: '90%', md: '80%'}, height: '100%'}}>
          <Stack direction="row" sx={{width: '100%', height: {sm: '10%',md: '10%'}, alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{width: {sm: '50%', md: '40%'}, height: '100%', display: 'flex', alignItems: 'center'}}>
              <Typography variant='h7' fontWeight="bold" >Logo</Typography>
            </Box>
            <Box sx={{width: {sm: '55%' ,md: '40%', lg: '30%'}, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography variant="h7" fontWeight="bold">Como funciona</Typography>
              <Typography variant="h7" fontWeight="bold">Benefícios</Typography>
              <Typography variant="h7" fontWeight="bold">FAQ</Typography>
            </Box>
          </Stack>
          <Stack direction="row" sx={{width: '100%', height: {sm: '90%',md: '90%'}, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <Stack sx={{width: {xs: '100%', sm: '100%', md: '35%'}, height: {sm: '40%',md: '80%'}, gap: '5%'}}>
              <Typography sx={{fontSize: {sm: '66px', md: '75px'}}}>Economize Tempo e Dinheiro</Typography>
              <Typography variant='h7'>Encontre os melhores planos da sua cidade com ótimos preços e facilidade.</Typography>
              <button style={{width: '200px', height: '50px', background: '#D40066',
              color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '16px'}}>Encontre seu plano</button>
            </Stack>
            <Box sx={{width: {sm: '100%', md: '50%'}, height: {sm: '60%',md: '100%'}, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <img src="./assets/images/phone.png" alt="telefone" style={{width: '100%', height: '85%'}} />
            </Box>
          </Stack>
        </Stack>
      </Stack>
  )
}

export default Header
