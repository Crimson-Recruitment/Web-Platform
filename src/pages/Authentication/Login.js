import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Auth from "../../Firebase/Authentication";
import Cookies from "universal-cookie";
import { firestore } from "../../Firebase/FirebaseConfig";
import Firestore from "../../Firebase/Firestore";
import { Alert, Snackbar } from "@mui/material";
import { useForm} from 'react-hook-form';
import { object, string} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Login() {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };


  const validationSchema = object({
    email: string().nonempty("Field is required!"),
    password: string().nonempty("Field is required!")
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

  const cookie = new Cookies();
  const firestore = new Firestore();


  const onSubmitHandler = async (values) => {
    setLoading(true);
    const isCompany = await firestore.checkCompanyEmail(values.email);
    if (isCompany.val == true) {
      let auth = new Auth();
      await auth
        .signIn(values.email, values.password)
        .then((val) => {
          if (val.code == 0) {
            cookie.set("user-login", true, { path: "/" });
            localStorage.setItem("userEmail", values.email);
            window.location.href = "/jobs";
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
          <Avatar sx={{ m: 1, bgcolor: "darkgreen" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              error={errors['email'] !== null? errors["email"]:null}
              helperText={errors['email'] ? errors['email'].message : ''}
              {...register('email')}
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
              error={errors['password'] !== null? errors["password"]:null}
              helperText={errors['password'] ? errors['password'].message : ''}
              {...register('password')}
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
            <Link to="/company-login">
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{
                  mb: 2,
                  backgroundColor: "white",
                  borderColor: "green",
                  color: "green",
                  ":hover": {
                    color: "white",
                    backgroundColor: "darkgreen",
                    borderColor: "darkgreen",
                  },
                }}
              >
                I'm a Recruiter
              </Button>
            </Link>
            <Grid container>
              <Grid item xs>
                <Link to="" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
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
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
