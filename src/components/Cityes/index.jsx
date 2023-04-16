import { Box, Typography } from "@mui/material"

function Cityes() {
  return (
    <Box sx={{ width: '100%', height: '8%', display: 'flex', flexDirection: 'column', gap: '7%' }}>
      <label>
        <Typography variant='h7' fontWeight='bold'>Cidade</Typography>
      </label>
      <select name="planType" id="planType"
        style={{width: '100%', height: '50px', border: '2px solid #000',
        background: 'transparent', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'}}>
          <option
            value="first"
            key="olá"
            style={{fontSize: '16px', fontWeight: 'bold'}}
          >first</option>
      </select>
    </Box>
  )
}

export default Cityes
