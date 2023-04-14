import { Box, Stack, Typography } from "@mui/material"
import { NewPlanInputs, Operadoras, UnlimitedApps } from '../index'
import { useState } from "react"

function AddNewPlan({plansMenu, setPlansMenu, title}) {
  const [provider, setProvider] = useState('claro');
  const [inputValue, setInputValue] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [inputDuration, setInputDuration] = useState('7');

  console.log(inputDuration)

  return (
    <Box sx={{ width: '410px', height: '580px', overflowY: 'auto', position: 'absolute',
      top: '10%', left: '40%', borderRadius: '12px', boxShadow: '5px 5px 10px rgba(0,0,0,0.4)' }}>
      <Stack sx={{ width: '100%', height: '1200px'}}>
        {/* Caixa da Imagem */}

        <Box sx={{position: 'relative', width: '100%', height: '13%'}}>
          <img src="./assets/images/modal-figure.png" className="main-image" />
          <button
            style={{position: 'absolute', right: '20px', top: '20px', width: '25px',
              height: '25px', borderRadius: '5px', cursor: 'pointer'}}
            onClick={() => setPlansMenu(!plansMenu)}
          >
              X
          </button>
          <Box sx={{width: '130px', height: '50px', background: '#fff',
            position: 'absolute', bottom: '0px', borderTopRightRadius: '10px', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
            }}>
            <Typography variant="h7" fontWeight="bold">{title}</Typography>
          </Box>
        </Box>

        {/* Fim da caixa da imagem */}

        {/* Corpo da página */}
        <Box sx={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.7)', padding: '3%' }}>
          {/* Caixa das operadoras */}

            <Box sx={{ width: '100%', height: '10%', display: 'flex',
              gap: '2%', flexDirection: 'column', justifyContent: 'center'
            }}>
              <Typography variant="h7" fontWeight="bold">Operadora</Typography>
              <Operadoras setProvider={setProvider} provider={provider} />
            </Box>

          {/* Fim da caixa das operadoras */}

          {/* Caixa dos inputs */}
            <Box sx={{width: '100%', height: '35%', display: 'flex', flexDirection: 'column', gap: '2%'}}>
              <NewPlanInputs inputDuration={inputDuration} inputValue={inputValue} setInputDuration={setInputDuration}
                setInputValue={setInputValue} inputTitle={inputTitle} setInputTitle={setInputTitle}
              />
            </Box>
          {/* Fim da caixa dos inputs */}

          {/* Caixa dos apps ilimitados */}
            <Box>
              <UnlimitedApps />
            </Box>
          {/* Fim da caixa dos apps ilimitados */}
        </Box>
        {/* Fim do corpo da página */}
      </Stack>
    </Box>
  )
}

export default AddNewPlan
