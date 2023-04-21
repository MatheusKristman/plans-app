import { Box, Stack, Typography, Button } from "@mui/material"
import { useState } from "react"

import {AddNewPlan, SimplePlansCard} from '../index'

function SimplePlans({plans, search}) {
  const [plansMenu, setPlansMenu] = useState(false);

  function handleIfMenuIsActive(){
    setPlansMenu(!plansMenu)
  }

  return (
    <>
      <Box
        sx={{ width: '100%', height: 'auto', display: 'flex', overflowY: 'auto',
          flexDirection: 'column', gap: '5%', paddingX: '7%', filter: plansMenu ? 'blur(8px)' : '',
        }}
      >
        <Stack direction="row"
          sx={{
            width: '100%', height: '100px',
            marginTop: '3%', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <Typography>
            Planos ativos: {plans.filter(plano => !plano.archived).length}
          </Typography>
          <Button variant="contained"
            sx={{background: '#D40066', height: '45px', '&:hover': {background: '#D40066',}}}
            onClick={handleIfMenuIsActive}
            disabled={plansMenu}
          >
            Novo Plano
          </Button>
        </Stack>
        <SimplePlansCard planos={plans} search={search} />
      </Box>
      {
        plansMenu && (<AddNewPlan plansMenu={plansMenu} setPlansMenu={setPlansMenu} menuTitle="Novo Plano" />)
      }
    </>
  )
}

export default SimplePlans
