import { useContext, useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/index.'
import { Box, Stack, Typography } from '@mui/material'
import { SearchBar, SimplePlans } from '../../components'
import Planos from '../Planos'
import Clientes from '../Clientes'
import { useApi } from '../../hooks/useApi'
import { AuthContext } from '../../contexts/Auth/AuthContext'

function Dashboard() {
  const [selectedOption, setSelectedOption] = useState('Dashboard')
  const [plans, setPlans] = useState([]);
  const [archivedPlans, setArchivedPlans] = useState([]);
  const [isEditing, setIsEditing] = useState(false)

  const auth = useContext(AuthContext)
  const api = useApi();


  useEffect(() => {
    const handleGetPlans = async () => {
      if(auth.user) {
        const data = await api.getPlans()
        setPlans(data.plans)
      }
    }

    handleGetPlans();
  }, [])


  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', gap: '5%'}}>
      <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <Stack sx={{ width: '73%', height: 'auto'}}>
        <Box sx={{ width: '100%', height: '10%',padding: '1%',}}>
          <Stack direction="row" sx={{ width: '100%', height: '100%',
            justifyContent: 'center', alignItems: 'center', gap: '10%'
          }}
          >
            <Typography variant='h5' sx={{ fontWeight: '600', alignSelf: 'flex-end'}}>
              {selectedOption}
            </Typography>
            <SearchBar />
          </Stack>
        </Box>
        { selectedOption === 'Dashboard' && <SimplePlans plans={plans} />}
        { selectedOption === 'Planos' && <Planos plans={plans} isEditing={isEditing} setIsEditing={setIsEditing} /> }
        { selectedOption === 'Clientes' && <Clientes plans={plans} /> }
      </Stack>
    </Box>
  )
}

export default Dashboard
