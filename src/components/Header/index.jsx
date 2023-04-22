import { Box, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Menu } from ".."

function Header() {
  const [isMobile, setIsMobile] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [window.innerWidth])

  const handleResize = () => {
    if(window.innerWidth < 500) {
      setIsMobile(!isMobile)
    }
  }


  return (
    <Stack sx={{width: '100%', height: {xs: '1150px', sm: '1150px',md: '880px'}, justifyContent: 'center',
        alignItems: 'center', backgroundImage: 'url("./assets/images/header-bg.png")',
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <Stack sx={{width: {xs: '90%', sm: '90%', md: '80%'}, height: '100%'}}>
          <Stack direction="row" sx={{width: '100%', height: {xs: '10%', sm: '10%',md: '10%'}, alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{width: {sm: '50%', md: '40%'}, height: '100%', display: 'flex', alignItems: 'center'}}>
              <Typography variant='h7' fontWeight="bold" >Logo</Typography>
            </Box>
            <Box sx={{width: {xs: '13%', sm: '55%' ,md: '40%'},
              height: {xs: '35%', sm: '100%', md: '100%'}, display: 'flex',
              alignItems: 'center', justifyContent: 'space-between',}}
            >
              {
                isMobile ? (<img src="./assets/icons/Menu.png" onClick={() => setMenu(!menu)} style={{width: '100%', height: '100%'}} />) : (<><Typography variant="h7" fontWeight="bold">Como funciona</Typography>
                <Typography variant="h7" fontWeight="bold">Benefícios</Typography>
                <Typography variant="h7" fontWeight="bold">FAQ</Typography></>)
              }
              {
                menu && (<Menu menu={menu} setMenu={setMenu} />)
              }
            </Box>
          </Stack>
          <Stack direction="row" sx={{width: '100%', height: {xs: '90%', sm: '90%', md: '90%'}, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <Stack sx={{width: {xs: '100%', sm: '100%', md: '35%'}, height: {xs: '40%', sm: '40%',md: '80%'}, gap: '5%', justifyContent: {xs: 'center',sm: 'start', md: 'start'}}}>
              <Typography sx={{fontSize: {xs: '45px', sm: '66px', md: '75px'}}}>Economize Tempo e Dinheiro</Typography>
              <Typography variant='h7'>Encontre os melhores planos da sua cidade com ótimos preços e facilidade.</Typography>
              <button style={{width: '200px', height: '50px', background: '#D40066',
              color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '16px'}}>Encontre seu plano</button>
            </Stack>
            <Box sx={{width: {sm: '100%', md: '50%'}, height: {xs: '60%', sm: '60%',md: '100%'},
              display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
              <img src="./assets/images/phone.png" style={{width: '100%', height: '100%'}} alt="telefone" />
            </Box>
          </Stack>
        </Stack>
      </Stack>
  )
}

export default Header
