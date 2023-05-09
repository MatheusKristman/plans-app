import React from "react";
import { benefitsLoop } from "../../utils/steps/benefits";
import { Box, Typography, Stack } from "@mui/material";

function Benefits() {
  return (
    <Box
      id="benefits"
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "1400px",
        width: "100%",
        paddingTop: "50px",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          justifyContent: "end",
          gap: "5%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "90%",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gridTemplateRows: {
              xs: "1fr 1fr 1fr 1fr",
              md: "1fr 1fr",
            },
            gap: "80px 20px",
          }}
        >
          {benefitsLoop.map((benefit) => (
            <Box
              key={benefit.id}
              sx={{
                width: "100%",
                display: "flex",
                gap: "20px",
              }}
            >
              <Box sx={{ height: "100%" }}>
                <img
                  src={benefit.icon}
                  style={{ width: "70px", height: "70px" }}
                  alt="beneficio"
                />
              </Box>
              <Stack
                sx={{
                  width: "85%",
                  height: "100%",
                  gap: "15px",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="500"
                  fontSize="1.5rem"
                  fontFamily="montserrat"
                >
                  {benefit.name}
                </Typography>
                <Typography variant="span" fontSize="1rem" lineHeight="26px">
                  {benefit.description}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}

export default Benefits;
