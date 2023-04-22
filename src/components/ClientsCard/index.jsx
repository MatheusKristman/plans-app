import React, { useContext } from 'react'
import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material'
import { PlansContext } from '../../contexts/Plans/PlansContext';

function ClientsCard({clients}) {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [planData, setPlanData] = useState([]);
  const [showMore, setShowMore] = useState(false)
  const [clientId, setClientId] = useState('');

  const {allPlans} = useContext(PlansContext)

  const pages = Math.ceil(clients.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = clients.slice(startIndex, endIndex)


  const handleShowMore = (client) => {
    setShowMore(!showMore)
    setClientId(client._id)
    if(showMore) {
      setClientId('')
    }
  }

  return (
    <>
      {currentItems.map((client) => (
        <Stack sx={{
          width: '100%', height: '150px', borderBottom: '1px solid lightGray',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflowY: 'auto', gap: '5%'
        }}
        key={client.name}
        >
          <Box sx={{display: 'flex', width: '100%', height: '40%'}}>
            <Stack sx={{flexDirection: 'row', width: '35%', height: '100%', alignItems: 'center', justifyContent: 'start', gap: '10%'}}>
              <img src={client.logo} alt="logo" />
              <Stack sx={{width: '70%', height: '100%', gap: '5%', justifyContent: 'center'}}>
                <Typography variant='h7' fontWeight='bold'>{client.name}</Typography>
                <Typography variant='span' color="lightgray">Nome</Typography>
              </Stack>
            </Stack>
            <Stack sx={{flexDirection: 'row', width: '65%', height: '100%', alignItems: 'center', justifyContent: 'start', gap: '2%'}}>
              <Stack sx={{width: '40%', height: '100%', gap: '5%', justifyContent: 'center'}}>
                <Typography variant='h7' fontWeight='bold'>{client.cel}</Typography>
                <Typography variant='span' color="lightgray">Celular</Typography>
              </Stack>
              <Stack sx={{width: '40%', height: '100%', gap: '5%', justifyContent: 'center'}}>
                <Typography variant='h7' fontWeight='bold'>{client.cpf}</Typography>
                <Typography variant='span' color="lightgray">Cpf</Typography>
              </Stack>
              <Stack sx={{width: '45%', height: '100%', gap: '5%', justifyContent: 'center'}}>
                <Typography variant='h7' fontWeight='bold'>{client.dateOfBirth}</Typography>
                <Typography variant='span' color="lightgray">Data de nascimento</Typography>
              </Stack>
              <Stack sx={{width: '10%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <button style={{width: '30px', height: '30px',
                  background: '#D40066', border: 'none', borderRadius: '4px',
                  color: '#fff', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold'}}
                  onClick={() => handleShowMore(client)}
                >{showMore && clientId === client._id ? '-' : '+'}</button>
              </Stack>
            </Stack>
          </Box>
          <Box sx={{display: clientId === client._id ? 'flex' : 'none', width: '100%', height: '40%'}}>
            <Stack sx={{width: '40%', height: '100%', gap: '5%', justifyContent: 'center', alignItems: 'center'}}>
              <Typography variant='h7' fontWeight='bold'>{planData.title}</Typography>
              <Typography variant='span' color="lightgray">Plano</Typography>
            </Stack>
          </Box>
        </Stack>
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
    </>
  )
}

export default ClientsCard
