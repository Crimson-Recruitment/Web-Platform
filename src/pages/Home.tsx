import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomeHero from "../components/Hero";
import { useLocation, useNavigate } from "react-router-dom";
import { HomePage } from "../Data/Images";

const defaultTheme = createTheme();

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid item md={7} xs={12} component={Paper} elevation={6} square>
          <HomeHero />
        </Grid>
        <Grid
          item
          component="img"
          xs={false}
          sm={false}
          md={5}
          src={HomePage}
          sx={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
