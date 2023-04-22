import React, {useContext, useState} from 'react'
import {Box, Stack, Typography} from '@mui/material'
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useApi } from '../../hooks/useApi';
import SeeMore from '../SeeMore';

function ArchivedPlansCard({plans, editMenu, setEditMenu, seeMore,
    setSeeMore, planId, setPlanId, setIsEditing, isEditing, search}) {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [planInfo, setPlanInfo] = useState([]);

  const archivedPlans = plans.filter(plan => plan.archived)
  let filteredPlans = search.length > 0 ? plans.filter(plan => plan.title.includes(search)) : []


  const auth = useContext(AuthContext);
  const api = useApi();

  const pages = Math.ceil(archivedPlans.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = archivedPlans.slice(startIndex, endIndex)

  const handleEditMenu = (item) => {
    setEditMenu(!editMenu)
    setIsEditing(!isEditing)
    setPlanId(item._id)
  }

  const handleSeeMore = (plan) => {
    setPlanInfo(plan)
    setSeeMore(!seeMore)
  }

  const handleToFile = async (plan) => {
    if(auth.user) {
      const data = await api.archivePlan(plan._id);

    }
  }

  return (
    <>
      {search.length > 0 ? (filteredPlans.map((item) => (
          <Box
          key={item.title}
          sx={{
            width: '100%', height: '150px', borderBottom: '1px solid lightGray',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowY: 'auto',
            filter: editMenu ? 'blur(10px)' : ''
          }}
        >
          <Box
            sx={{ display: 'flex', width: '55%', height: '100%',
              alignItems: 'center', justifyContent: 'start', gap: '3%'
            }}
          >
            <img src={`https://planos-backend.onrender.com/assets/${item.providerLogo}`} alt={item.provider}/>
            <Typography variant="h7" fontWeight="bold">
              {item.title}
            </Typography>
          </Box>
            <Box sx={{width: '80%', height: '70%', display: 'flex', alignItems: 'center',
              justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
              <Stack>
                <Typography variant="h7" fontWeight="bold">R$ {item.cost.toFixed(2)}</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Valor</Typography>
              </Stack>
              <Stack>
                <Typography variant="h7" fontWeight="bold">{item.franchise}GB</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Franquia</Typography>
              </Stack>
              <Stack>
                <Typography variant="h7" fontWeight="bold">{item.contacts}</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Contatos</Typography>
              </Stack>
              <Stack>
                <Typography variant="h7" fontWeight="bold">{item.createdAt.slice(0, 10).split('-').reverse().join('/')}</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Criado em</Typography>
              </Stack>
              <Stack sx={{width: '75%', height: '45%', alignItems: 'center', justifyContent: 'center',
                gap: '5%', flexDirection: 'row'}}>
                <button style={{width: '80px', height: '40px', borderRadius: '10px',
                  border: 'none', background: '#D40066', color: '#fff', fontWeight: 'bold', cursor: 'pointer'}}
                  onClick={() => handleEditMenu(item)}
                >Editar</button>
                <button style={{width: '120px', height: '40px', borderRadius: '10px',
                  border: '2px solid #D40066', background: 'transparent',
                  color: '#D40066', fontWeight: 'bold', cursor: 'pointer'}}
                  onClick={() => handleSeeMore(item)}
                  disabled={seeMore ? 'true' : ''}
                >Ver Detalhes</button>
                <button style={{width: '120px', height: '40px', borderRadius: '10px',
                  border: '2px solid #D40066', background: 'transparent',
                  color: '#D40066', fontWeight: 'bold', cursor: 'pointer'}}
                  onClick={() => handleToFile(item)}
                >Restaurar</button>
              </Stack>
            </Box>
        </Box>
      ))) : (
        currentItems.map((item) => (
          <Box
          key={item.title}
          sx={{
            width: '100%', height: '150px', borderBottom: '1px solid lightGray',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowY: 'auto',
            filter: editMenu ? 'blur(10px)' : ''
          }}
        >
          <Box
            sx={{ display: 'flex', width: '55%', height: '100%',
              alignItems: 'center', justifyContent: 'start', gap: '3%'
            }}
          >
            <img src={`https://planos-backend.onrender.com/assets/${item.providerLogo}`} alt={item.provider}/>
            <Typography variant="h7" fontWeight="bold">
              {item.title}
            </Typography>
          </Box>
            <Box sx={{width: '80%', height: '70%', display: 'flex', alignItems: 'center',
              justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
              <Stack>
                <Typography variant="h7" fontWeight="bold">R$ {item.cost.toFixed(2)}</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Valor</Typography>
              </Stack>
              <Stack>
                <Typography variant="h7" fontWeight="bold">{item.franchise}GB</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Franquia</Typography>
              </Stack>
              <Stack>
                <Typography variant="h7" fontWeight="bold">{item.contacts}</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Contatos</Typography>
              </Stack>
              <Stack>
                <Typography variant="h7" fontWeight="bold">{item.createdAt.slice(0, 10).split('-').reverse().join('/')}</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Criado em</Typography>
              </Stack>
              <Stack sx={{width: '75%', height: '45%', alignItems: 'center', justifyContent: 'center',
                gap: '5%', flexDirection: 'row'}}>
                <button style={{width: '80px', height: '40px', borderRadius: '10px',
                  border: 'none', background: '#D40066', color: '#fff', fontWeight: 'bold', cursor: 'pointer'}}
                  onClick={() => handleEditMenu(item)}
                >Editar</button>
                <button style={{width: '120px', height: '40px', borderRadius: '10px',
                  border: '2px solid #D40066', background: 'transparent',
                  color: '#D40066', fontWeight: 'bold', cursor: 'pointer'}}
                  onClick={() => handleSeeMore(item)}
                  disabled={seeMore ? 'true' : ''}
                >Ver Detalhes</button>
                <button style={{width: '120px', height: '40px', borderRadius: '10px',
                  border: '2px solid #D40066', background: 'transparent',
                  color: '#D40066', fontWeight: 'bold', cursor: 'pointer'}}
                  onClick={() => handleToFile(item)}
                >Restaurar</button>
              </Stack>
            </Box>
        </Box>
      ))
      )}
      {
        }
      <Box sx={{width: '100%', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1%'}}>
        {Array.from(Array(pages), (item, index) => {
          return <button value={index}
            key={index}
            onClick={(e) => setCurrentPage(Number(e.target.value))}
            style={{
              width: '30px', height: '30px', cursor: 'pointer', border: 'none', color: '#fff', background: '#D40066',
              borderRadius: '8px'
            }}
          >{index + 1}</button>
        })}
      </Box>
      {
        seeMore && <SeeMore seeMore={seeMore} setSeeMore={setSeeMore} planInfo={planInfo} setEditMenu={setEditMenu} editMenu={editMenu}/>
      }
    </>
  )
}

export default ArchivedPlansCard
