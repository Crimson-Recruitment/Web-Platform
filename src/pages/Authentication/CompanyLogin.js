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
import Firestore from "../../Firebase/Firestore";
import { Alert, Snackbar } from "@mui/material";
import { useForm } from "react-hook-form";
import { object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultTheme = createTheme();
export default function CompanyLogin() {
  const [loading, setLoading] = React.useState(false);
  const cookie = new Cookies();
  const firestore = new Firestore();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleClick = () => {
    setOpen(true);
  };

  const validationSchema = object({
    email: string().nonempty("Field is required!"),
    password: string().nonempty("Field is required!"),
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const onSubmitHandler = async (values) => {
    setLoading(true);
    let isUser = await firestore.checkUserEmail(values.email);
    if (isUser.val == true) {
      let auth = new Auth();
      await auth
        .signIn(values.email, values.password)
        .then((val) => {
          if (val.code == 0) {
            cookie.set("company-login", true, { path: "/" });
            localStorage.setItem("companyEmail", values.email);
            window.location.href = "/company-jobs";
            setLoading(false);
          } else {
            setMessage(`${val.code} : ${val.val}`);
            handleClick();
            setLoading(false);
          }
        })
        .catch((err) => {
          setMessage(err);
          handleClick();
          setLoading(false);
        });
    } else {
      setMessage("Error on authentication!");
      handleClick();
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ minHeight: { lg: "90vh" } }}>
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
              onSubmit={handleSubmit(onSubmitHandler)}
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
                error={errors["email"] !== null ? errors["email"] : null}
                helperText={errors["email"] ? errors["email"].message : ""}
                {...register("email")}
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
                error={errors["password"] !== null ? errors["password"] : null}
                helperText={
                  errors["password"] ? errors["password"].message : ""
                }
                {...register("password")}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? "Loading..." : "Sign In"}
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
            backgroundImage: "url(./images/login2.png)",
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
