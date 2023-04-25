import { Stack, Typography } from '@mui/material';
import { mockCities } from '../../utils/Cities/cities';
import { linesLoop } from '../../utils/Lines/Lines';
import { pricesLoop } from '../../utils/Price/Price';
import { franchiseAtLeast } from '../../utils/Franchises/franchises';
import { operadoras } from '../../utils/Menus/menuItems.';
import { planTypes } from '../../utils/PlanTypes/planTypes';
import { unlimitedApps } from '../../utils/UnlimitedApps/unlimitedApps';
import { useState } from 'react';
import States from '../States';
import Cities from '../Cities';

function HirePlanForm({clientRegisterMenu}) {
  const [city, setCity] = useState('');
  const [lines, setLines] = useState('');
  const [cost, setCost] = useState('');
  const [franchise, setFranchise] = useState('');
  const [provider, setProvider] = useState([]);
  const [planType, setPlanType] = useState([]);
  const [unlimitedApp, setUnlimitedApp] = useState([]);
  const [selectedUf, setSelectedUf] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleProviders = (operadora) => {
    if(provider.includes(operadora.name)) {
      let providerIndex = provider.indexOf(operadora.name);
      provider.splice(providerIndex, 1)
      return
    }
    setProvider([...provider, operadora.name])
  }

  const handlePlanType = (plan) => {
    if(planType.includes(plan.name)) {
      let providerIndex = planType.indexOf(plan.name);
      planType.splice(providerIndex, 1)
      return
    }
    setPlanType([...planType, plan.name])
  }

  const verifyUnlimitedApp = (app) => {
    if(unlimitedApp.includes(app.name)) {
      let appIndex = unlimitedApp.indexOf(app.name)
      unlimitedApp.splice(appIndex, 1)
      return
    }
    setUnlimitedApp([...unlimitedApp, app.name])
  }

  return (
    <form style={{width: '25%', height: '1800px', background: '#F0F1F6', position: 'relative', borderRadius: '10px',
          padding: '2%', display: 'flex', flexDirection: 'column', gap: '2%', zIndex: '99',
          filter: clientRegisterMenu === true ? 'blur(10px)' : ''}} onSubmit={handleSubmit}>
          <Stack sx={{width: '100%', height: '8%', borderBottom: '2px solid lightGray', justifyContent: 'space-evenly'}}>
            <Typography variant='h6'>Cidade</Typography>
            <States onChange={setSelectedUf} />
            <Cities uf={selectedUf} city={city} setCity={setCity}/>
          </Stack>
          <Stack sx={{width: '100%', height: '10%', borderBottom: '2px solid lightGray', justifyContent: 'space-evenly'}}>
            <Typography variant='h6'>Numero de Linhas</Typography>
            {linesLoop.map(line => (
              <label
                style={{display: 'flex', justifyContent: 'flex-start', width: '100%', height: '50%',
                  alignItems: 'center', gap: '3%', cursor: 'pointer'}}
                key={line.id}
                onChange={(e) => setLines(e.target.value)}
              >
                <input type="radio" name='plan-line' value={line.name}/>
                {line.name}
              </label>
            ))}
          </Stack>
          <Stack sx={{width: '100%', height: '10%', borderBottom: '2px solid lightGray', justifyContent: 'space-evenly'}}>
            <Typography variant='h6'>Preço</Typography>
            {pricesLoop.map(price => (
              <label
                style={{display: 'flex', justifyContent: 'flex-start', width: '100%', height: '50%',
                  alignItems: 'center', gap: '3%', cursor: 'pointer'}}
                key={price.id}
                onChange={(e) => setCost(e.target.value)}
              >
                <input type="radio" name='plan-price' value={price.value}/>
                {price.name}
              </label>
            ))}
          </Stack>
          <Stack sx={{width: '100%', height: '10%', borderBottom: '2px solid lightGray', justifyContent: 'space-evenly'}}>
            <Typography variant='h6'>Franquias de internet</Typography>
            {franchiseAtLeast.map(franchise => (
              <label
                style={{display: 'flex', justifyContent: 'flex-start', width: '100%', height: '50%',
                  alignItems: 'center', gap: '3%', cursor: 'pointer'}}
                key={franchise.id}
                onChange={(e) => setFranchise(e.target.value)}
              >
                <input type="radio" name='plan-franchise' value={franchise.value}/>
                {franchise.name}
              </label>
            ))}
          </Stack>
          <Stack sx={{width: '100%', height: '10%', borderBottom: '2px solid lightGray', justifyContent: 'space-evenly'}}>
            <Typography variant='h6'>Provedores</Typography>
            {operadoras.map(operadora => (
              <label
                style={{display: 'flex', justifyContent: 'flex-start', width: '100%', height: '50%',
                  alignItems: 'center', gap: '3%', cursor: 'pointer'}}
                key={operadora.id}
                onChange={() => {handleProviders(operadora)}}
              >
                <input type="checkbox" name='plan-provider' value={operadora.name}/>
                {operadora.name}
              </label>
            ))}
          </Stack>
          <Stack sx={{width: '100%', height: '10%', borderBottom: '2px solid lightGray', justifyContent: 'space-evenly'}}>
            <Typography variant='h6'>Planos</Typography>
            {planTypes.map(plan => (
              <label
                style={{display: 'flex', justifyContent: 'flex-start', width: '100%', height: '50%',
                  alignItems: 'center', gap: '3%', cursor: 'pointer'}}
                key={plan.id}
                onChange={() => {handlePlanType(plan)}}
              >
                <input type="checkbox" name='plan-type' value={plan.name}/>
                {plan.name}
              </label>
            ))}
          </Stack>
          <Stack sx={{width: '100%', height: '28%', borderBottom: '2px solid lightGray', justifyContent: 'space-evenly'}}>
            <Typography variant='h6'>Apps Ilimitados</Typography>
            {unlimitedApps.map(app => (
              <label
                style={{display: 'flex', justifyContent: 'flex-start', width: '100%', height: '50%',
                  alignItems: 'center', gap: '3%', cursor: 'pointer'}}
                key={app.id}
                onChange={() => {verifyUnlimitedApp(app)}}
              >
                <input type="checkbox" name='plan-apps' value={app.name}/>
                {app.name}
              </label>
            ))}
          </Stack>
          <button type='submit' style={{width: '100%', height: '55px', background: '#D40066',
            color: '#fff', fontSize: '18px', position: 'absolute', top: '-45px', zIndex: '0', right: '0%',
            border: 'none', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', cursor: 'pointer',}}
            disabled={clientRegisterMenu === true}
            >Aplicar</button>
        </form>
  )
}

export default HirePlanForm
