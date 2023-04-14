import { Typography, Box, Stack } from '@mui/material'
import React, { useContext } from 'react'
import { menuItems } from '../../utils/Menus/menuItems.'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { useNavigate } from 'react-router-dom';

function Sidebar({selectedOption, setSelectedOption}) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSignOut() {
    auth.signOut();
    navigate('/')
  }

  return (
      <Box sx={{ width: '17%', height: '100%',}}>
        <Stack
          sx={{ width: '100%', height: '60%', background: 'linear-gradient(180deg, #D5A595 0%, #F5E0D9 100%);',
            justifyContent: 'space-between', alignItems: 'center', borderBottomRightRadius: '10px',
            boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.3)'
          }}
        >
          <Box sx={{
            width: '50%', height: '20%', borderBottomWidth: '1px',
            borderBottomStyle: 'solid', borderBottomColor: '#D5A595', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}>
            <Typography variant='h5'>
              Logo
            </Typography>
          </Box>
          <Stack
            sx={{
              width: '100%', height: '50%', justifyContent: 'center',
              gap: '20px', alignItems: 'center',
            }}
          >
            {
              menuItems.map((item) => (
                <Box
                  sx={{
                    width: '70%', paddingLeft: '10%', height: '18%',
                    display: 'flex', alignItems: 'center', justifyContent: 'start',
                    gap: '10px', cursor: 'pointer', background: item.name === selectedOption ? '#000' : '',
                    borderRadius: '8px',
                  }}
                  onClick={() => setSelectedOption(item.name)}
                  key={item.id}
                >
                  <img src={item.icon} alt={item.alt} />
                  <Typography sx={{color: item.name === selectedOption ? '#fff' : ''}}>
                    {item.name}
                  </Typography>
                </Box>
              ))
            }
          </Stack>
          <Box sx={{
            width: '100%', height: '30%', display: 'flex',
            alignItems: 'center', justifyContent: 'start',
            paddingLeft: '25%'
          }}>
            <Box
              sx={{
                width: '100%', height: '100%', display: 'flex',
                justifyContent: 'start', alignItems: 'center',
              }}
            >
              <Box sx={{display: 'flex', gap: '10px', cursor: 'pointer'}} onClick={handleSignOut}>
                <img src="./assets/icons/sign-out.png" alt="" />
                <Typography sx={{fontWeight: '600'}}>
                  Sair
                </Typography>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>
  )
}

export default Sidebar
