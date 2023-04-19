import { Box, Stack, Typography } from "@mui/material"

function Header() {
  return (
    <Stack sx={{width: '100%', height: '900px', justifyContent: 'center',
        alignItems: 'center', backgroundImage: 'url("./assets/images/header-bg.png")',
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <Stack sx={{width: '80%', height: '100%'}}>
          <Stack direction="row" sx={{width: '100%', height: '10%', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{width: '40%', height: '100%', display: 'flex', alignItems: 'center'}}>
              <Typography variant='h7' fontWeight="bold" >Logo</Typography>
            </Box>
            <Box sx={{width: '30%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography variant="h7" fontWeight="bold">Como funciona</Typography>
              <Typography variant="h7" fontWeight="bold">Benfícios</Typography>
              <Typography variant="h7" fontWeight="bold">FAQ</Typography>
            </Box>
          </Stack>
          <Stack direction="row" sx={{width: '100%', height: '80%', alignItems: 'center', justifyContent: 'space-between'}}>
            <Stack sx={{width: '45%', height: '80%', gap: '5%'}}>
              <Typography variant='h1'>Economize Tempo e Dinheiro</Typography>
              <Typography variant='h7'>Encontre os melhores planos da sua cidade com ótimos preços e facilidade.</Typography>
              <button style={{width: '200px', height: '50px', background: '#D40066',
              color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer'}}>Encontre seu plano</button>
            </Stack>
            <Box sx={{width: '45%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <img src="./assets/images/phone.png" className='phone' alt="telefone" />
            </Box>
          </Stack>
        </Stack>
      </Stack>
  )
}

export default Header
