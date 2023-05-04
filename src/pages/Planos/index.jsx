import { Box, Stack, Typography } from "@mui/material";
import { CompletePlansCard, ArchivedPlansCard } from "../../components";
import { checkboxGroup } from "../../utils/Menus/menuItems";
import { useContext, useState, useEffect, useRef } from "react";
import { PlansContext } from "../../contexts/Plans/PlansContext";
import Loading from "../../components/Loading";

function Planos() {
  const [hide, setHide] = useState(false);
  const { allPlans, loading } = useContext(PlansContext);
  const [providerFilter, setProviderFilter] = useState([]);
  const [filterOrder, setFilterOrder] = useState("Mais Recente");
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);

  const filterBoxRef = useRef(null);

  const handleProviderFilter = (provider) => {
    if (providerFilter.includes(provider)) {
      const newProviderFilter = providerFilter.filter(
        (value) => value !== provider
      );
      setProviderFilter(newProviderFilter);
      return;
    }

    const newProviderFilter = [...providerFilter, provider];
    setProviderFilter(newProviderFilter);
  };

  const handleFilterOrder = (e) => {
    setFilterOrder(e.target.textContent);
    handleFilterBox();
  };

  const handleFilterBox = () => {
    if (!isFilterBoxOpen) {
      setIsFilterBoxOpen(true);
      return;
    }

    filterBoxRef.current.style.animation = "filterBoxOut 0.4s ease forwards";

    setTimeout(() => {
      setIsFilterBoxOpen(false);
    }, 400);
  };

  useEffect(() => {
    console.log(filterOrder);
  }, [filterOrder]);

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
                  onChange={(e) => handleProviderFilter(e.target.value)}
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
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  gap: "10px",
                  cursor: "pointer",
                }}
                onClick={handleFilterBox}
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

              {isFilterBoxOpen && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "110%",
                    right: "0",
                    backgroundColor: "#fff",
                    padding: "30px",
                    border: "2px solid #D40066",
                    borderRadius: "8px",
                    width: "290px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                  className="filter-box"
                  ref={filterBoxRef}
                >
                  <Typography
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "1.125rem",
                      transition: "color 0.3s ease",
                      color:
                        filterOrder === "Mais Recente" ? "#D40066" : "#252525",
                      cursor: "pointer",
                    }}
                    onClick={handleFilterOrder}
                  >
                    Mais Recente
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "1.125rem",
                      color:
                        filterOrder === "Mais Antigo" ? "#D40066" : "#252525",
                      cursor: "pointer",
                    }}
                    onClick={handleFilterOrder}
                  >
                    Mais Antigo
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "1.125rem",
                      color:
                        filterOrder === "Prioridade Crescente"
                          ? "#D40066"
                          : "#252525",
                      cursor: "pointer",
                    }}
                    onClick={handleFilterOrder}
                  >
                    Prioridade Crescente
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "1.125rem",
                      color:
                        filterOrder === "Prioridade Decrescente"
                          ? "#D40066"
                          : "#252525",
                      cursor: "pointer",
                    }}
                    onClick={handleFilterOrder}
                  >
                    Prioridade Decrescente
                  </Typography>
                </Box>
              )}
            </Box>
          </Stack>
        </Stack>
        {loading === true ? (
          <Loading />
        ) : (
          <Box sx={{ width: "100%" }}>
            <CompletePlansCard
              providerFilter={providerFilter}
              filterOrder={filterOrder}
            />
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
            <ArchivedPlansCard
              providerFilter={providerFilter}
              filterOrder={filterOrder}
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export default Planos;
