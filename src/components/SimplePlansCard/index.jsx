import { Box, Stack, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { PlansContext } from "../../contexts/Plans/PlansContext";

function SimplePlansCard() {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

  const {allPlans, search, loading} = useContext(PlansContext);

  let unarchivedPlans = allPlans?.filter(plano => !plano.archived)

  const pages = Math.ceil(unarchivedPlans?.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = unarchivedPlans?.slice(startIndex, endIndex)

  let filteredPlans = search.length > 0 ? allPlans?.filter(plan => plan.title.includes(search)) : [];

  return (
    <>
      {loading && <div>loading...</div>}
      {search.length > 0 ? (
        filteredPlans.map((plano) => (
          <Box
            key={plano.title}
            sx={{
              width: '100%', height: '100px', borderBottom: '1px solid lightGray',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{ display: 'flex', width: '50%', height: '100%',
                alignItems: 'center', justifyContent: 'start', gap: '5%'
              }}
            >
              <img src={`https://planos-backend.onrender.com/assets/${plano.providerLogo}`} alt={plano.provider}/>
              <Typography variant="h6">
                {plano.title}
              </Typography>
            </Box>
            <Box
              sx={{
                width: '48%', height: '100%',
                alignItems: 'center', justifyContent: 'center', display: 'flex'
              }}
            >
              <Stack
                sx={{
                  width: '25%', height: '100%',
                  alignItems: 'start', justifyContent: 'center'
                }}
              >
                <Typography sx={{fontWeight: '500'}}>
                  {plano.contacts}
                </Typography>
                <Typography sx={{color: 'lightGray'}}>
                  Contatos
                </Typography>
              </Stack>
              <Stack sx={{ width: '25%', height: '100%',
                alignItems: 'start', justifyContent: 'center'
                }}
              >
                <Typography sx={{fontWeight: '500'}}>
                  R$ {plano.cost.toFixed(2)}
                </Typography>
                <Typography sx={{color: 'lightGray'}}>
                  Total
                </Typography>
              </Stack>
              <Stack sx={{ width: '25%', height: '100%',
                alignItems: 'start', justifyContent: 'center'
                }}
              >
                <Typography sx={{fontWeight: '500'}}>
                  {plano.createdAt.slice(0, 10).split('-').reverse().join('/')}
                </Typography>
                <Typography sx={{color: 'lightGray'}}>
                  Criado em
                </Typography>
              </Stack>
            </Box>
          </Box>
        ))
      ) : (currentItems?.map((plano) => (
        <Box
          key={plano.title}
          sx={{
            width: '100%', height: '100px', borderBottom: '1px solid lightGray',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{ display: 'flex', width: '50%', height: '100%',
              alignItems: 'center', justifyContent: 'start', gap: '5%'
            }}
          >
            <img src={`https://planos-backend.onrender.com/assets/${plano.providerLogo}`} alt={plano.provider}/>
            <Typography variant="h6">
              {plano.title}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '48%', height: '100%',
              alignItems: 'center', justifyContent: 'center', display: 'flex'
            }}
          >
            <Stack
              sx={{
                width: '25%', height: '100%',
                alignItems: 'start', justifyContent: 'center'
              }}
            >
              <Typography sx={{fontWeight: '500'}}>
                {plano.contacts}
              </Typography>
              <Typography sx={{color: 'lightGray'}}>
                Contatos
              </Typography>
            </Stack>
            <Stack sx={{ width: '25%', height: '100%',
              alignItems: 'start', justifyContent: 'center'
              }}
            >
              <Typography sx={{fontWeight: '500'}}>
                R$ {plano.cost.toFixed(2)}
              </Typography>
              <Typography sx={{color: 'lightGray'}}>
                Total
              </Typography>
            </Stack>
            <Stack sx={{ width: '25%', height: '100%',
              alignItems: 'start', justifyContent: 'center'
              }}
            >
              <Typography sx={{fontWeight: '500'}}>
                {plano.createdAt.slice(0, 10).split('-').reverse().join('/')}
              </Typography>
              <Typography sx={{color: 'lightGray'}}>
                Criado em
              </Typography>
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
    </>
  )
}

export default SimplePlansCard
