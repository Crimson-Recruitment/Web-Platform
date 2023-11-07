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
import Select from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Grid, TextField } from '@mui/material';
import LocationSearchInput from '../LocationInput';
import MuiPhoneNumber from 'material-ui-phone-number';
import { industries } from '../../Data/CompanyIndustries';


 const steps = ['Contact info', 'Company details', "Company Logo"];

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
             : activeStep == 1 ? 
             <>
              <label
            htmlFor="profession"
            className="block mb-2 mt-3 text-sm font-medium text-gray-900 w-full"
          >
            Company Type
          </label>
          <Select
            required
            className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            options={industries}
            placeholder="Healthcare, technology,....."
          />
        <div className="mb-6">
          <label
            htmlFor="overview"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Company Overview
          </label>
          <textarea
            required
            id="overview"
            name="overview"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
            placeholder="About the company"
          ></textarea>
        </div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Is your company licensed?
        </label>
        <div className="flex items-center pl-4 border border-gray-200 rounded">
          <input
            required
            checked
            id="bordered-radio-1"
            type="radio"
            value={"true"}
            name="bordered-radio"
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
          />
          <label
            htmlFor="bordered-radio-1"
            className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
          >
            Yes
          </label>
        </div>
        <div className="flex items-center pl-4 border border-gray-200 rounded">
          <input
            required
            id="bordered-radio-2"
            type="radio"
            value={"false"}
            name="bordered-radio"
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 "
          />
          <label
            htmlFor="bordered-radio-2"
            className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
          >
            No
          </label>
        </div>

             </>:
          <>
            <label
            htmlFor="dropzone-file"
            className="block mb-2 mt-3 text-sm font-medium text-gray-900 w-full"
          >
            Company Logo
          </label>
          {false ? (
            <div className="flex justify-center mb-5">
              <Avatar
                alt="Logo"
                sx={{ height: "400px", width: "400px" }}
              />
            </div>
          ) : (
            <div className="flex mt-5 items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag
                    and drop Company Logo.
                  </p>
                  <p className="text-xs text-gray-500">
                    JPEG, PNG, or JPG
                  </p>
                </div>
              </label>
            </div>
          )}
          <input
            required
            id="dropzone-file"
            type="file"
            accept=".jpeg, .png, .jpg"
            className="block mt-3 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          />
          </>}
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
