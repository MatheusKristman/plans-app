import { Box, Stack, Typography } from '@mui/material';
import { mockCityes } from '../../utils/Cityes/cityes';
import { linesLoop } from '../../utils/Lines/Lines';
import { pricesLoop } from '../../utils/Price/Price';
import { franchiseAtLeast } from '../../utils/Franchises/franchises';
import { operadoras } from '../../utils/Menus/menuItems.';
import { planTypes } from '../../utils/PlanTypes/planTypes';
import { unlimitedApps } from '../../utils/UnlimitedApps/unlimitedApps';

function HirePlanForm() {
  return (
    <form style={{width: '25%', height: '1800px', background: '#F0F1F6', position: 'relative', borderRadius: '10px',
          padding: '2%', display: 'flex', flexDirection: 'column', gap: '2%', zIndex: '99'}}>
          <Stack sx={{width: '100%', height: '8%', borderBottom: '2px solid lightGray', justifyContent: 'space-evenly'}}>
            <Typography variant='h6'>Cidade</Typography>
            <select name="city" id="city" style={{width: '100%', height: '50px', borderRadius: '5px', cursor: 'pointer'}}>
              {mockCityes.map(city => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </Stack>
          <Stack sx={{width: '100%', height: '10%', borderBottom: '2px solid lightGray', justifyContent: 'space-evenly'}}>
            <Typography variant='h6'>Numero de Linhas</Typography>
            {linesLoop.map(line => (
              <label
                style={{display: 'flex', justifyContent: 'flex-start', width: '100%', height: '50%',
                  alignItems: 'center', gap: '3%', cursor: 'pointer'}}
                key={line.id}
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
              >
                <input type="checkbox" name='plan-apps' value={app.name}/>
                {app.name}
              </label>
            ))}
          </Stack>
          <button type='submit' style={{width: '100%', height: '55px', background: '#D40066',
            color: '#fff', fontSize: '18px', position: 'absolute', top: '-45px', zIndex: '0', right: '0%',
            border: 'none', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', cursor: 'pointer',}}>Aplicar</button>
        </form>
  )
}

export default HirePlanForm
