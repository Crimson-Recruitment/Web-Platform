import {
  Alert,
  Autocomplete,
  AutocompleteInputChangeReason,
  Avatar,
  Box,
  Checkbox,
  FormLabel,
  List,
  ListItemButton,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import MuiPhoneNumber from "material-ui-phone-number";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LocationSearchInput from "../../../components/LocationInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { StyledDropzone, StyledIcon, StyledLabel } from "../../../Styles/form";
import { professionList, skills } from "../../../Data/UserProfessions";
import { checkDocumentSize, checkImageSize } from "../../../Functions/utils";
import { updateUser } from "../../../core/userApi";
import { UserUpdateModel } from "../../../Models/UserUpdateModel";

const Settings = () => {
  const [tabValue, setTabValue] = React.useState("account");
  const user = useSelector((state: any) => state.userRegister);
  const location = useSelector((state: any) => state.location);
  const dispatch = useDispatch();
  const profile = JSON.parse(sessionStorage.getItem("user")!);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const validationSchema = object({
    firstName: string().min(1, "Field is required!"),
    lastName: string().min(1, "Field is required!"),
    email: string().email("Email is invalid!"),
    bio: string()
    .min(200, "Enter atleast 200 characters!")
    .max(2000, "Max characters reached!"),
  })
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

  const handleInputChange = (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    if (value.length !== 0) {
      dispatch({ type: "SET_PROFESSION", payload: value });
    }
  };

  type SignUpSchemaType = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(validationSchema) });

  const handleTabChange = (event: any, newValue: string) => {
    setTabValue(newValue);
  };

  const onSubmitHandler:SubmitHandler<SignUpSchemaType> =async (values) => {
    console.log(user.profession);
    if (user.phoneNumber == "") {
      setMessage("You haven't entered your phone number!");
      setOpen(true);
      setLoading(false);
      return;
    } else if (user.profession == null) {
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
    } catch (e: any) {
      setMessage(e.message);
      setOpen(true);
    }
    let val :UserUpdateModel = {...values,skills:user.skills.map((skill: any) => skill.label), location:location.location, profileImage:"image", jobTitle:user.profession.label,phoneNumber:user.phoneNumber};
    let res = await updateUser(val);
    if(res.result == "success") {
      navigate(0);
    }
    sessionStorage.setItem("user",JSON.stringify(res.user))
    setMessage("Couldn't update user, try again later!");
      setOpen(true);
      setLoading(false);
   
  }

  const manageViews = (value: string) => {
    switch (value) {
      case "account":
        return (
          <Card
            sx={{
              width: { xs: "80vw", md: "100%" },
              bgcolor: "background.paper",
            }}
            style={{
              marginBottom: "1.5rem",
              boxShadow: "0 1px 15px 1px rgba(52,40,104,.08)",
            }}
          >
            <CardHeader title="Public info" />
            <CardContent>
              <Box component="form" noValidate={true} onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={5}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                <>
              {user.profileImage ? (
                <div className="flex justify-center mb-5">
                  <Avatar
                    alt="Uploaded Image"
                    src={user.profileImage}
                    sx={{ height: "200px", width: "200px" }}
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
                    </Box>
                  </Grid>
                  <Grid item md={7}>
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
                            errors["firstName"]
                              ? errors["firstName"].message
                              : ""
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
                <Grid item xs={12}>
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
                      </Grid>
              
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
                          helperText={
                            errors["email"] ? errors["email"].message : ""
                          }
                          {...register("email")}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormLabel htmlFor="about">About</FormLabel>
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
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "0.5rem" }}
                >
                  Save changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
      case "password":
        return (
          <Card
            sx={{
              width: { xs: "80vw", md: "100%" },
              bgcolor: "background.paper",
            }}
            style={{
              marginBottom: "1.5rem",
              boxShadow: "0 1px 15px 1px rgba(52,40,104,.08)",
            }}
          >
            <CardHeader title="Password" />
            <CardContent>
              <Box component="form">
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="inputPasswordCurrent">
                    Current password
                  </InputLabel>
                  <Input id="inputPasswordCurrent" type="password" />
                  <Grid item xs>
                    <Link to="*">Forgot password?</Link>
                  </Grid>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="inputPasswordNew">
                    New password
                  </InputLabel>
                  <Input id="inputPasswordNew" type="password" />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="inputPasswordNew2">
                    Verify password
                  </InputLabel>
                  <Input id="inputPasswordNew2" type="password" />
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "0.5rem" }}
                >
                  Save changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
      case "privacy":
        return (
          <Card
            sx={{
              width: { xs: "80vw", md: "100%" },
              bgcolor: "background.paper",
            }}
            style={{
              marginBottom: "1.5rem",
              boxShadow: "0 1px 15px 1px rgba(52,40,104,.08)",
            }}
          >
            <CardHeader title="Notification Settings" />
            <CardContent>
              <form>
                <FormControl fullWidth margin="normal">
                  <List component="nav" aria-labelledby="nested-list-subheader">
                    <ListItemButton>
                      <ListItemText primary="Privacy Policy" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="Terms & Conditions" />
                    </ListItemButton>
                  </List>
                  <Typography>
                    <Switch name="notifications" /> Enable Notifications{" "}
                  </Typography>
                  <Grid item xs></Grid>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginTop: "0.5rem" }}
                >
                  Save changes
                </Button>
              </form>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        marginTop: "20px",
        background: "#FAFAFA",
        minHeight: "70vh",
        boxShadow: "0 1px 15px 1px rgba(52,40,104,.08)",
      }}
    >
      <Grid
        container
        xs={12}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Tab label="Account" value="account" />
          <Tab label="Change Password" value="password" />
          <Tab label="Privacy Settings" value="privacy" />
        </Tabs>
      </Grid>
      <Typography
        variant="h4"
        gutterBottom
        style={{ marginBottom: "1.5rem", marginLeft: "1.5rem" }}
      >
        Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={5} xl={4}>
          <Card
            sx={{ display: { xs: "none", md: "block" } }}
            style={{
              marginBottom: "1.5rem",
              boxShadow: "0 1px 15px 1px rgba(52,40,104,.08)",
            }}
          >
            <CardHeader title="Profile Settings" />
            <div className="list-group list-group-flush" role="tablist">
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                orientation="vertical"
              >
                <Tab label="Account" value="account" />
                <Tab label="Change Password" value="password" />
                <Tab label="Privacy Settings" value="privacy" />
              </Tabs>
            </div>
          </Card>
        </Grid>
        <Grid item md={7} xl={8}>
          <div className="tab-content">{manageViews(tabValue)}</div>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings;
