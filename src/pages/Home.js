import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomeHero from "../components/Hero";
import { useLocation, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    (async () => {
      const doesAnyHistoryEntryExist = location.key !== "default";
      if (doesAnyHistoryEntryExist == false) {
        if (localStorage.getItem("userEmail") != null) {
          navigate("/jobs");
        } else if (localStorage.getItem("companyEmail") != null) {
          navigate("/company-jobs");
        }
      }
    })();
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid item md={7} xs={12} component={Paper} elevation={6} square>
          <HomeHero />
        </Grid>
        <Grid
          item
          xs={false}
          sm={false}
          md={5}
          sx={{
            backgroundImage: "url(./images/home.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
