import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import MuiPhoneNumber from "material-ui-phone-number";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "universal-cookie";
import LocationSearchInput from "../../components/LocationInput";
import Auth from "../../Firebase/Authentication";
import uniqid from "uniqid";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CompanyRegister() {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  let auth = new Auth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    await auth
      .signUp(data.get("email"), data.get("password"))
      .then(async (val) => {
        if (val.code == 0) {
          cookie.set("company-login", true, { path: "/" });
          localStorage.setItem("email", data.get("email"));
          sessionStorage.setItem(
            "companyData",
            JSON.stringify({
              id: uniqid(`${data.get("companyName")}-`, "-company"),
              companyName: data.get("companyName"),
              phoneNumber1: data.get("phonenumber1"),
              phoneNumber2: data.get("phonenumber2"),
              location: data.get("location"),
              email: data.get("email"),
            })
          );
          window.location.href = "/company-details";
          setLoading(false);
        } else {
          alert(`${val.val}`);
          setLoading(false);
        }
      });
    setLoading(false);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Company Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="companyname"
                  label="Company Name"
                  name="companyName"
                />
              </Grid>
              <Grid item xs={12}>
                <LocationSearchInput />
              </Grid>
              <Grid item xs={12}>
                <MuiPhoneNumber
                  required
                  variant="outlined"
                  id="phonenumber"
                  label="Phone Number 1"
                  name="phonenumber1"
                  fullWidth
                  defaultCountry={"ug"}
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPhoneNumber
                  required
                  variant="outlined"
                  id="phonenumber"
                  label="Phone Number 2"
                  name="phonenumber2"
                  fullWidth
                  defaultCountry={"ug"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
            </Grid>
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "green",
                ":hover": { backgroundColor: "darkgreen" },
              }}
            >
              {loading ? "Loading..." : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  className="text-green-600 hover:text-green-800"
                  to="/company-login"
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
