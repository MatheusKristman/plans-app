import { Box, Stack, Typography } from '@mui/material'
import { useContext, useState } from 'react';
import { AddNewPlan, SeeMore } from '../index'
import { PlansContext } from '../../contexts/Plans/PlansContext';

function CompletePlansCard() {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

  const {allPlans, search , editMenu, seeMore, handleSeeMore, handleEditMenu, toFile} = useContext(PlansContext)

  let unarchivedPlans = allPlans?.filter(plan => !plan.archived)
  let filteredPlans = search.length > 0 ? allPlans?.filter(plan => plan.title.includes(search)) : []

  const pages = Math.ceil(unarchivedPlans?.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = unarchivedPlans?.slice(startIndex, endIndex)

  return (
    <>
      {search.length > 0 ? (filteredPlans?.map((plano) => (
        <Box
          key={plano._id}
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
            <img src={`https://planos-backend.onrender.com/assets/${plano.providerLogo}`} style={{maxWidth: '100px', maxHeight: '100px'}} alt={plano.provider}/>
            <Typography variant="h7" fontWeight="medium">
              {plano.title}
            </Typography>
          </Box>
            <Box sx={{width: '80%', height: '70%', display: 'flex', alignItems: 'center',
              justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
              <Stack>
                <Typography variant="h7" fontWeight="medium">R$ {plano.cost.toFixed(2)}</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Valor</Typography>
              </Stack>
              <Stack>
                <Typography variant="h7" fontWeight="medium">{plano.franchise}GB</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Franquia</Typography>
              </Stack>
              <Stack>
                <Typography variant="h7" fontWeight="medium">{plano.contacts}</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Contatos</Typography>
              </Stack>
              <Stack>
                <Typography variant="h7" fontWeight="medium">{plano.createdAt.slice(0, 10).split('-').reverse().join('/')}</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Criado em</Typography>
              </Stack>
              <Stack sx={{width: '75%', height: '45%', alignItems: 'center', justifyContent: 'center',
                gap: '5%', flexDirection: 'row'}}>
                <button style={{width: '80px', height: '40px', borderRadius: '10px',
                  border: 'none', background: '#D40066', color: '#fff', fontWeight: 'medium', cursor: 'pointer'}}
                  onClick={() => handleEditMenu(plano)}
                >Editar</button>
                <button style={{width: '120px', height: '40px', borderRadius: '10px',
                  border: '2px solid #D40066', background: 'transparent',
                  color: '#D40066', fontWeight: 'medium', cursor: 'pointer'}}
                  onClick={() => handleSeeMore(plano)}
                  disabled={seeMore}
                >Ver Detalhes</button>
                <button style={{width: '120px', height: '40px', borderRadius: '10px',
                  border: '2px solid #D40066', background: 'transparent',
                  color: '#D40066', fontWeight: 'medium', cursor: 'pointer'}}
                  onClick={() => toFile(plano)}
                >Arquivar</button>
              </Stack>
            </Box>
        </Box>
      ))) : (currentItems?.map((plano) => (
        <Box
          key={plano._id}
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
            <Typography variant="h7" fontWeight="medium">
              {plano.title}
            </Typography>
          </Box>
            <Box sx={{width: '80%', height: '70%', display: 'flex', alignItems: 'center',
              justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
              <Stack>
                <Typography variant="h7" fontWeight="medium">R$ {plano.cost.toFixed(2)}</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Valor</Typography>
              </Stack>
              <Stack>
                <Typography variant="h7" fontWeight="medium">{plano.franchise}GB</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Franquia</Typography>
              </Stack>
              <Stack>
                <Typography variant="h7" fontWeight="medium">{plano.contacts}</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Contatos</Typography>
              </Stack>
              <Stack>
                <Typography variant="h7" fontWeight="medium">{plano.createdAt.slice(0, 10).split('-').reverse().join('/')}</Typography>
                <Typography variant='span' sx={{color: 'lightGray'}}>Criado em</Typography>
              </Stack>
              <Stack sx={{width: '75%', height: '45%', alignItems: 'center', justifyContent: 'center',
                gap: '5%', flexDirection: 'row'}}>
                <button style={{width: '80px', height: '40px', borderRadius: '10px',
                  border: 'none', background: '#D40066', color: '#fff', fontWeight: 'medium', cursor: 'pointer'}}
                  onClick={() => handleEditMenu(plano)}
                >Editar</button>
                <button style={{width: '120px', height: '40px', borderRadius: '10px',
                  border: '2px solid #D40066', background: 'transparent',
                  color: '#D40066', fontWeight: 'medium', cursor: 'pointer'}}
                  onClick={() => handleSeeMore(plano)}
                  disabled={seeMore ? 'true' : ''}
                >Ver Detalhes</button>
                <button style={{width: '120px', height: '40px', borderRadius: '10px',
                  border: '2px solid #D40066', background: 'transparent',
                  color: '#D40066', fontWeight: 'medium', cursor: 'pointer'}}
                  onClick={() => toFile(plano)}
                >Arquivar</button>
              </Stack>
            </Box>
        </Box>
      )))}
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
        editMenu && <AddNewPlan menuTitle={'Editar Plano'} />
      }
      {
        seeMore && <SeeMore />
      }
    </>
  )
}

export default CompletePlansCard
