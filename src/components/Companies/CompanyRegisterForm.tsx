import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Autocomplete,
  AutocompleteInputChangeReason,
  Avatar,
  FormControl,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import MuiPhoneNumber from "material-ui-phone-number";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { object, string, z } from "zod";
import { industries } from "../../Data/CompanyIndustries";
import { checkImageSize, generateRandomString } from "../../Functions/utils";
import { CompanyModel } from "../../Models/companyModel";
import { StyledDropzone, StyledIcon, StyledLabel } from "../../Styles/form";
import { companyRegister } from "../../core/api";
import LocationSearchInput from "../LocationInput";
import FirebaseStorage from "../../firebase/fileHandler";

const steps = ["Contact info", "Company details", "Company Logo"];

export default function CompanyRegisterForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const company = useSelector((state: any) => state.companyRegister);
  const location = useSelector((state: any) => state.location);
  const dispatch = useDispatch();

  const validationSchema = object({
    companyName: string().min(1, "Field is required!"),
    email: string().email("Email is invalid").min(1, "Field is required!"),
    password: string()
      .min(5, "You must enter atleast 5 characters!")
      .max(16, "You must enter at most 16 characters!")
      .min(1, "Field is required!"),
    reenter_password: string().min(1, "Field is required!"),
    website: string(),
    overview: string()
      .min(200, "Enter atleast 200 characters!")
      .max(2000, "Max limit 2000 characters!"),
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

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({ type: "SET_LOGO", payload: reader.result as string });
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
    if (company.primaryPhoneNumber === "") {
      setMessage("You haven't entered your primary phone number!");
      setOpen(true);
      setLoading(false);
      return;
    } else if (company.category === "") {
      setMessage("You haven't entered a Company type!");
      setOpen(true);
      setLoading(false);
      return;
    } else if (location.location === "") {
      setMessage("You haven't entered your location!");
      setOpen(true);
      setLoading(false);
      return;
    }
    try {
      checkImageSize(company.logo);
    } catch (e: any) {
      setMessage(e.message);
      setOpen(true);
      setLoading(false);
      return;
    }
    const base64Data = company.profileImage.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      "",
    );
    const binaryString = atob(base64Data);

    //Convert binary data to ArrayBuffer
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    let ranString = generateRandomString();

    let pic: any = await FirebaseStorage.getFileUrl(`${ranString}`, uint8Array);
    let picUrl: string = "";
    if (pic.code == 0) {
      picUrl = pic.val;
    } else {
      setMessage(pic.val.message);
      setOpen(true);
      setLoading(false);
      return;
    }
    let newValues: CompanyModel = {
      ...values,
      profileImage: picUrl,
      location: location.location,
      category: company.category.label,
      primaryPhoneNumber: company.primaryPhoneNumber,
      secondaryPhoneNumber: company.secondaryPhoneNumber,
    };
    console.log(newValues);
    let res = await companyRegister(newValues);
    if (res?.status === 200) {
      window.location.href = "/company-home";
    } else {
      let mes: string = res?.data?.message;
      setMessage(mes.slice(mes?.indexOf(":") + 1) || "Unknown error occured!");
      setOpen(true);
    }
    setLoading(false);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      navigate("/company-home");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
          {activeStep === 0 ? (
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
                  <LocationSearchInput />
                </Grid>
                <Grid item xs={12}>
                  <MuiPhoneNumber
                    required
                    variant="outlined"
                    id="phonenumber"
                    label="Primary Phone Number"
                    value={company.primaryphoneNumber}
                    onChange={(val) =>
                      dispatch({
                        type: "SET_PRIMARY_PHONENUMBER",
                        payload: val,
                      })
                    }
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
                    label="Secondary Phone Number"
                    value={company.primaryphoneNumber}
                    onChange={(val) =>
                      dispatch({
                        type: "SET_SECONDARY_PHONENUMBER",
                        payload: val,
                      })
                    }
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
          ) : activeStep === 1 ? (
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
                  inputValue={company.category?.label || ""}
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
              <div className="mb-6">
                <label
                  htmlFor="overview"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Company Website (Website URL)
                </label>
                <TextField
                  id="overview"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                  variant="outlined"
                  fullWidth
                  error={!!errors["website"]}
                  helperText={
                    errors["website"] ? errors["website"].message : ""
                  }
                  {...register("website")}
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
                required={company.logo !== null ? false : true}
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </React.Fragment>
    </Box>
  );
}
