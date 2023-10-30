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
import Cookies from "universal-cookie";
import LocationSearchInput from "../../components/LocationInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterForm from '../../components/RegisterForm';

export default function CompanyRegister() {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const validationSchema = object({
    companyName: string().nonempty("Field is required!"),
    email: string().email("Email is invalid").nonempty("Field is required!"),
    password: string()
      .min(5, "You must enter atleast 5 characters!")
      .max(16, "You must enter at most 16 characters!")
      .nonempty("Field is required!"),
  });

  type SignUpSchemaType = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(validationSchema) });

  React.useEffect(() => {
    if (isSubmitSuccessful) {
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<SignUpSchemaType> = async (values) => {
    setLoading(true);
    setLoading(false);
  };
  //const steps = ['SIGN UP', 'CONTINUE', 'FINISH'];

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
        <Avatar sx={{ m: 1, bgcolor: "red" }}>
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
                error={
                  !!errors["companyName"]
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
                onChange={()=> null}
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
                onChange={()=> null}
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
                error={!!errors["email"]}
                helperText={errors["email"] ? errors["email"].message : ""}
                {...register("email")}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                error={!errors["password"]}
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
              backgroundColor: "red",
              ":hover": { backgroundColor: "darkred" },
            }}
          >
            {loading ? "Loading..." : "Sign Up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                className="text-red-600 hover:text-red-800"
                to="/company-login"
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
