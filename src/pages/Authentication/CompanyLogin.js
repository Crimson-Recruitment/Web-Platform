import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Auth from "../../Firebase/Authentication";
import Cookies from "universal-cookie";

const defaultTheme = createTheme();

export default function CompanyLogin() {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const handleSubmit = async (event) => {
    event.preventDefault();
    let auth = new Auth();
    const data = new FormData(event.currentTarget);
    await auth.signIn(data.get("email"), data.get("password")).then((val) => {
      if (val.code == 0) {
        cookie.set("company-login", true, { path: "/" });
        window.location.href = "/company-jobs";
      } else {
        alert(`${val.code} : ${val.val}`);
      }
    });
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ minHeight: { lg: "100vh" } }}>
        <CssBaseline />
        <Grid item md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Company Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <RouterLink to="/login">
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{
                    mb: 2,
                    backgroundColor: "white",
                    borderColor: "black",
                    color: "black",
                    ":hover": {
                      color: "white",
                      backgroundColor: "black",
                      borderColor: "black",
                    },
                  }}
                >
                  I'm a Job Seeker
                </Button>
              </RouterLink>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <RouterLink to="/company-register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </RouterLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={false}
          md={8}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
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
