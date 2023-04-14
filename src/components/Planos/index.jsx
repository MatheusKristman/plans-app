import { Box, Stack, Typography, Button } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useApi } from "../../hooks/useApi";

import {AddNewPlan, PlansCard} from '../index'

function Planos() {
  const [plansMenu, setPlansMenu] = useState(false);
  const [planos, setPlanos] = useState([])
  const auth = useContext(AuthContext)
  const api = useApi();

  useEffect(() => {
    const handlePosts = async () => {
      if(auth.user) {
        const data = await api.getPlans();
        setPlanos(data.plans)
      }
    }

    handlePosts();
  }, [])

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
            // disabled={plansMenu}
          >
            Novo Plano
          </Button>
        </Stack>
        <PlansCard planos={planos} />
      </Box>
      {
        plansMenu && (<AddNewPlan plansMenu={plansMenu} setPlansMenu={setPlansMenu} title="Novo Plano" />)
      }
    </>
  )
}

export default Planos
