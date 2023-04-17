import { Box, Stack, Typography } from "@mui/material"
import { CompletePlansCard } from "../../components"
import { checkboxGroup } from "../../utils/Menus/menuItems."

function Planos({plans}) {

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
            Planos ativos: {plans.length}
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
          <CompletePlansCard plans={plans} />
        </Box>

        <Stack direction="row"
          sx={{
            width: '100%', height: '30px',
            marginTop: '3%', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <Typography>
            Planos arquivados: {plans.length}
          </Typography>
          <Stack sx={{ width: '40%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'end' }}>
            Esconder
          </Stack>
        </Stack>
        <Box sx={{width: '100%', height: '500px'}}>

        </Box>
      </Box>
    </>
  )
}

export default Planos
