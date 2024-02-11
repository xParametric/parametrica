"use client";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#27374D",
    },
    secondary: {
      main: "#FFD700", // A brighter color for emphasis and contrast
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: "#FFFFFF", // Use a solid white for paper backgrounds to enhance legibility
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    subtitle1: {
      fontFamily: "Poppins, sans-serif",
    },
    subtitle2: {
      fontFamily: "Poppins, sans-serif",
    },
    body1: {
      fontFamily: "Poppins, sans-serif",
    },
    body2: {
      fontFamily: "Poppins, sans-serif",
    },
    button: {
      fontFamily: "Poppins, sans-serif",
    },
    caption: {
      fontFamily: "Poppins, sans-serif",
    },
    overline: {
      fontFamily: "Poppins, sans-serif",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "radial-gradient(circle, #cddef1 0%, #f7f7f7 100%)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        },
      },
    },
  },
});

export default theme;
