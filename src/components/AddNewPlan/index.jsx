import { Box, Stack, Typography } from "@mui/material"
import { NewPlanFinalInputs, NewPlanInputs, Operadoras, UnlimitedApps, Cities, States } from '../index'
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useApi } from "../../hooks/useApi";
import { PlansContext } from "../../contexts/Plans/PlansContext";

function AddNewPlan({menuTitle}) {
  const [selectedUf, setSelectedUf] = useState('')
  const [provider, setProvider] = useState('');
  const [cost, setCost] = useState('');
  const [title, setTitle] = useState('');
  const [inputDays, setInputDays] = useState('');
  const [unlimitedApp, setUnlimitedApp] = useState([])
  const [city, setCity] = useState('');
  const [period, setPeriod] = useState('');
  const [franchise, setFranchise] = useState('');
  const [unlimitedCall, setUnlimitedCall] = useState(false);
  const [planType, setPlanType] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [providerLogo, setProviderLogo] = useState([]);
  const lines = 1;

  const auth = useContext(AuthContext);
  const {plansMenu, isEditing, setIsEditing, setPlansMenu, editMenu, setEditMenu, setLoading, setAllPlans, planId} = useContext(PlansContext);
  const api = useApi();

  const handleMenus = () => {
    if(plansMenu) setPlansMenu(!plansMenu);
    if(editMenu) setEditMenu(!editMenu);
    if(isEditing) setIsEditing(!isEditing)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(auth.user && isEditing) {
      setLoading(true)
      const response = await api.editPlan(planId, title, cost, period, franchise,
        unlimitedApp, unlimitedCall, planType, priority, description, lines)
        setAllPlans(response)
        setEditMenu(!editMenu)
        setLoading(false)
      return
    }

    if(auth.user && !isEditing) {
      const response = await api.createPlans(title, cost, period, franchise, unlimitedApp,
        unlimitedCall, planType, priority, description, lines, providerLogo, city, provider)
        .then((response) => {
          console.log(response)
        }).catch((err) => {
          if(err.response) {
            console.log(err.response)
          }else {
            console.log("Erro: BD offline")
          }
        })
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '410px', height: '580px', overflowY: 'auto', position: 'absolute',
      top: '10%', left: '40%', borderRadius: '12px', boxShadow: '5px 5px 10px rgba(0,0,0,0.4)' }}
      encType="multipart/form-data">
      <Stack sx={{ width: '100%', height: menuTitle === 'Editar Plano' ? '1200px' : '1500px'}}>
        {/* Caixa da Imagem */}

        <Box sx={{position: 'relative', width: '100%', height: '13%'}}>
          <img src="./assets/images/modal-figure.png" className="main-image" />
          <button
            style={{position: 'absolute', right: '20px', top: '20px', width: '35px',
              height: '35px', borderRadius: '5px', cursor: 'pointer', border: 'none'}}
              onClick={handleMenus}
          >
              X
          </button>
          <Box sx={{width: '130px', height: '50px', background: '#fff',
            position: 'absolute', bottom: '0px', borderTopRightRadius: '10px', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
            }}>
            <Typography variant="h7" fontWeight="bold">{menuTitle}</Typography>
          </Box>
        </Box>

        {/* Fim da caixa da imagem */}

        {/* Corpo da página */}
        <Box sx={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.9)', padding: '3%' }}>
          {/* Caixa das operadoras */}

            <Box sx={{ width: '100%', height: '15%', display: isEditing ? 'none' : 'flex',
              gap: '2%', flexDirection: 'column', justifyContent: 'center'
            }}>
              <Typography variant="h7" fontWeight="bold">Operadora</Typography>
              <Operadoras setProvider={setProvider} provider={provider} setProviderLogo={setProviderLogo} providerLogo={providerLogo}/>
            </Box>

          {/* Fim da caixa das operadoras */}

          {/* Caixa das cidades */}
          <Stack sx={{width: '100%', height: '10%', alignItems: 'center', justifyContent: 'space-evenly', display: isEditing ? 'none' : 'flex'}}>
            <Box sx={{width: '100%', height: '40%'}}>
              <States onChange={setSelectedUf} />
            </Box>
            <Box sx={{width: '100%', height: '40%'}}>
              <Cities setCity={setCity} uf={selectedUf} city={city} />
            </Box>
          </Stack>
          {/* Fim da caixa das cidades */}

          {/* Caixa dos inputs */}
            <Box sx={{width: '100%', height: menuTitle === 'Editar Plano' ? '35%' : '24%', display: 'flex', flexDirection: 'column', gap: '2%'}}>
              <NewPlanInputs inputDays={inputDays} cost={cost} setInputDays={setInputDays}
                setCost={setCost} title={title} setTitle={setTitle}
                period={period} setPeriod={setPeriod} franchise={franchise} setFranchise={setFranchise}
              />
            </Box>
          {/* Fim da caixa dos inputs */}

          {/* Caixa dos apps ilimitados */}
            <Box sx={{width: '100%', height: menuTitle === 'Editar Plano' ? '15%' : '12%', display: 'flex', flexDirection: 'column', gap: '5%'}}>
              <Typography variant="h7" fontWeight="bold">Apps ilimitados</Typography>
              <UnlimitedApps unlimitedApp={unlimitedApp} setUnlimitedApp={setUnlimitedApp} />
            </Box>
          {/* Fim da caixa dos apps ilimitados */}

          {/* Caixa dos inputs finais */}
            <Box sx={{width: '100%', height: menuTitle === 'Editar Plano' ? '45%': '35%', display: 'flex', flexDirection: 'column', gap: '2%'}}>
              <Typography variant="h7" fontWeight="bold" mt="10px">Ligações ilimitadas</Typography>
              <NewPlanFinalInputs setUnlimitedCall={setUnlimitedCall} setPlanType={setPlanType} setPriority={setPriority}
                setDescription={setDescription}
              />
            </Box>
          {/* Fim da caixa dos inputs finais */}

          {/* Caixa do botão de submit */}
            <Box sx={{width: '100%', height: '5%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <button type="submit"
                style={{width: '100%', height: '50px', fontSize: '18px',
                  fontWeight: 'bold', background: '#D40066', color: '#fff',
                  borderRadius: '10px', border: 'none', cursor: 'pointer'}}
              >
                Salvar
              </button>
            </Box>
          {/* Fim da caixa do botão de submit */}
        </Box>
        {/* Fim do corpo da página */}
      </Stack>
    </form>
  )
}

export default AddNewPlan
