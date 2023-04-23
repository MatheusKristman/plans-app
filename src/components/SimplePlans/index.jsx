import { Box, Stack, Typography, Button } from "@mui/material"
import { useContext, useState } from "react"

import {AddNewPlan, SimplePlansCard} from '../index'
import { PlansContext } from "../../contexts/Plans/PlansContext";

function SimplePlans() {

  const {allPlans, loading, plansMenu, editMenu, setPlansMenu, handleNewPlan} = useContext(PlansContext)

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
            Planos ativos: {allPlans?.filter(plano => !plano.archived)?.length}
          </Typography>
          <Button variant="contained"
            sx={{background: '#D40066', height: '45px', '&:hover': {background: '#D40066',}}}
            onClick={handleNewPlan}
            disabled={plansMenu}
          >
            Novo Plano
          </Button>
        </Stack>
        {loading === true ? <div>loading...</div> : <SimplePlansCard />}
      </Box>
      {
        plansMenu && (<AddNewPlan menuTitle="Novo Plano" />)
      }
    </>
  )
}

export default SimplePlans
