import React from 'react'
import { Box } from '@mui/material'

function Loading() {
  return (
    <Box sx={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Box>
        <img src="./assets/icons/Rolling-1s-200px.gif" alt="imagem de loading" />
      </Box>
    </Box>
  )
}

export default Loading
