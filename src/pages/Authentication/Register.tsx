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
import LocationSearchInput from "../../components/LocationInput";
import Cookies from "universal-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string, z } from "zod";
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
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(validationSchema) });
  
  type SignUpSchemaType = z.infer<typeof validationSchema>;

  React.useEffect(() => {
    if (isSubmitSuccessful) {
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<SignUpSchemaType> = async (values) => {
    setLoading(true);
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
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={
                    !!errors["firstName"]
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
                  error={
                    !!errors["lastName"]
                  }
                  helperText={
                    errors["lastName"] ? errors["lastName"].message : ""
                  }
                  {...register("lastName")}
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPhoneNumber
                  onChange={() => null}
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
                <LocationSearchInput />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  error={!!errors["email"]}
                  helperText={errors["email"] ? errors["email"].message : ""}
                  {...register("email")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  error={
                    !errors["password"]
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
