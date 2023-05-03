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
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "50px",
            }}
          >
            {checkboxGroup.map((check) => (
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "10px",
                  fontFamily: "Montserrat",
                  fontSize: "1.125rem",
                  color: "#252525",
                }}
                key={check.id}
              >
                <input
                  type="checkbox"
                  name={check.name}
                  id={check.name}
                  value={check.value}
                  style={{ accentColor: "#D40066" }}
                />
                {check.name}
              </label>
            ))}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <img src="./assets/icons/Filter.png" alt="filtro" />
              <Typography
                variant="h7"
                fontFamily="Montserrat"
                fontSize="1.125rem"
                color="#252525"
              >
                Filtrar
              </Typography>
            </Box>
          </Stack>
        </Stack>
        <Box sx={{ width: "100%", height: "500px" }}>
          {loading === true ? <Loading /> : <ClientsCard clients={clients} />}
        </Box>
      </Box>
    </>
  );
}

export default Clientes;
