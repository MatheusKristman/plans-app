import { Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";

function MenuModal({ menu, setMenu }) {
  const menuRef = useRef(null);

  const handleMenuClose = () => {
    menuRef.current.style.animation = "fadeOutBG 0.5s ease forwards";

    setTimeout(() => {
      setMenu(false);
    }, 500);
  };

  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "100vh",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.8)",
        position: "absolute",
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        zIndex: "5",
      }}
      className="header-mobile-menu"
      ref={menuRef}
    >
      <button
        style={{
          width: "40px",
          height: "40px",
          position: "absolute",
          top: "30px",
          right: "30px",
          background: "#D40066",
          color: "#fff",
          border: "none",
          fontSize: "1.6rem",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          outline: "none",
        }}
        onClick={handleMenuClose}
      >
        <IoClose />
      </button>
      <Stack
        sx={{
          width: "100%",
          height: "50%",
          alignItems: "center",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        <a
          href="#about"
          style={{
            fontWeight: "600",
            textDecoration: "none",
            transition: "color 0.3s ease",
            fontFamily: "Montserrat",
            fontSize: "1.5rem",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Como funciona
        </a>
        <a
          href="#benefits"
          style={{
            fontWeight: "600",
            textDecoration: "none",
            transition: "color 0.3s ease",
            fontFamily: "Montserrat",
            fontSize: "1.5rem",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Benefícios
        </a>
        <a
          href="#faq"
          style={{
            fontWeight: "600",
            textDecoration: "none",
            transition: "color 0.3s ease",
            fontFamily: "Montserrat",
            fontSize: "1.5rem",
            color: "#fff",
            textAlign: "center",
          }}
        >
          FAQ
        </a>
      </Stack>
    </Stack>
  );
}

export default MenuModal;
