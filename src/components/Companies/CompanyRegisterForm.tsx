import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, TextField } from '@mui/material';
import LocationSearchInput from '../LocationInput';
import MuiPhoneNumber from 'material-ui-phone-number';


 const steps = ['Contact info', 'Company details'];

export default function CompanyRegisterForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
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


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
 
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  

  return (
    <Box sx={{ width: '80%' }}>
            <Typography component="h1" variant="h5" sx={{textAlign:"center", marginBottom:"10px"}}>
                 Company Register
               </Typography>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep == 0? 
             
               <Box
                 component="form"
                 noValidate={false}
                 onSubmit={handleSubmit(onSubmitHandler)}
                 sx={{marginTop:8}}
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
                       error={!!errors["password"]}
                       helperText={
                         errors["password"] ? errors["password"].message : ""
                       }
                       {...register("password")}
                       id="password"
                     />
                   </Grid>
                 </Grid>
                 {/* <Button
                   disabled={loading}
                   type="submit"
                   fullWidth
                   variant="contained"
                   sx={{
                     mt: 3,
                     mb: 2,
                     backgroundColor: "darkred",
                     ":hover": { backgroundColor: "black" },
                   }}
                 >
                   {loading ? "Loading..." : "Sign Up"}
                 </Button> */}
                 <Grid container justifyContent="flex-end">
                   <Grid item>
                   </Grid>
                 </Grid>
                 
               </Box>
             :
          <Typography sx={{ mt: 2, mb: 1 }}>
            Bye!
            </Typography>}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
          <Link className="text-red-600 hover:text-red-800" to="/company-login">
            Already have an account? Sign in
          </Link>
        </React.Fragment>
      )}
    </Box>
  );
} 
