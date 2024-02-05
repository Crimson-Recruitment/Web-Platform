import { zodResolver } from "@hookform/resolvers/zod";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Alert,
  Autocomplete,
  AutocompleteInputChangeReason,
  Avatar,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
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
import { ZodError, object, string, z } from "zod";
import { professionList, skills } from "../../Data/UserProfessions";
import {
  checkDocumentSize,
  checkImageSize,
  fileToUint8Array,
  generateRandomString,
} from "../../Functions/utils";
import { userModel } from "../../Models/UserModel";
import { StyledDropzone, StyledIcon, StyledLabel } from "../../Styles/form";
import { userRegister } from "../../core/api";
import FirebaseStorage from "../../firebase/fileHandler";
import LocationSearchInput from "../LocationInput";

const steps = ["Contact info", "User details", "Profile Image"];

export default function UserRegisterForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state: any) => state.userRegister);
  const location = useSelector((state: any) => state.location);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    if (value.length !== 0) {
      dispatch({ type: "SET_PROFESSION", payload: value });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({
          type: "SET_PROFILE_IMAGE",
          payload: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const validationSchema = object({
    firstName: string().min(1, "Field is required!"),
    lastName: string().min(1, "Field is required!"),
    email: string().email("Email is invalid!").min(1, "Field is required!"),
    password: string()
      .min(5, "You must enter atleast 5 characters!")
      .max(16, "You must enter at most 16 characters!"),
    reenter_password: string().min(1, "Field is required!"),
    bio: string()
      .min(200, "Enter atleast 200 characters!")
      .max(2000, "Max characters reached!"),
  }).refine((obj) => obj.password === obj.reenter_password, {
    message: "Passwords do not match!",
    path: ["reenter_password"],
  });

  type SignUpSchemaType = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(validationSchema) });

  const handleNext = (val: any) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleZodError = (error: ZodError) => {
    // Your custom logic to display or log the error message
    console.error("ZodError:", error.errors);
  };

  const onSubmitHandler: SubmitHandler<SignUpSchemaType> = async (values) => {
    try {
      // Your async form submission logic
    } catch (error) {
      if (error instanceof ZodError) {
        handleZodError(error);
      } else {
        console.error("Unexpected error:", error);
      }
    }
    setLoading(true);
    if (user.phoneNumber == "") {
      setMessage("You haven't entered your phone number!");
      setOpen(true);
      setLoading(false);
      return;
    } else if (user.cv == null) {
      setMessage("You haven't uploaded as resume!");
      setOpen(true);
      setLoading(false);
      return;
    } else if (user.profession == "") {
      setMessage("You haven't entered your profession!");
      setOpen(true);
      setLoading(false);
      return;
    } else if (location.location == "") {
      setMessage("You haven't entered your location!");
      setOpen(true);
      setLoading(false);
      return;
    }
    try {
      checkImageSize(user.profileImage);
      checkDocumentSize(user.cv);
    } catch (e: any) {
      setMessage(e.message);
      setOpen(true);
      setLoading(false);
      return;
    }
    const base64Data = user.profileImage.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      "",
    );

    const binaryString = atob(base64Data);

    // Convert binary data to ArrayBuffer
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    let resumeUintArray: Uint8Array = await fileToUint8Array(user.cv);

    let ranString = generateRandomString();

    let pic: any = await FirebaseStorage.getFileUrl(`${ranString}`, uint8Array);
    let picUrl: string = "";
    if (pic.code == 0) {
      picUrl = pic.val;
    } else {
      //setMessage(pic.val.message);
      setOpen(true);
      setLoading(false);
      return;
    }

    let resVal: any = await FirebaseStorage.getFileUrl(
      `${ranString}-resume`,
      resumeUintArray,
    );
    let resUrl: string = "";
    if (resVal.code == 0) {
      resUrl = resVal.val;
    } else {
      setMessage(resVal.val.message);
      setOpen(true);
      setLoading(false);
      return;
    }

    let newValues: userModel = {
      ...values,
      profileImage: picUrl,
      cv: resUrl,
      jobTitle: user.profession.label,
      skills: user.skills.map((skill: any) => skill.label),
      location: location.location,
      phoneNumber: user.phoneNumber,
      hash: ranString,
    };
    let res = await userRegister(newValues);
    if (res?.status == 200) {
      window.location.href = "/user-home";
    } else {
      let mes: string = res?.data?.message;
      setMessage(mes?.slice(mes.indexOf(":") + 1) || "Unknown error occured!");
      setOpen(true);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ width: "80%" }}>
      <Typography
        component="h1"
        variant="h5"
        sx={{ textAlign: "center", marginBottom: "10px" }}
      >
        Register
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    error={!!errors["firstName"]}
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
                    error={!!errors["lastName"]}
                    helperText={
                      errors["lastName"] ? errors["lastName"].message : ""
                    }
                    {...register("lastName")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MuiPhoneNumber
                    required={true}
                    value={user.phoneNumber}
                    onChange={(val) =>
                      dispatch({ type: "SET_PHONENUMBER", payload: val })
                    }
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
                    error={!!errors["password"]}
                    helperText={
                      errors["password"] ? errors["password"].message : ""
                    }
                    {...register("password")}
                    autoComplete="new-password"
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
            <form className="w-full">
              <div className="mb-6 mt-3">
                <FormLabel sx={{ color: "black" }}>Profession</FormLabel>
                <FormControl fullWidth margin="normal">
                  <Autocomplete
                    id="profession"
                    options={professionList}
                    getOptionLabel={(option) => option.label || ""}
                    inputValue={user.profession?.label || ""}
                    onInputChange={handleInputChange}
                    onChange={(_, value) =>
                      dispatch({ type: "SET_PROFESSION", payload: value })
                    }
                    renderInput={(params) => (
                      <>
                        <TextField
                          {...params}
                          label="Profession"
                          variant="outlined"
                        />
                      </>
                    )}
                  />
                </FormControl>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="about"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  About you
                </label>
                <TextField
                  required
                  id="about"
                  multiline
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                  placeholder="Describe yourself,..."
                  variant="outlined"
                  fullWidth
                  error={!!errors["bio"]}
                  helperText={errors["bio"] ? errors["bio"].message : ""}
                  {...register("bio")}
                />
              </div>
              <label
                htmlFor="skills"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Select your prominent skills (6 max).
              </label>
              <Autocomplete
                multiple
                id="skills"
                options={skills}
                getOptionLabel={(option) => option.label || ""}
                value={user.skills} // Replace with your actual selected values state
                onChange={(_, values) =>
                  dispatch({ type: "SET_SKILLS", payload: values })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Skills" variant="outlined" />
                )}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.label}
                  </li>
                )}
              />

              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="file_input"
              >
                Upload you Resume (max size 2mbs)
              </label>
              <Box>
                <InputLabel htmlFor="file-input">Choose File</InputLabel>
                <Input
                  id="resume"
                  type="file"
                  inputProps={{
                    accept: ".pdf",
                  }}
                  onChange={(val: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: "SET_RESUME",
                      payload: val.target.files?.[0],
                    })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        color="primary"
                        aria-label="attach file"
                        component="span"
                      ></IconButton>
                    </InputAdornment>
                  }
                />
                {user.cv != null ? (
                  <Box mt={2}>
                    <Box
                      mt={2}
                      display="flex"
                      alignItems="center"
                      color="green"
                    >
                      <CheckCircleIcon
                        fontSize="small"
                        sx={{ marginRight: 1 }}
                      />
                      <Typography variant="body2">
                        Document "{user.cv.name}" submitted successfully!
                      </Typography>
                    </Box>
                  </Box>
                ) : null}
              </Box>
            </form>
          ) : (
            <>
              {user.profileImage ? (
                <div className="flex justify-center mb-5">
                  <Avatar
                    alt="Uploaded Image"
                    src={user.profileImage}
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
                required={user.profileImage !== null ? false : true}
                id="dropzone-file"
                type="file"
                accept=".jpeg, .png, .jpg"
                className="block mt-3 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              />
            </>
          )}
          <Typography
            style={{
              marginTop: "10px",
              backgroundColor:
                errors.firstName ||
                errors.lastName ||
                errors.email ||
                errors.bio ||
                errors.password ||
                errors.reenter_password
                  ? "#FFEBEB"
                  : "white", // Pale red background
              color: "#FF0000", // Red font color
              padding: "8px",
              borderRadius: "4px",
            }}
          >
            {errors["firstName"] ? (
              <pre>
                {"Error in form! \nFirstName: " + errors["firstName"].message}
              </pre>
            ) : (
              ""
            )}
            {errors["lastName"] ? (
              <pre>
                {"Error in form! \nLastName: " + errors["lastName"].message}
              </pre>
            ) : (
              ""
            )}
            {errors["bio"] ? (
              <pre>{"Error in form! \nBio: " + errors["bio"].message}</pre>
            ) : (
              ""
            )}
            {errors["password"] ? (
              <pre>
                {"Error in form! \nPassword: " + errors["password"].message}
              </pre>
            ) : (
              ""
            )}
            {errors["email"] ? (
              <pre>{"Error in form! \nEmail: " + errors["email"].message}</pre>
            ) : (
              ""
            )}
            {errors["reenter_password"] ? (
              <pre>
                {"Error in form! \nRe-enter Password: " +
                  errors["reenter_password"].message}
              </pre>
            ) : (
              ""
            )}
          </Typography>
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
                onClick={(val) => {
                  console.log(errors);
                  handleNext(val);
                }}
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
          <Link className="text-red-600 hover:text-red-800" to="/login">
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
