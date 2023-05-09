import React, { useContext, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { About, Benefits, Footer, Header } from "./components";
import { stepsLoop } from "./utils/steps/steps";
import { PlansContext } from "./contexts/Plans/PlansContext";
import { SearchPlans } from "./components";

function App() {
  const { searchPlans } = useContext(PlansContext);

  useEffect(() => {
    if (searchPlans) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "unset";
    }
  }, []);

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
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "100px",
          width: "100%",
          paddingLeft: {
            xs: "25px",
            md: "60px",
            lg: "120px",
          },
          paddingRight: {
            xs: "25px",
            md: "60px",
            lg: "120px",
          },
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
            zIndex: "1",
          }}
        />
        <Box
          sx={{
            width: "100%",
            height: "90%",
            maxWidth: "1400px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "5%",
            position: "relative",
            zIndex: "2",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            fontSize="2rem"
            fontFamily="montserrat"
            marginBottom="50px"
          >
            Seu plano em apenas 3 passos
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr 1fr",
              },
              gridTemplateRows: {
                xs: "1fr 1fr 1fr",
                md: "1fr",
              },
              gap: "25px",
            }}
          >
            {stepsLoop.map((step, i) => (
              <Stack
                direction="row"
                sx={{
                  width: {
                    xs: "100%",
                    sm: "50%",
                    md: "100%",
                  },
                  height: "100%",
                  justifySelf: {
                    xs: "flex-start",
                    sm:
                      i === 0 ? "flex-start" : i === 1 ? "center" : "flex-end",
                    md: "flex-start",
                  },
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
          </Box>
        </Box>
      </Stack>
      <Box
        sx={{
          width: "100%",
          backgroundImage: {
            xs: "url('./assets/images/benefits-mobile-bg.png')",
            sm: "url('./assets/images/benefits-tablet-bg.png')",
            md: "url(./assets/images/main-bg.png)",
          },
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "300px",
          paddingBottom: "100px",
          paddingLeft: {
            xs: "25px",
            md: "60px",
            lg: "120px",
          },
          paddingRight: {
            xs: "25px",
            md: "60px",
            lg: "120px",
          },
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
          paddingLeft: {
            xs: "25px",
            md: "60px",
            lg: "120px",
          },
          paddingRight: {
            xs: "25px",
            md: "60px",
            lg: "120px",
          },
        }}
      >
        <About />
      </Box>
      <Footer />
    </Stack>
  );
}

export default App;
