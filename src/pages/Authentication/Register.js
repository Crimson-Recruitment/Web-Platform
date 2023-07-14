import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import MuiPhoneNumber from "material-ui-phone-number";
import Auth from "../../Firebase/Authentication";
import uniqid from "uniqid";
import LocationSearchInput from "../../components/LocationInput";
import Cookies from "universal-cookie";

const defaultTheme = createTheme();

export default function Register() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const cookie = new Cookies();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let auth = new Auth();
    const data = new FormData(event.currentTarget);
    await auth
      .signUp(data.get("email"), data.get("password"))
      .then(async (val) => {
        if (val.code == 0) {
          cookie.set("user-login", true, { path: "/" });
          localStorage.setItem("email", data.get("email"));
          sessionStorage.setItem(
            "userData",
            JSON.stringify({
              id: uniqid(
                `${data.get("firstName")}_${data.get("lastName")}-`,
                "-user"
              ),
              firstName: data.get("firstName"),
              lastName: data.get("lastName"),
              phoneNumber: data.get("phonenumber"),
              email: data.get("email"),
              location: data.get("location"),
            })
          );
          window.location.href = "/skills";
          setLoading(false);
        } else {
          alert(`${val.val}`);
          setLoading(false);
        }
      });
    setLoading(false);
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
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPhoneNumber
                  required
                  variant="outlined"
                  id="phonenumber"
                  label="Phone Number"
                  name="phonenumber"
                  fullWidth
                  defaultCountry={"ug"}
                />
              </Grid>
              <Grid item xs={12}>
                <LocationSearchInput />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
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
                  autoComplete="new-password"
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
                  to="/login"
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
