import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState, useRef } from "react";
import { Menu, SearchPlans } from "..";
import { PlansContext } from "../../contexts/Plans/PlansContext";
import { HiBars3 } from "react-icons/hi2";

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mousePos, setMousePos] = useState({});

  const { searchPlans, setSearchPlans } = useContext(PlansContext);

  const topBox = useRef(null);
  const bottomBox = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setIsMobile(true);
      }
    };

    handleResize();
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 1200) {
      function handleMouseMove(e) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [setMousePos]);

  useEffect(() => {
    function handleContentMove() {
      const positionY = (window.innerHeight + mousePos.y * 2) / 90;
      const positionXContent = (window.innerWidth + mousePos.x) / 90;

      topBox.current.style.transform = `translateY(${positionY}px) translateX(${
        positionXContent - 60
      }px)`;
      bottomBox.current.style.transform = `translateY(${positionY}px) translateX(${
        positionXContent - 60
      }px)`;
    }

    handleContentMove();
  }, [mousePos]);

  useEffect(() => {
    if (menu) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "unset";
    }
  }, [menu]);

  return (
    <Stack
      sx={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: {
          xs: 'url("./assets/images/hero-mobile-bg.png")',
          sm: 'url("./assets/images/hero-tablet-bg.png")',
          md: 'url("./assets/images/header-bg.png")',
        },
        backgroundRepeat: "no-repeat",
        backgroundSize: {
          xs: "100% 100%",
          lg: "100% 110%",
        },
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
      <Stack
        sx={{
          width: "100%",
          maxWidth: "1400px",
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            padding: {
              xs: "15px 0",
              lg: "25px 0",
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h7"
              fontWeight="600"
              sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
            >
              Logo
            </Typography>
          </Box>
          <Box
            sx={{
              height: { xs: "35%", sm: "100%", md: "100%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "50px",
            }}
          >
            <button
              type="button"
              className="header-mobile-menu-btn"
              onClick={() => setMenu(true)}
            >
              <HiBars3 />
            </button>

            <a
              href="#about"
              style={{
                fontWeight: "600",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              className="header-menu-item"
            >
              Como funciona
            </a>
            <a
              href="#benefits"
              style={{
                fontWeight: "600",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              className="header-menu-item"
            >
              Benefícios
            </a>
            <a
              href="#faq"
              style={{
                fontWeight: "600",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              className="header-menu-item"
            >
              FAQ
            </a>
            {menu && <Menu menu={menu} setMenu={setMenu} />}
          </Box>
        </Stack>

        <Stack
          direction="row"
          sx={{
            width: "100%",
            padding: {
              xs: "50px 0",
              sm: "70px 0",
              md: "100px 0",
            },
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          <Stack
            sx={{
              width: {
                xs: "100%",
                md: "50%",
              },
              justifyContent: {
                xs: "center",
                sm: "start",
                md: "start",
              },
              marginTop: "50px",
            }}
          >
            <Typography
              sx={{
                maxWidth: "600px",
                fontSize: {
                  xs: "2.188rem",
                  sm: "3.75rem",
                  md: "5rem",
                },
                fontFamily: "montserrat",
                fontWeight: 500,
                marginBottom: "15px",
                lineHeight: {
                  xs: "45px",
                  sm: "70px",
                  md: "100px",
                },
              }}
            >
              Economize Tempo e Dinheiro
            </Typography>
            <Typography
              variant="h7"
              fontSize="1.25rem"
              lineHeight="28px"
              marginBottom="25px"
              maxWidth="600px"
            >
              Encontre os melhores planos da sua cidade com ótimos preços e
              facilidade.
            </Typography>
            <Button
              sx={{
                width: "fit-content",
                padding: "15px 20px",
                background: "#D40066",
                color: "#fff",
                fontWeight: "500",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "1.15rem",
                fontFamily: "montserrat",
                textTransform: "none",
                transition: "filter .3s ease",
                ":hover": {
                  background: "#D40066",
                  filter: "brightness(80%)",
                },
              }}
              onClick={() => setSearchPlans(!searchPlans)}
            >
              Encontre seu plano
            </Button>
          </Stack>
          <Box
            sx={{
              width: {
                xs: "80%",
                sm: "50%",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              alignSelf: {
                xs: "flex-end",
                md: "unset",
              },
              transform: {
                xs: "translateY(50px)",
                sm: "translateY(50px)",
                md: "translateY(0)",
              },
              marginTop: {
                xs: "0px",
                sm: "-120px",
                md: "0",
              },
            }}
          >
            <img
              src="./assets/images/top-phone-box.svg"
              style={{
                width: "40%",
                position: "absolute",
              }}
              className="hero-top-phone-box"
              ref={topBox}
            />
            <img
              src="./assets/images/bottom-phone-box.svg"
              style={{
                width: "40%",
                position: "absolute",
              }}
              className="hero-bottom-phone-box"
              ref={bottomBox}
            />
            <img
              src="./assets/images/phone.svg"
              style={{ width: "100%", height: "100%" }}
              alt="telefone"
            />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Header;
