import type { FC } from "react";
import { Box, CircularProgress } from "@mui/material";
import Logo from "./Logo";

const SlashScreen: FC = () => (
  <Box
    sx={{
      alignItems: "center",
      backgroundColor: "background.paper",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "center",
      left: 0,
      p: 3,
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 2000,
    }}
  >
    <CircularProgress
      size={120}
      sx={{
        color: "#82BAA7",
        position: "absolute",
        top: "455px",
        left: "660px",
      }}
    />
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2995A8",
        width: "100px",
        height: "100px",
        borderRadius: "50%",
      }}
    >
      <Logo />
    </Box>
  </Box>
);

export default SlashScreen;
