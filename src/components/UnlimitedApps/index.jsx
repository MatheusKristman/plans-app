import { unlimitedApps } from "../../utils/UnlimitedApps/unlimitedApps";
import { Box } from "@mui/material";
import { useState } from "react";

function UnlimitedApps({ unlimitedApp, setUnlimitedApp }) {
  const [removedApps, setRemovedApps] = useState([]);

  function verifyUnlimitedApp(app) {
    if (unlimitedApp.includes(app.name)) {
      let appIndex = unlimitedApp.indexOf(app.name);
      setRemovedApps(removedApps.concat(unlimitedApp.splice(appIndex, 1)));
      return;
    }
    setUnlimitedApp([...unlimitedApp, app.name]);
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "5px",
      }}
    >
      {unlimitedApps.map((app) => (
        <Box
          key={app.id}
          onClick={() => verifyUnlimitedApp(app)}
          sx={{
            width: "100%",
            paddingBottom: "100%",
            height: "100%",
            background: "#ECECEC",
            borderRadius: "10px",
            cursor: "pointer",
            border: unlimitedApp.includes(app.name) ? "2px solid #D40066" : "",
            position: "relative",
          }}
        >
          <img
            src={app.icon}
            alt={app.name}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

export default UnlimitedApps;
