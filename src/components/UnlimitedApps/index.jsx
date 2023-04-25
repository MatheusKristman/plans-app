import { unlimitedApps } from '../../utils/UnlimitedApps/unlimitedApps'
import { Box } from '@mui/material'
import { useState } from 'react';

function UnlimitedApps({unlimitedApp, setUnlimitedApp}) {

  const [removedApps, setRemovedApps] = useState([])

  function verifyUnlimitedApp(app) {
    if(unlimitedApp.includes(app.name)) {
      let appIndex = unlimitedApp.indexOf(app.name)
      setRemovedApps(removedApps.concat(unlimitedApp.splice(appIndex, 1)));
      return
    }
    setUnlimitedApp([...unlimitedApp, app.name])
  }
  return (
    <Box sx={{width: '100%', height: '80%', display: 'flex', flexFlow: 'row wrap',
      alignItems: 'center', justifyContent: 'space-around'}}>
      {unlimitedApps.map((app) => (
        <Box key={app.id}
          onClick={() => verifyUnlimitedApp(app)}
          sx={{width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#cccccc', borderRadius: '10px', cursor: 'pointer',
          border: unlimitedApp.includes(app.name) ? '2px solid #D40066' : '' }}
        >
          <img src={app.icon} alt={app.name} />
        </Box>
      ))}
    </Box>
  )
}

export default UnlimitedApps
