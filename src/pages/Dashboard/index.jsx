import { useState } from "react";
import Sidebar from "../../components/Sidebar/index.";
import { Box, Stack, Typography } from "@mui/material";
import { SearchBar, SimplePlans } from "../../components";
import Planos from "../Planos";
import Clientes from "../Clientes";

function Dashboard() {
  const [selectedOption, setSelectedOption] = useState("Dashboard");

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        justifyContent: "flex-end",
        position: "relative",
      }}
    >
      <Sidebar
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <Stack
        sx={{
          width: "70%",
          height: "auto",
          margin: "0 auto",
          padding: "0 0 100px 0",
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: "30px 0 75px",
          }}
        >
          <Stack
            direction="row"
            sx={{
              width: "100%",
              height: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "600",
                alignSelf: "flex-end",
                fontFamily: "Montserrat",
                fontSize: "1.875rem",
                color: "#252525",
              }}
            >
              {selectedOption}
            </Typography>
            <SearchBar />
          </Stack>
        </Box>
        {selectedOption === "Dashboard" && <SimplePlans />}
        {selectedOption === "Planos" && <Planos />}
        {selectedOption === "Clientes" && <Clientes />}
      </Stack>
    </Box>
  );
}

export default Dashboard;
