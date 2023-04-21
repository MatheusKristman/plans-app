import {Box, Stack, Typography} from '@mui/material'
import { useContext, useState } from 'react';
import { AddNewPlan, SeeMore } from '../index'
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useApi } from '../../hooks/useApi';

function CompletePlansCard({plans, editMenu, setEditMenu, seeMore, setSeeMore, setPlanId, planId, isEditing, setIsEditing}) {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [planInfo, setPlanInfo] = useState([]);

  let unarchivedPlans = plans.filter(plan => !plan.archived)

  const auth = useContext(AuthContext);
  const api = useApi();

  const pages = Math.ceil(unarchivedPlans.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = unarchivedPlans.slice(startIndex, endIndex)

  const handleEditMenu = (item) => {
    setEditMenu(!editMenu)
    setIsEditing(!isEditing)
    setPlanId(item._id)
  }

  const handleSeeMore = (plan) => {
    setPlanInfo(plan);
    setSeeMore(!seeMore)
  }

  const handleToFile = async (plan) => {
    if(auth.user) {
      const data = await api.archivePlan(plan._id);
    }
  }

  return (
    <>
      {currentItems.map((plano) => (
        <Box
          key={plano.title}
          sx={{
            width: '100%', height: '150px', borderBottom: '1px solid lightGray',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowY: 'auto',
            filter: editMenu || seeMore ? 'blur(10px)' : ''
          }}
        >
          <Box
            sx={{ display: 'flex', width: '55%', height: '100%',
              alignItems: 'center', justifyContent: 'start', gap: '3%'
            }}
          >
            <img src={`https://planos-backend.onrender.com/assets/${plano.providerLogo}`} alt={plano.provider}/>
            <Typography variant="h7" fontWeight="bold">
              {plano.title}
            </Typography>
          </Box>
            <Box sx={{width: '80%', height: '70%', display: 'flex', alignItems: 'center',
              justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
              <Stack>
                <Typography variant="h7" fontWeight="bold">R$ {plano.cost.toFixed(2)}</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Valor</Typography>
              </Stack>
              <Stack>
                <Typography variant="h7" fontWeight="bold">{plano.franchise}GB</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Franquia</Typography>
              </Stack>
              <Stack>
                <Typography variant="h7" fontWeight="bold">{plano.contacts}</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Contatos</Typography>
              </Stack>
              <Stack>
                <Typography variant="h7" fontWeight="bold">{plano.createdAt.slice(0, 10).split('-').reverse().join('/')}</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Criado em</Typography>
              </Stack>
              <Stack sx={{width: '75%', height: '45%', alignItems: 'center', justifyContent: 'center',
                gap: '5%', flexDirection: 'row'}}>
                <button style={{width: '80px', height: '40px', borderRadius: '10px',
                  border: 'none', background: '#D40066', color: '#fff', fontWeight: 'bold', cursor: 'pointer'}}
                  onClick={() => handleEditMenu(plano)}
                >Editar</button>
                <button style={{width: '120px', height: '40px', borderRadius: '10px',
                  border: '2px solid #D40066', background: 'transparent',
                  color: '#D40066', fontWeight: 'bold', cursor: 'pointer'}}
                  onClick={() => handleSeeMore(plano)}
                  disabled={seeMore ? 'true' : ''}
                >Ver Detalhes</button>
                <button style={{width: '120px', height: '40px', borderRadius: '10px',
                  border: '2px solid #D40066', background: 'transparent',
                  color: '#D40066', fontWeight: 'bold', cursor: 'pointer'}}
                  onClick={() => handleToFile(plano)}
                >Arquivar</button>
              </Stack>
            </Box>
        </Box>
      ))}
      <Box sx={{width: '100%', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1%'}}>
        {Array.from(Array(pages), (item, index) => {
          return <button value={index}
            onClick={(e) => setCurrentPage(Number(e.target.value))}
            style={{
              width: '30px', height: '30px', cursor: 'pointer', border: 'none', color: '#fff', background: '#D40066',
              borderRadius: '8px'
            }}
          >{index + 1}</button>
        })}
      </Box>
      {
        editMenu && <AddNewPlan menuTitle={'Editar Plano'} setEditMenu={setEditMenu} editMenu={editMenu} planId={planId} isEditing={isEditing} setIsEditing={setIsEditing} />
      }
      {
        seeMore && <SeeMore seeMore={seeMore} setSeeMore={setSeeMore} planInfo={planInfo} setEditMenu={setEditMenu} editMenu={editMenu}/>
      }
    </>
  )
}

export default CompletePlansCard
