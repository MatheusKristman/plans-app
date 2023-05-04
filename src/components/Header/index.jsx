import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState, useRef } from "react";
import { Menu, SearchPlans } from "..";
import { PlansContext } from "../../contexts/Plans/PlansContext";

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

  return (
    <Stack
      sx={{
        width: "100%",
        height: { xs: "1150px", sm: "1150px", md: "880px" },
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: 'url("./assets/images/header-bg.png")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 110%",
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
          maxWidth: "1200px",
          height: "100%",
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: "100%",
            height: { xs: "5%", md: "10%" },
            alignItems: "center",
            justifyContent: "space-between",
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
            {isMobile ? (
              <img
                src="./assets/icons/Menu.png"
                onClick={() => setMenu(!menu)}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <>
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
              </>
            )}
            {menu && <Menu menu={menu} setMenu={setMenu} />}
          </Box>
        </Stack>
        <Stack
          direction="row"
          sx={{
            width: "100%",
            height: { xs: "90%", sm: "90%", md: "90%" },
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Stack
            sx={{
              width: { xs: "100%", sm: "100%", md: "35%" },
              height: { xs: "40%", sm: "40%", md: "80%" },
              justifyContent: {
                xs: "center",
                sm: "start",
                md: "start",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "45px",
                  sm: "66px",
                  md: "75px",
                },
                fontFamily: "montserrat",
                fontWeight: 500,
                marginBottom: "15px",
                lineHeight: "100px",
              }}
            >
              Economize Tempo e Dinheiro
            </Typography>
            <Typography
              variant="h7"
              fontSize="1.25rem"
              lineHeight="28px"
              marginBottom="25px"
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
              width: { sm: "100%", md: "50%" },
              height: { xs: "60%", sm: "60%", md: "100%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <img
              src="./assets/images/top-phone-box.svg"
              style={{
                width: "40%",
                position: "absolute",
                top: "5%",
                left: "15%",
              }}
              ref={topBox}
            />
            <img
              src="./assets/images/bottom-phone-box.svg"
              style={{
                width: "40%",
                position: "absolute",
                bottom: "25%",
                right: "15%",
              }}
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
