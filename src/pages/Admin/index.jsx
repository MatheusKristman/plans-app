import { Box, Stack, Typography } from "@mui/material";
import Form from "../../components/Form";
import { ToastContainer } from "react-toastify";

function Admin() {
  return (
    <Box className="container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: { lg: "45%", md: "100%" },
          background: "linear-gradient(180deg, #D5A595 0%, #F5E0D9 100%);",
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "auto",
          }}
        >
          <img
            src="./assets/images/Login-main-image.png"
            className="main-image"
            alt="imagem de um computador"
            style={{
              width: "100%",
              height: "auto",
              animation: "fadeInAdminImage 0.8s ease",
            }}
          />
        </Box>
      </Stack>
      <Stack
        sx={{
          width: { lg: "55%", md: "100%" },
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexFlow: "column",
        }}
      >
        <Box sx={{ height: "5%" }}>
          <Typography variant="h5">Logo</Typography>
        </Box>
        <Form />
      </Stack>
    </Box>
  );
}

export default Admin;
