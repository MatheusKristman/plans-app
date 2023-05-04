import { Box, Typography, Stack } from "@mui/material";
import { checkboxGroup } from "../../utils/Menus/menuItems";
import { useContext, useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { ClientsCard } from "../../components";
import { PlansContext } from "../../contexts/Plans/PlansContext";
import Loading from "../../components/Loading";

function Clientes() {
  const [clients, setClients] = useState([]);

  const auth = useContext(AuthContext);
  const { loading, setLoading } = useContext(PlansContext);
  const api = useApi();

  useEffect(() => {
    const handleGetClients = async () => {
      if (auth.user) {
        setLoading(true);
        const data = await api.getClients();
        setClients(data);
        setLoading(false);
      }

      console.log("clientes", clients);
    };
    handleGetClients();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "70px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "500",
              fontSize: "1.125rem",
              color: "#252525",
            }}
          >
            Clientes ativos: {clients.length}
          </Typography>
        </Stack>
        <Box sx={{ width: "100%" }}>
          {loading === true ? <Loading /> : <ClientsCard clients={clients} />}
        </Box>
      </Box>
    </>
  );
}

export default Clientes;
