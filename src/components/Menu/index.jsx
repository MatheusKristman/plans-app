import { Stack, Typography } from '@mui/material'
import React from 'react'

function MenuModdal({menu, setMenu}) {
  return (
    <Stack sx={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.8)', position: 'absolute', top: '0px', left: '0px', backdropFilter: 'blur(10px)',}}>
      <button style={{width: '50px', height: '50px', position: 'absolute', top: '5%', right: '10%',
        background: 'transparent', color: '#fff' , border: '2px solid #D40066', fontSize: '16px', borderRadius: '8px'}}
        onClick={() => setMenu(!menu)}
      >X</button>
      <Stack sx={{width: '60%', height: '50%', alignItems: 'center', justifyContent: 'center', gap: '10%'}}>
        <Typography variant="h7" fontWeight="medium" color="#fff">Como funciona</Typography>
        <Typography variant="h7" fontWeight="medium" color="#fff">Benefícios</Typography>
        <Typography variant="h7" fontWeight="medium" color="#fff">FAQ</Typography>
      </Stack>
    </Stack>
  )
}

export default MenuModdal
