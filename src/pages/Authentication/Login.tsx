import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { object, string, z } from "zod";
import { Bg1 } from "../../Data/Images";

export default function Login() {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const validationSchema = object({
    email: string().nonempty("Field is required!"),
    password: string().nonempty("Field is required!"),
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

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const cookie = new Cookies();

  const onSubmitHandler: SubmitHandler<SignUpSchemaType> = async (values) => {
    setLoading(true);
    setLoading(false);
    }

  return (
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
              autoComplete="email"
              error={!!errors["email"]}
              helperText={errors["email"] ? errors["email"].message : ""}
              {...register("email")}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              error={!!errors["password"]}
              helperText={errors["password"] ? errors["password"].message : ""}
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
              sx={{ mt: 3, mb: 2,  backgroundColor: "darkred",
              ":hover": { backgroundColor: "black" } }}
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
                  borderColor: "darkred",
                  color: "darkred",
                  ":hover": {
                    color: "white",
                    backgroundColor: "black",
                    borderColor: "black",
                  },
                }}
              >
                I'm a Recruiter
              </Button>
            </Link>
            <Grid container>
              <Grid item xs>
                <Link to="*">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        component="img"
        src={Bg1}
        xs={false}
        sm={false}
        md={8}
        sx={{
          objectFit: "cover",
          objectPosition: "center",
          height:"90vh",
          display: { xs: 'none', md: 'block' }
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
