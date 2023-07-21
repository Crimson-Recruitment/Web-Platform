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
import { useForm } from "react-hook-form";
import { object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CompanyRegister() {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  let auth = new Auth();

  const validationSchema = object({
    companyName: string().nonempty("Field is required!"),
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
    let id = uniqid(`${values.companyName}-`, "-company");
    await auth
      .signCompanyUp(
        id,
        values.companyName,
        document.getElementsByName("phonenumber1")[0].value,
        document.getElementsByName("phonenumber2")[0].value,
        values.email,
        values.password,
        document.getElementsByName("location")[0].value
      )
      .then(async (val) => {
        if (val.code == 0) {
          cookie.set("company-login", true, { path: "/" });
          localStorage.setItem("companyEmail", values.email);
          sessionStorage.setItem(
            "companyDetails",
            JSON.stringify({
              id: id,
              companyName: values.companyName,
              phoneNumber1: document.getElementsByName("phonenumber1")[0].value,
              phoneNumber2: document.getElementsByName("phonenumber2")[0].value,
              location: document.getElementsByName("location")[0].value,
              emailAddress: values.email,
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
  };

  return (
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
          noValidate={false}
          onSubmit={handleSubmit(onSubmitHandler)}
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
                error={
                  errors["companyName"] !== null ? errors["companyName"] : null
                }
                helperText={
                  errors["companyName"] ? errors["companyName"].message : ""
                }
                {...register("companyName")}
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
                error={errors["email"] !== null ? errors["email"] : null}
                helperText={errors["email"] ? errors["email"].message : ""}
                {...register("email")}
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
                error={errors["password"] !== null ? errors["password"] : null}
                helperText={
                  errors["password"] ? errors["password"].message : ""
                }
                {...register("password")}
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
  );
}
