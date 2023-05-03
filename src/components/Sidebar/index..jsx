import { Typography, Box, Stack } from "@mui/material";
import React, { useContext } from "react";
import { menuItems } from "../../utils/Menus/menuItems";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

function Sidebar({ selectedOption, setSelectedOption }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSignOut() {
    auth.signOut();
    navigate("/");
  }

  return (
    <Box>
      <Stack
        sx={{
          width: "100%",
          background: "linear-gradient(180deg, #D5A595 0%, #F5E0D9 100%);",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomRightRadius: "10px",
          boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "20%",
            padding: "30px 80px",
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            borderBottomColor: "#D5A595",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h5">Logo</Typography>
        </Box>
        <Stack
          sx={{
            width: "100%",
            padding: "30px 80px",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {menuItems.map((item) => (
            <Box
              sx={{
                width: "fit-content",
                height: "18%",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "10px",
                cursor: "pointer",
                padding: "10px 15px",
                background: item.name === selectedOption ? "#000" : "",
                borderRadius: "8px",
                transform: "translateX(-15px)",
              }}
              onClick={() => setSelectedOption(item.name)}
              key={item.id}
            >
              {item.name === selectedOption ? item.icon : item.blackIcon}
              <Typography
                sx={{
                  color: item.name === selectedOption ? "#fff" : "#252525",
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "1.25rem",
                }}
              >
                {item.name}
              </Typography>
            </Box>
          ))}
        </Stack>
        <Box
          sx={{
            padding: "150px 80px 50px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            paddingLeft: "25%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
              onClick={handleSignOut}
            >
              <img
                src="./assets/icons/sign-out.png"
                alt=""
                style={{
                  minWidth: "20px",
                  maxWidth: "20px",
                  width: "20px",
                  minHeight: "20px",
                  maxHeight: "20px",
                  height: "20px",
                }}
              />
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "1.25rem",
                  color: "#252525",
                }}
              >
                Sair
              </Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default Sidebar;
