import { Box, Typography, Stack } from "@mui/material"
import { checkboxGroup } from "../../utils/Menus/menuItems."
import { useContext, useEffect, useState } from "react"
import { useApi } from "../../hooks/useApi"
import { AuthContext } from "../../contexts/Auth/AuthContext"
import { ClientsCard } from "../../components"

function Clientes({plans}) {
  const [clients, setClients] = useState([])

  const auth = useContext(AuthContext)
  const api = useApi();

  useEffect(() => {
    const handleGetPlans = async () => {
      if(auth.user) {
        const data = await api.getClients();
        setClients(data)
      }
    }
    handleGetPlans();
  }, [])

  return (
    <>
      <Box
        sx={{ width: '100%', height: '1200px', display: 'flex', flexDirection: 'column',
          paddingX: '7%', justifyContent: 'center', alignItems: 'center'}}
      >
        <Stack direction="row"
          sx={{
            width: '100%', height: '30px',
            marginTop: '3%', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <Typography>
            Clientes ativos: {clients.length}
          </Typography>
          <Stack sx={{ width: '60%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
            {checkboxGroup.map((check) => (
              <label
                style={{ display: 'flex', alignItems: 'center', width: '14%', height: '100%', justifyContent: 'space-evenly',
                  cursor: 'pointer'
              }}
                key={check.id}
              >
                <input
                  type="checkbox" name={check.name} id={check.name} value={check.value}
                />
                {check.name}
              </label>
            ))}
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '20%'}}>
              <img src="./assets/icons/Filter.png" alt="filtro" />
              <Typography variant="h7" fontWeight="bold" >Filtrar</Typography>
            </Box>
          </Stack>
        </Stack>
        <Box sx={{width: '100%', height: '500px'}}>
          <ClientsCard clients={clients} plans={plans} />
        </Box>
      </Box>
    </>
  )
}

export default Clientes
