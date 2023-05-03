import { Box, Stack, Typography } from "@mui/material";
import { CompletePlansCard, ArchivedPlansCard } from "../../components";
import { checkboxGroup } from "../../utils/Menus/menuItems";
import { useContext, useState } from "react";
import { PlansContext } from "../../contexts/Plans/PlansContext";
import Loading from "../../components/Loading";

function Planos() {
  const [hide, setHide] = useState(false);
  const { allPlans, loading } = useContext(PlansContext);

  // colocar filtragem com os checkboxes

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 0 100px 0",
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "75px",
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
            Planos ativos: {allPlans?.filter((plans) => !plans.archived).length}
          </Typography>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              gap: "50px",
            }}
          >
            {checkboxGroup.map((check) => (
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
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
        {loading === true ? (
          <Loading />
        ) : (
          <Box sx={{ width: "100%" }}>
            <CompletePlansCard />
          </Box>
        )}

        <Stack
          direction="row"
          sx={{
            width: "100%",
            margin: "50px 0 75px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "500",
              fontSize: "1.125rem",
            }}
          >
            Planos arquivados:{" "}
            {allPlans?.filter((plans) => plans.archived).length}
          </Typography>
          <Stack
            sx={{
              width: "40%",
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "end",
              cursor: "pointer",
            }}
          >
            <Typography
              variant="h7"
              fontFamily="Montserrat"
              fontSize="1rem"
              onClick={() => setHide(!hide)}
            >
              {hide === true ? "Esconder" : "Mostrar"}
            </Typography>
          </Stack>
        </Stack>
        {loading === true ? (
          <Loading />
        ) : (
          <Box
            sx={{
              width: "100%",
              display: hide === true ? "block" : "none",
            }}
          >
            <ArchivedPlansCard />
          </Box>
        )}
      </Box>
    </>
  );
}

export default Planos;
