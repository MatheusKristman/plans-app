import { Box, Stack, Typography } from "@mui/material"

function SeeMore({seeMore, setSeeMore, planInfo}) {
  console.log(planInfo)

  return (
    <Box sx={{width: '555px', height: '550px', overflowY: 'auto', position: 'absolute',
      top: '10%', left: '40%', borderRadius: '20px'}}>
      <Box sx={{width: '100%', height: '1200px', background: 'rgba(255, 255, 255, 0.7)'}}>
        {/* Header Box */}
          <Box sx={{position: 'relative', width: '100%', height: '16.6%'}}>
            <img src="./assets/images/modal-figure-lg.png" alt="imagem" />
            <button style={{position: 'absolute', right: '20px', top: '20px', width: '30px', height: '30px',
              border: 'none', background: '#fff', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold',
              cursor: 'pointer'
            }}
              onClick={() => setSeeMore(!seeMore)}
            >X
            </button>
            <Box sx={{width: '140px', height: '60px', background: '#fff', display: 'flex', alignItems: 'center',
              justifyContent: 'center', position: 'absolute', bottom: '-5px', borderRadius: '10px'}}>
              <Typography variant="h5" fontWeight="bold">Detalhes</Typography>
            </Box>
          </Box>
        {/* Header Box */}
        {/* Main Box */}
          <Box sx={{width: '100%', height: '60%', background: '#aaa', paddingX: '10%', paddingTop: '10%'}}>

          </Box>
        {/* MainBox */}
      </Box>
    </Box>
  )
}

export default SeeMore
