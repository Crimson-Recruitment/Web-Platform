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
import { useForm } from "react-hook-form";
import { object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultTheme = createTheme();

export default function Register() {
  const [loading, setLoading] = React.useState(false);
  const cookie = new Cookies();

  const validationSchema = object({
    firstName: string().nonempty("Field is required!"),
    lastName: string().nonempty("Field is required!"),
    email: string().email("Email is invalid").nonempty("Field is required!"),
    password: string()
      .min(5, "You must enter atleast 5 characters!")
      .max(16, "You must enter at most 16 characters!")
      .nonempty("Field is required!"),
  });

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  React.useEffect(() => {
    if (isSubmitSuccessful) {
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler = async (values) => {
    setLoading(true);
    let auth = new Auth();
    let id = uniqid(`${values.firstName}_${values.lastName}-`, "-user");
    await auth
      .signUserUp(
        id,
        values.email,
        values.password,
        values.firstName,
        values.lastName,
        document.getElementsByName("phonenumber")[0].value,
        document.getElementsByName("location")[0].value
      )
      .then(async (val) => {
        if (val.code == 0) {
          cookie.set("user-login", true, { path: "/" });
          localStorage.setItem("userEmail", values.email);
          sessionStorage.setItem(
            "userDetails",
            JSON.stringify({
              id: id,
              firstName: values.firstName,
              lastName: values.lastName,
              phoneNumber: document.getElementsByName("phonenumber")[0].value,
              emailAddress: values.email,
              location: document.getElementsByName("location")[0].value,
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
          <Avatar sx={{ m: 1, bgcolor: "red" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            noValidate={false}
            onSubmit={handleSubmit(onSubmitHandler)}
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
                  error={
                    errors["firstName"] !== null ? errors["firstName"] : null
                  }
                  helperText={
                    errors["firstName"] ? errors["firstName"].message : ""
                  }
                  {...register("firstName")}
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
                  error={
                    errors["lastName"] !== null ? errors["lastName"] : null
                  }
                  helperText={
                    errors["lastName"] ? errors["lastName"].message : ""
                  }
                  {...register("lastName")}
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPhoneNumber
                  required={true}
                  variant="outlined"
                  id="phonenumber"
                  label="Phone Number"
                  name="phonenumber"
                  fullWidth
                  defaultCountry={"ug"}
                />
              </Grid>
              <Grid item xs={12}>
                <LocationSearchInput {...register("location")} />
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
                  error={errors["email"] !== null ? errors["email"] : null}
                  helperText={errors["email"] ? errors["email"].message : ""}
                  {...register("email")}
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
                  error={
                    errors["password"] !== null ? errors["password"] : null
                  }
                  helperText={
                    errors["password"] ? errors["password"].message : ""
                  }
                  {...register("password")}
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
                backgroundColor: "red",
                ":hover": { backgroundColor: "red" },
              }}
            >
              {loading ? "Loading..." : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  className="text-red-600 hover:text-red-800"
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
