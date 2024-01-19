import { createTheme } from "@mui/material/styles";
import colors from "tailwindcss/colors";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors["green"][300],
    },
  },
  typography: {
    button: {
      color: colors["green"][300],
      textTransform: "none",
      fontWeight: "600",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#539165",
        },
      },
    },
  },
});
