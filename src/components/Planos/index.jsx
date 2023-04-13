import { Box, Stack, Typography, Button } from "@mui/material"
import PlansCard from "../PlansCard"
import { useState } from "react"
import NewPlan from "../NewPlan";

function Planos({planos}) {
  const [plansMenu, setPlansMenu] = useState(false);

  function handleIfMenuIsActive(){
    setPlansMenu(!plansMenu)
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          overflowY: 'auto',
          flexDirection: 'column',
          gap: '5%',
          paddingX: '7%',
          filter: plansMenu ? 'blur(8px)' : '',
        }}
      >
        <Stack direction="row"
          sx={{
            width: '100%',
            height: '100px',
            marginTop: '3%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography>
            Planos ativos: {planos.length}
          </Typography>
          <Button variant="contained"
            sx={{background: '#D40066', height: '45px', '&:hover': {
              background: '#D40066',
            },}}
            onClick={handleIfMenuIsActive}
            disabled={plansMenu}
          >
            Novo Plano
          </Button>
        </Stack>
        <PlansCard planos={planos} />
      </Box>
      {
        plansMenu && (<NewPlan plansMenu={plansMenu} setPlansMenu={setPlansMenu} title="Novo Plano" />)
      }
    </>
  )
}

export default Planos
