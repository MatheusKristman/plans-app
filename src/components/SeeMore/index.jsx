import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { PlansContext } from "../../contexts/Plans/PlansContext";
import { CgClose } from "react-icons/cg";

function SeeMore() {
  const { planInfo, handleEditMenu, handleSeeMore, toFile } =
    useContext(PlansContext);

  const detailBackgroundRef = useRef();
  const detailModalRef = useRef();

  const handleCloseModal = () => {
    detailBackgroundRef.current.style.animation =
      "fadeOutBG 0.4s ease forwards";
    detailModalRef.current.style.animation = "fadeOut 0.2s ease forwards";

    setTimeout(() => {
      handleSeeMore();
    }, 400);
  };

  const handleCloseModalOnScreen = (e) => {
    if (e.target.classList.contains("detail-modal-bg")) {
      detailBackgroundRef.current.style.animation =
        "fadeOutBG 0.4s ease forwards";
      detailModalRef.current.style.animation = "fadeOut 0.2s ease forwards";

      setTimeout(() => {
        handleSeeMore();
      }, 400);
    }
  };

  useEffect(() => {
    console.log("renderizado see more");
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(32, 33, 36, .5)",
        zIndex: "9",
        "::before": {
          content: '""',
          height: "100%",
          display: "inline-block",
          verticalAlign: "middle",
        },
        padding: "50px",
        overflow: "auto",
      }}
      className="detail-modal-bg"
      ref={detailBackgroundRef}
      onClick={handleCloseModalOnScreen}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          display: "inline-block",
          width: "100%",
          height: "auto",
          maxWidth: "720px",
          verticalAlign: "middle",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "16px",
          overflow: "hidden",
          zIndex: "3",
        }}
        className="detail-modal-box"
        ref={detailModalRef}
      >
        {/* Header Box */}
        <Box sx={{ position: "relative", width: "100%", height: "200px" }}>
          <img
            src="./assets/images/modal-image-lg.png"
            alt="imagem"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "right",
            }}
          />
          <button
            style={{
              position: "absolute",
              right: "30px",
              top: "30px",
              width: "40px",
              height: "40px",
              border: "none",
              background: "#fff",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => handleCloseModal()}
          >
            <CgClose size={25} />
          </button>
          <Box
            sx={{
              padding: "15px 30px",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              bottom: "0px",
              left: "0px",
              borderTopRightRadius: "10px",
            }}
          >
            <Typography
              variant="h5"
              fontFamily="Montserrat"
              fontWeight="600"
              fontSize="1.875rem"
              color="#252525"
            >
              Detalhes
            </Typography>
          </Box>
        </Box>
        {/* Header Box */}
        {/* Main Box */}
        <Box
          sx={{
            width: "100%",
            padding: "30px 60px 0",
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Stack sx={{ width: "50%", marginBottom: "25px" }}>
            <Typography
              variant="h7"
              fontFamily="Montserrat"
              fontWeight="600"
              fontSize="1.25rem"
              color="#252525"
              marginBottom="5px"
            >
              Título
            </Typography>
            <Typography fontFamily="Montserrat" fontSize="1rem" color="#252525">
              {planInfo.title}
            </Typography>
          </Stack>

          <Stack
            sx={{
              width: "40%",
              marginBottom: "25px",
            }}
          >
            <Typography
              variant="h7"
              fontFamily="Montserrat"
              fontWeight="600"
              fontSize="1.25rem"
              color="#252525"
              marginBottom="5px"
            >
              Criado Em
            </Typography>
            <Typography fontFamily="Montserrat" fontSize="1rem" color="#252525">
              {planInfo.createdAt.slice(0, 10).split("-").reverse().join("/")}
            </Typography>
          </Stack>

          <Stack sx={{ width: "50%", marginBottom: "25px" }}>
            <Typography
              variant="h7"
              fontFamily="Montserrat"
              fontWeight="600"
              fontSize="1.25rem"
              color="#252525"
              marginBottom="5px"
            >
              Operadora
            </Typography>
            <Box sx={{ width: "30%" }}>
              <img
                src={`https://planos-backend.onrender.com/assets/${planInfo.providerLogo}`}
                alt="logo"
                style={{ width: "60px", height: "auto" }}
              />
            </Box>
          </Stack>

          <Stack
            sx={{
              width: "40%",
              marginBottom: "25px",
            }}
          >
            <Typography
              variant="h7"
              fontFamily="Montserrat"
              fontWeight="600"
              fontSize="1.25rem"
              color="#252525"
              marginBottom="5px"
            >
              Contatos
            </Typography>
            <Typography fontFamily="Montserrat" fontSize="1rem" color="#252525">
              {planInfo.contacts}
            </Typography>
          </Stack>

          <Stack sx={{ width: "50%", marginBottom: "25px" }}>
            <Typography
              variant="h7"
              fontFamily="Montserrat"
              fontWeight="600"
              fontSize="1.25rem"
              color="#252525"
              marginBottom="5px"
            >
              Valor
            </Typography>
            <Typography fontFamily="Montserrat" fontSize="1rem" color="#252525">
              R$ {planInfo.cost}
            </Typography>
          </Stack>

          <Stack
            sx={{
              width: "40%",
            }}
          >
            <Typography
              variant="h7"
              fontFamily="Montserrat"
              fontWeight="600"
              fontSize="1.25rem"
              color="#252525"
              marginBottom="5px"
            >
              Prioridade
            </Typography>
            <Typography fontFamily="Montserrat" fontSize="1rem" color="#252525">
              {planInfo.priority}
            </Typography>
          </Stack>

          <Stack sx={{ width: "50%", marginBottom: "25px" }}>
            <Typography
              variant="h7"
              fontFamily="Montserrat"
              fontWeight="600"
              fontSize="1.25rem"
              color="#252525"
              marginBottom="5px"
            >
              Total
            </Typography>
            <Typography fontFamily="Montserrat" fontSize="1rem" color="#252525">
              R$ {planInfo.cost.toFixed(2) * planInfo.contacts.toFixed(2)}
            </Typography>
          </Stack>

          <Stack
            sx={{
              width: "40%",
              marginBottom: "25px",
            }}
          >
            <Typography
              variant="h7"
              fontFamily="Montserrat"
              fontWeight="600"
              fontSize="1.25rem"
              color="#252525"
              marginBottom="5px"
            >
              Apps Ilimitados
            </Typography>
            <Typography fontFamily="Montserrat" fontSize="1rem" color="#252525">
              {planInfo.unlimitedApps}
            </Typography>
          </Stack>

          <Stack sx={{ width: "50%", marginBottom: "25px" }}>
            <Typography
              variant="h7"
              fontFamily="Montserrat"
              fontWeight="600"
              fontSize="1.25rem"
              color="#252525"
              marginBottom="5px"
            >
              Tipo do plano
            </Typography>
            <Typography fontFamily="Montserrat" fontSize="1rem" color="#252525">
              {planInfo.planType}
            </Typography>
          </Stack>

          <Stack
            sx={{
              width: "40%",
              marginBottom: "25px",
            }}
          >
            <Typography
              variant="h7"
              fontFamily="Montserrat"
              fontWeight="600"
              fontSize="1.25rem"
              color="#252525"
              marginBottom="5px"
            >
              Franquia de Internet
            </Typography>
            <Typography fontFamily="Montserrat" fontSize="1rem" color="#252525">
              {planInfo.franchise}GB
            </Typography>
          </Stack>

          <Stack sx={{ width: "50%", marginBottom: "25px" }}>
            <Typography
              variant="h7"
              fontFamily="Montserrat"
              fontWeight="600"
              fontSize="1.25rem"
              color="#252525"
              marginBottom="5px"
            >
              Ligações ilimitadas
            </Typography>
            <Typography fontFamily="Montserrat" fontSize="1rem" color="#252525">
              {planInfo.unlimitedCall === "true" ? "Sim" : "Não"}
            </Typography>
          </Stack>

          <Stack sx={{ width: "100%", marginBottom: "50px" }}>
            <Typography
              variant="h7"
              fontFamily="Montserrat"
              fontWeight="600"
              fontSize="1.25rem"
              color="#252525"
              marginBottom="5px"
            >
              Descrição
            </Typography>
            <Typography fontFamily="Montserrat" fontSize="1rem" color="#252525">
              {planInfo.description}
            </Typography>
          </Stack>
        </Box>
        {/* Main Box */}

        {/* Footer Box */}
        <Box
          sx={{
            width: "100%",
            padding: "0 60px 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: "25px",
          }}
        >
          <button
            style={{
              padding: "10px 15px",
              border: "none",
              background: "#D40066",
              color: "#fff",
              fontSize: "1rem",
              borderRadius: "8px",
              cursor: "pointer",
              outline: "none",
              border: "2px solid #D40066",
            }}
            className="details-edit-btn"
            onClick={() => handleEditMenu(planInfo)}
          >
            Editar
          </button>
          <button
            style={{
              padding: "10px 15px",
              border: "2px solid #D40066",
              fontSize: "1rem",
              borderRadius: "8px",
              cursor: "pointer",
              outline: "none",
            }}
            className="details-archive-btn"
            onClick={() => {
              toFile(planInfo);
            }}
          >
            Arquivar
          </button>
        </Box>
        {/* Footer Box */}
      </Box>
    </Box>
  );
}

export default SeeMore;
