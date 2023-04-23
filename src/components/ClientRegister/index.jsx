import { Box, Stack, Typography } from "@mui/material";

function ClientRegister({clientRegisterMenu, setClientRegisterMenu, planInfos}) {
  return (
    <Box sx={{width: '800px', height: '650px', background: '#fff', position: 'absolute', borderRadius: '10px'}}>
      <Box sx={{width: '100%', height: '20%',
        backgroundImage: 'url(./assets/images/registerClient-header.png)', backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat', position: 'relative'}}>
        <button style={{width: '35px', height: '35px', background: '#fff', border: 'none',
          borderRadius: '8px', fontSize: '16px', position: 'absolute', top: '8%', right: '2%', cursor: 'pointer'}}
          onClick={() => setClientRegisterMenu(!clientRegisterMenu)}
          >X</button>
        <Box sx={{width: '200px', height: '60px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'absolute', bottom: '0px', borderTopRightRadius: '8px'}}>
          <Typography variant="h7" fontWeight="bold">
            Confirme seus dados
          </Typography>
        </Box>
      </Box>
      <Stack sx={{width: '100%', height: '80%', flexDirection: 'row', paddingTop: '1%'}}>
        <form style={{width: '55%', height: '100%', padding: '1.2%', display: 'flex', flexDirection: 'column', gap: '3%'}}>
          <Stack gap="4px">
            <Typography variant="h7" fontWeight="medium">
              Nome Completo
            </Typography>
            <input type="text" placeholder="Nome Completo" style={{width: '100%', height: '50px', borderRadius: '8px',
              paddingLeft: '2%', fontSize: '16px', border: '2px solid lightGray'}} />
          </Stack>
          <Box sx={{display: 'flex'}}>
            <Stack gap="4px" sx={{width: '50%'}}>
              <Typography variant="h7" fontWeight="medium">
                CPF
              </Typography>
              <input type="text" placeholder="xxx.xxx.xxx-xx" style={{width: '95%', height: '50px', borderRadius: '8px',
                paddingLeft: '4%', fontSize: '16px', border: '2px solid lightGray'}} />
            </Stack>
            <Stack gap="4px" sx={{width: '50%'}}>
              <Typography variant="h7" fontWeight="medium">
                Data de nascimento
              </Typography>
              <input type="text" placeholder="Data de nascimento" style={{width: '100%', height: '50px', borderRadius: '8px',
                paddingLeft: '4%', fontSize: '16px', border: '2px solid lightGray'}} />
            </Stack>
          </Box>
          <Stack gap="4px">
            <Typography variant="h7" fontWeight="medium">
              Nome completo da mãe
            </Typography>
            <input type="text" placeholder="Nome completo da mãe" style={{width: '100%', height: '50px', borderRadius: '8px',
              paddingLeft: '2%', fontSize: '16px', border: '2px solid lightGray'}} />
          </Stack>
          <Stack gap="4px">
            <Typography variant="h7" fontWeight="medium">
              Celular
            </Typography>
            <input type="text" placeholder="Celular" style={{width: '100%', height: '50px', borderRadius: '8px',
              paddingLeft: '2%', fontSize: '16px', border: '2px solid lightGray'}} />
          </Stack>
          <label style={{width: '100%', height: '10%', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
            <input type="checkbox" name="Authorization" id="" style={{accentColor: '#D40066'}} />
            <Typography variant="h7" width="90%">Autorizo a comunicação referente ao meu pedido e confirmação dos dados para contratação do plano.</Typography>
          </label>
          <button style={{width: '100%', height: '50px', background: '#D40066', color: '#fff', fontSize: '16px',
            fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>FAZER PEDIDO</button>
        </form>
        <Stack sx={{width: '43.5%', height: '45%', background: '#EFEFEF', borderRadius: '8px', marginTop: '1%', padding: '2%', justifyContent: 'space-evenly'}}>
          <Typography variant="h7" fontWeight="bold">Resumo do Pedido</Typography>
          <Box sx={{width: '100%', height: '50%', borderBottom: '2px solid lightGray'}}>
            <Box sx={{width: '100%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Box sx={{width: '30%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src="./assets/icons/discman.png" alt="Provedor image" />
              </Box>
              <Stack sx={{width: '40%', height: '100%', justifyContent: 'center' }}>
                <Typography>
                  {planInfos.title}
                </Typography>
                <Typography>
                  {planInfos.franchise}GB
                </Typography>
              </Stack>
              <Box sx={{width: '30%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                R$ {planInfos.cost.toFixed(2)}
              </Box>
            </Box>
          </Box>
          <Box sx={{width: '100%', height: '20%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography>Total</Typography>
            <Typography>R$ {planInfos.cost.toFixed(2)} /{planInfos.period}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default ClientRegister
