import React from 'react'
import { unlimitedApps } from '../../utils/UnlimitedApps/unlimitedApps'
import { Box } from '@mui/material'

function UnlimitedApps({unlimitedApp, setUnlimitedApp}) {
  return (
    <Box sx={{width: '100%', height: '80%', display: 'flex', flexFlow: 'row wrap',
      alignItems: 'center', justifyContent: 'space-around'}}>
      {unlimitedApps.map((app) => (
        <Box key={app.id}
          sx={{width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#cccccc', borderRadius: '10px', cursor: 'pointer',
          border: app.name === unlimitedApp ? '2px solid #D40066' : ''}}
          onClick={() => setUnlimitedApp(app.name)}
        >
          <img src={app.icon} alt={app.name} />
        </Box>
      ))}
    </Box>
  )
}

export default UnlimitedApps
