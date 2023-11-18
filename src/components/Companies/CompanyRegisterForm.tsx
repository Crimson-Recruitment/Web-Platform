import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string, z } from "zod";
import Select from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, AutocompleteInputChangeReason, Avatar, FormControl, Grid, TextField } from "@mui/material";
import LocationSearchInput from "../LocationInput";
import MuiPhoneNumber from "material-ui-phone-number";
import { industries } from "../../Data/CompanyIndustries";
import { useDispatch, useSelector } from "react-redux";
import { StyledDropzone, StyledIcon, StyledLabel } from "../../Styles/form";

const steps = ["Contact info", "Company details", "Company Logo"];

export default function CompanyRegisterForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const company = useSelector((state: any) => state.companyRegister);
  const dispatch = useDispatch();

  const validationSchema = object({
    companyName: string().min(1, "Field is required!"),
    email: string().email("Email is invalid").min(1, "Field is required!"),
    password: string()
      .min(5, "You must enter atleast 5 characters!")
      .max(16, "You must enter at most 16 characters!")
      .min(1, "Field is required!"),
    reenter_password: string().min(1,"Field is required!"),
    location: string().min(1, "Field is required!"),
    companyType: string().min(1, "Field is required!"),
    overview: string()
    .min(300, "Enter atleast 300 characters!")
  }).refine((obj) => obj.password === obj.reenter_password, {
    message: "Passwords do not match!",
    path: ["reenter_password"],
  });

  const handleInputChange = (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    if (value.length !== 0) {
      dispatch({ type: "SET_COMPANY_TYPE", payload: value });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({type:"SET_LOGO", payload:reader.result as string})
      };
      reader.readAsDataURL(file);
    }
  };

  type SignUpSchemaType = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
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
    if (activeStep == steps.length - 1) {
      navigate("/company-home");
    }
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

  return (
    <Box sx={{ width: "80%" }}>
      <Typography
        component="h1"
        variant="h5"
        sx={{ textAlign: "center", marginBottom: "10px" }}
      >
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

      <React.Fragment>
      <Box
            component="form"
            noValidate={false}
            onSubmit={handleSubmit(onSubmitHandler)}
            sx={{ marginTop: 8 }}
          >
        {activeStep == 0 ? (
         <>
         <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="companyname"
                  label="Company Name"
                  error={!!errors["companyName"]}
                  helperText={
                    errors["companyName"] ? errors["companyName"].message : ""
                  }
                  {...register("companyName")}
                />
              </Grid>
              <Grid item xs={12}>
                <LocationSearchInput
                  
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPhoneNumber
                  required
                  onChange={() => null}
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
                  onChange={() => null}
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Re-Enter Password"
                  type="password"
                  id="reenter_password"
                  error={!!errors["reenter_password"]}
                  helperText={
                    errors["reenter_password"]
                      ? errors["reenter_password"].message
                      : ""
                  }
                  {...register("reenter_password")}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item></Grid>
            </Grid>
         </>
            
          
        ) : activeStep == 1 ? (
          <>
            <label
              htmlFor="profession"
              className="block mb-2 mt-3 text-sm font-medium text-gray-900 w-full"
            >
              Company Type
            </label>
            <FormControl fullWidth margin="normal">
                  <Autocomplete
                    id="profession"
                    options={industries}
                    getOptionLabel={(option) => option.label || ""}
                    inputValue={company.companyType?.label || ""}
                    onInputChange={handleInputChange}
                    onChange={(_, value) =>
                      dispatch({ type: "SET_COMPANY_TYPE", payload: value })
                    }
                    renderInput={(params) => (
                      <>
                        <TextField
                          {...params}
                          label="Company Type"
                          variant="outlined"
                          error={!!errors["companyType"]}
                          helperText={
                            errors["companyType"]
                              ? errors["companyType"].message
                              : ""
                          }
                          {...register("companyType")}
                        />
                      </>
                    )}
                  />
                </FormControl>
            <div className="mb-6">
              <label
                htmlFor="overview"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Company Overview
              </label>
              <TextField
                  required
                  id="overview"
                  multiline
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                  placeholder="What do you do?"
                  variant="outlined"
                  fullWidth
                  error={!!errors["overview"]}
                  helperText={
                    errors["overview"] ? errors["overview"].message : ""
                  }
                  {...register("overview")}
                />
            </div>
          </>
        ) : (
          <>
              {company.logo ? (
                <div className="flex justify-center mb-5">
                  <Avatar
                    alt="Uploaded Image"
                    src={company.logo}
                    sx={{ height: "400px", width: "400px" }}
                  />
                </div>
              ) : (
                <StyledDropzone>
                  <StyledLabel htmlFor="dropzone-file">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <StyledIcon
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        {/* ... Your SVG path */}
                      </StyledIcon>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        JPEG, PNG, or JPG (3mbs max)
                      </p>
                    </div>
                  </StyledLabel>
                </StyledDropzone>
              )}
              <input
                onChange={handleFileChange}
                required={company.logo !== null ? false:true}
                id="dropzone-file"
                type="file"
                accept=".jpeg, .png, .jpg"
                className="block mt-3 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              />
            </>
        )}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep === steps.length - 1 ? (
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              sx={{
                color: "white",
                mt: 3,
                mb: 2,
                backgroundColor: "darkred",
                ":hover": { backgroundColor: "black" },
              }}
            >
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              type="button"
              sx={{
                color: "white",
                mt: 3,
                mb: 2,
                backgroundColor: "darkred",
                ":hover": { backgroundColor: "black" },
              }}
            >
              Next
            </Button>
          )}
        </Box>
        <Link className="text-red-600 hover:text-red-800" to="/company-login">
          Already have an account? Sign in
        </Link>
      
      </Box>
      </React.Fragment>
    </Box>
  );
}
