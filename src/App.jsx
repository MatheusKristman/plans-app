import React, { useContext } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { About, Benefits, Footer, Header } from "./components";
import { stepsLoop } from "./utils/steps/steps";
import { PlansContext } from "./contexts/Plans/PlansContext";
import { SearchPlans } from "./components";

function App() {
  const { searchPlans } = useContext(PlansContext);

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {searchPlans && <SearchPlans />}
      <Header />
      <Stack
        id="about"
        sx={{
          width: { xs: "90%", sm: "90%", md: "80%" },
          height: { xs: "700px", sm: "900px", md: "300px" },
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <img
          src="./assets/images/XMLID_1124_.png"
          alt="bolinhas"
          style={{
            position: "absolute",
            left: "-100px",
            top: "-150px",
            width: "300px",
            height: "300px",
          }}
        />
        <Box
          sx={{
            width: "100%",
            height: "90%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "5%",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            fontSize="2rem"
            fontFamily="montserrat"
          >
            Seu plano em apenas 3 passos
          </Typography>
          <Stack
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: { sm: "column", md: "row" },
            }}
          >
            {stepsLoop.map((step) => (
              <Stack
                direction="row"
                sx={{
                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: "32%",
                  },
                  height: "100%",
                  padding: "15px 30px 20px",
                  border: "2px solid #D40066",
                  borderRadius: "16px",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#fff",
                  boxShadow: "5px 5px 10px #Aaa",
                }}
                key={step.id}
              >
                <Box
                  sx={{
                    width: "52px",
                    height: "50px",
                    background: "#D40066",
                    left: "-2px",
                    position: "absolute",
                    top: "-2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                  }}
                >
                  <Typography
                    variant="h7"
                    fontWeight="500"
                    fontSize="1.875rem"
                    sx={{ color: "#fff" }}
                  >
                    {step.id}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "90%",
                    height: "90%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="500"
                      fontFamily="montserrat"
                      fontSize="1.563rem"
                      marginLeft="1.5rem"
                      marginBottom="30px"
                      lineHeight="2rem"
                    >
                      {step.name}
                    </Typography>
                  </Box>
                  <Typography variant="h7" fontWeight="400" lineHeight="26px">
                    {step.description}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
      <Box
        sx={{
          width: "100%",
          backgroundImage: "url(./assets/images/main-bg.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "300px",
          paddingBottom: "100px",
          marginTop: "-150px",
        }}
      >
        <Benefits />
      </Box>
      <Box
        id="faq"
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          paddingTop: "50px",
          paddingBottom: "150px",
        }}
      >
        <About />
      </Box>
      <Footer />
    </Stack>
  );
}

export default App;
