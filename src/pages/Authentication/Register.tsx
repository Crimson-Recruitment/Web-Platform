import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Bg1 } from "../../Data/Images";
import UserRegisterForm from "../../components/Users/UserRegisterForm";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ maxHeight: { lg: "150vh" } }}>
        <CssBaseline />
        <Grid
          item
          component="img"
          src={Bg1}
          xs={false}
          sm={4}
          md={5}
          sx={{
            objectFit: "cover",
            objectPosition: "center",
            height: "120vh",
            display: { xs: "none", md: "block" },
          }}
        />
        <Grid item xs={12} md={7} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <UserRegisterForm />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
