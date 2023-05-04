import { Box, Stack, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { PlansContext } from "../../contexts/Plans/PlansContext";

function SimplePlansCard() {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredPlans, setFilteredPlans] = useState([]);

  const { allPlans, search, loading } = useContext(PlansContext);

  let unarchivedPlans = allPlans?.filter((plano) => !plano.archived);

  const pages = Math.ceil(unarchivedPlans?.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = unarchivedPlans?.slice(startIndex, endIndex);

  useEffect(() => {
    search.length > 0
      ? setFilteredPlans(
          allPlans?.filter((plan) => plan.title.includes(search))
        )
      : setFilteredPlans([]);
  }, [search]);

  useEffect(() => {
    console.log(filteredPlans);
  }, [filteredPlans]);

  return (
    <>
      {search.length > 0 && filteredPlans.length === 0 ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: "1.5rem",
              color: "#B0B0B0",
            }}
          >
            Nenhum resultado encontrado
          </Typography>
        </Box>
      ) : search.length > 0 ? (
        filteredPlans?.map((plano) => (
          <Box
            key={plano.title}
            sx={{
              width: "100%",
              padding: "25px 0",
              borderBottom: "2px solid lightGray",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "25px",
              }}
            >
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#f5e0d9",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`https://planos-backend.onrender.com/assets/${plano.providerLogo}`}
                  alt={plano.provider}
                  style={{
                    width: "80%",
                    height: "auto",
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                fontFamily="Montserrat"
                fontWeight="600"
                fontSize="1.125rem"
                color="#252525"
              >
                {plano.title}
              </Typography>
            </Box>
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                gap: "70px",
              }}
            >
              <Stack
                sx={{
                  height: "100%",
                  alignItems: "start",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "1.125rem",
                    fontFamily: "Montserrat",
                    color: "#252525",
                  }}
                >
                  {plano.contacts}
                </Typography>
                <Typography
                  sx={{
                    color: "#b0b0b0",
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                    fontSize: "0.875rem",
                  }}
                >
                  Contatos
                </Typography>
              </Stack>
              <Stack
                sx={{
                  width: "100px",
                  height: "100%",
                  alignItems: "start",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "1.125rem",
                    fontFamily: "Montserrat",
                    color: "#252525",
                  }}
                >
                  R$ {plano.cost.toFixed(2)}
                </Typography>
                <Typography
                  sx={{
                    color: "#b0b0b0",
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                    fontSize: "0.875rem",
                  }}
                >
                  Total
                </Typography>
              </Stack>
              <Stack
                sx={{
                  width: "120px",
                  height: "100%",
                  alignItems: "start",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "1.125rem",
                    fontFamily: "Montserrat",
                    color: "#252525",
                  }}
                >
                  {plano.createdAt.slice(0, 10).split("-").reverse().join("/")}
                </Typography>
                <Typography
                  sx={{
                    color: "#b0b0b0",
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                    fontSize: "0.875rem",
                  }}
                >
                  Criado em
                </Typography>
              </Stack>
            </Box>
          </Box>
        ))
      ) : (
        currentItems?.map((plano) => (
          <Box
            key={plano.title}
            sx={{
              width: "100%",
              padding: "25px 0",
              borderBottom: "2px solid lightGray",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "25px",
              }}
            >
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#f5e0d9",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`https://planos-backend.onrender.com/assets/${plano.providerLogo}`}
                  alt={plano.provider}
                  style={{
                    width: "80%",
                    height: "auto",
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                fontFamily="Montserrat"
                fontWeight="600"
                fontSize="1.125rem"
                color="#252525"
              >
                {plano.title}
              </Typography>
            </Box>
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                gap: "70px",
              }}
            >
              <Stack
                sx={{
                  height: "100%",
                  alignItems: "start",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "1.125rem",
                    fontFamily: "Montserrat",
                    color: "#252525",
                  }}
                >
                  {plano.contacts}
                </Typography>
                <Typography
                  sx={{
                    color: "#b0b0b0",
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                    fontSize: "0.875rem",
                  }}
                >
                  Contatos
                </Typography>
              </Stack>
              <Stack
                sx={{
                  width: "100px",
                  height: "100%",
                  alignItems: "start",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "1.125rem",
                    fontFamily: "Montserrat",
                    color: "#252525",
                  }}
                >
                  R$ {plano.cost.toFixed(2)}
                </Typography>
                <Typography
                  sx={{
                    color: "#b0b0b0",
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                    fontSize: "0.875rem",
                  }}
                >
                  Total
                </Typography>
              </Stack>
              <Stack
                sx={{
                  width: "120px",
                  height: "100%",
                  alignItems: "start",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "1.125rem",
                    fontFamily: "Montserrat",
                    color: "#252525",
                  }}
                >
                  {plano.createdAt.slice(0, 10).split("-").reverse().join("/")}
                </Typography>
                <Typography
                  sx={{
                    color: "#b0b0b0",
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                    fontSize: "0.875rem",
                  }}
                >
                  Criado em
                </Typography>
              </Stack>
            </Box>
          </Box>
        ))
      )}
      {search.length === 0 ? (
        <Box
          sx={{
            marginTop: "50px",
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          {Array.from(Array(pages), (item, index) => {
            return (
              <button
                value={index}
                key={index}
                onClick={(e) => setCurrentPage(Number(e.target.value))}
                style={{
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  border: "none",
                  color: currentPage === index ? "#fff" : "#D40066",
                  background: currentPage === index ? "#D40066" : "#fff",
                  borderRadius: "8px",
                  border: "2px solid #D40066",
                }}
              >
                {index + 1}
              </button>
            );
          })}
        </Box>
      ) : null}
    </>
  );
}

export default SimplePlansCard;
