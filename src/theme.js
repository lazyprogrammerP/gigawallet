import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#151515",
      paper: "#232323",
    },
    text: {
      primary: "#f5f5f5",
      secondary: "#bababa",
    },
    secondary: {
      main: "#11825d",
    },
  },
  typography: {
    fontFamily: "Poppins",
    h3: { fontSize: "24px", fontWeight: "600" },
    h4: { fontSize: "20px", fontWeight: "700" },
    h5: { fontSize: "14px", fontWeight: "700" },
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
