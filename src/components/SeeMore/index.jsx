import { Box, Stack, Typography } from "@mui/material"
import { useContext } from "react"
import { PlansContext } from "../../contexts/Plans/PlansContext"

function SeeMore() {

  const {planInfo, handleEditMenu, handleSeeMore, toFile} = useContext(PlansContext)

  return (
    <Box sx={{width: '555px', height: '550px', overflowY: 'auto', position: 'absolute',
      top: '10%', left: '40%', borderRadius: '20px'}}>
      <Box sx={{width: '100%', height: '900px', background: 'rgba(255, 255, 255, 1)'}}>
        {/* Header Box */}
          <Box sx={{position: 'relative', width: '100%', height: '20%'}}>
            <img src="./assets/images/modal-figure-lg.png" alt="imagem" />
            <button style={{position: 'absolute', right: '20px', top: '20px', width: '30px', height: '30px',
              border: 'none', background: '#fff', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold',
              cursor: 'pointer'
            }}
              onClick={() => handleSeeMore()}
            >X
            </button>
            <Box sx={{width: '140px', height: '60px', background: '#fff', display: 'flex', alignItems: 'center',
              justifyContent: 'center', position: 'absolute', bottom: '-25px', borderRadius: '10px'}}>
              <Typography variant="h5" fontWeight="bold">Detalhes</Typography>
            </Box>
          </Box>
        {/* Header Box */}
        {/* Main Box */}
          <Box sx={{width: '100%', height: '75%', paddingX: '5%', paddingTop: '5%', display: 'flex',
            alignItems: 'start', justifyContent: 'space-between', flexWrap: 'wrap'}}>
              <Stack sx={{width: '50%', height: '10%', gap: '5%'}}>
                <Typography variant="h7" fontWeight="bold">Título</Typography>
                <Typography>{planInfo.title}</Typography>
              </Stack>
              <Stack sx={{width: '40%', height: '10%', gap: '5%', alignItems: 'center'}}>
                <Typography variant="h7" fontWeight="bold">Criado Em</Typography>
                <Typography>{planInfo.createdAt.slice(0, 10).split('-').reverse().join('/')}</Typography>
              </Stack>
              <Stack sx={{width: '50%', height: '10%', gap: '5%'}}>
                <Typography variant="h7" fontWeight="bold">Operadora</Typography>
                <Box sx={{width: '30%', height: '90%'}}>
                  <img src={`https://planos-backend.onrender.com/assets/${planInfo.providerLogo}`} alt="logo" style={{width: '100%', height: '100%'}} />
                </Box>
              </Stack>
              <Stack sx={{width: '40%', height: '10%', gap: '5%', alignItems: 'center'}}>
                <Typography variant="h7" fontWeight="bold">Contatos</Typography>
                <Typography>{planInfo.contacts}</Typography>
              </Stack>
              <Stack sx={{width: '50%', height: '10%', gap: '5%'}}>
                <Typography variant="h7" fontWeight="bold">Valor</Typography>
                <Typography>R$ {planInfo.cost}</Typography>
              </Stack>
              <Stack sx={{width: '40%', height: '10%', gap: '5%', alignItems: 'center'}}>
                <Typography variant="h7" fontWeight="bold">Prioridade</Typography>
                <Typography>{planInfo.priority}</Typography>
              </Stack>
              <Stack sx={{width: '50%', height: '10%', gap: '5%'}}>
                <Typography variant="h7" fontWeight="bold">Total</Typography>
                <Typography>R$ {planInfo.cost.toFixed(2) * planInfo.contacts.toFixed(2)}</Typography>
              </Stack>
              <Stack sx={{width: '40%', height: '10%', gap: '5%', alignItems: 'center'}}>
                <Typography variant="h7" fontWeight="bold">Apps Ilimitados</Typography>
                <Typography>{planInfo.unlimitedApps}</Typography>
              </Stack>
              <Stack sx={{width: '50%', height: '10%', gap: '5%'}}>
                <Typography variant="h7" fontWeight="bold">Tipo do plano</Typography>
                <Typography>{planInfo.planType}</Typography>
              </Stack>
              <Stack sx={{width: '40%', height: '10%', gap: '5%', alignItems: 'center'}}>
                <Typography variant="h7" fontWeight="bold">Franquia de Internet</Typography>
                <Typography>{planInfo.franchise}GB</Typography>
              </Stack>
              <Stack sx={{width: '50%', height: '10%', gap: '5%'}}>
                <Typography variant="h7" fontWeight="bold">Ligações ilimitadas</Typography>
                <Typography>{planInfo.unlimitedCall === 'true' ? 'Sim' : 'Não'}</Typography>
              </Stack>
              <Stack sx={{width: '100%', height: '15%', gap: '5%'}}>
                <Typography variant="h7" fontWeight="bold">Descrição</Typography>
                <Typography>{planInfo.description}</Typography>
              </Stack>
          </Box>
        {/* Main Box */}

        {/* Footer Box */}
            <Box sx={{width: '100%', height: '5%', display: 'flex', alignItems: 'center', justifyContent: 'start',
              paddingX: '5%', gap: '4%'}}>
              <button style={{width: '100px', height: '40px', border: 'none', background: '#D40066',
                color: '#fff', fontSize: '18px', borderRadius: '8px', cursor: 'pointer'}}
                onClick={() => handleEditMenu(planInfo)}
              >Editar</button>
              <button style={{width: '150px', height: '40px', border: '2px solid #D40066',
                color: '#D40066', fontSize: '18px', borderRadius: '8px', cursor: 'pointer', background: 'none'}}
                onClick={() => {toFile(planInfo)}}
              >Arquivar</button>
            </Box>
        {/* Footer Box */}
      </Box>
    </Box>
  )
}

export default SeeMore
