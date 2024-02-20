import { zodResolver } from "@hookform/resolvers/zod";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Autocomplete,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  Switch,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { object, string, z } from "zod";
import { industries, jobType } from "../../../Data/CompanyIndustries";
import { skills } from "../../../Data/UserProfessions";
import { JobsModel } from "../../../Models/JobsModel";
import JobCard from "../../../components/Companies/JobCard";
import Loader from "../../../components/Loader";
import LocationSearchInput from "../../../components/LocationInput";
import { getCompanyJobs, postJob } from "../../../core/api";

function CustomTabPanel(props: {
  [x: string]: any;
  children: any;
  value: any;
  index: any;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, minHeight: "100vh" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CompanyJobs() {
  const [req, setReq] = React.useState("");
  const [benefit, setBenefit] = React.useState("");
  const state = useSelector((state: any) => state.createJobs);
  const location = useSelector((state: any) => state.location);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event: any, newValue: number) => {
    dispatch({ type: "SET_VALUE", payload: newValue });
  };

  const removeRequirementsHandler = (res: any) => {
    const newList = state.requirements.filter((item: any) => item !== res);
    dispatch({ type: "SET_REQUIREMENTS", payload: newList });
  };
  const removeBenefitsHandler = (res: any) => {
    const newList = state.benefits.filter((item: any) => item !== res);
    dispatch({ type: "SET_BENEFITS", payload: newList });
  };
  const handleClick = (message: { type: string; message: string }) => {
    dispatch({
      type: "SET_MESSAGE",
      payload: { type: message.type, message: message.message },
    });
    dispatch({ type: "SET_OPEN", payload: true });
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: "SET_OPEN", payload: false });
  };
  const isInteger = (val: string) => /^\d+$/.test(val);
  const validationSchema = object({
    jobTitle: string().min(1, "Field is required!"),
    jobType: string().min(1, "Field is required!"),
    jobDescription: string()
      .min(500, "Enter atleast 500 characters!")
      .max(2000, "Max limit 2000 characters!"),
    field: string().min(1, "Field is required!"),
    locationType: string().min(1, "Field is required!"),
    otherSite: string(),
    expiryDate: string()
      .min(1, "Field is required!")
      .refine((val) => {
        var start = new Date(val);
        return start > new Date();
      }, "Invalid Expiry date, Date must be in the future!"),
    minSalary: string()
      .min(1, "Field is required!")
      .refine((val) => isInteger(val), {
        message: "Must be a valid Number.",
      })
      .transform((val) => parseInt(val, 10)),

    maxSalary: string()
      .min(1, "Field is required!")
      .refine((val) => isInteger(val), {
        message: "Must be a valid Number.",
      })
      .transform((val) => parseInt(val, 10)),
    otherDetails: string(),
  }).refine((obj) => obj.minSalary < obj.maxSalary, {
    message: "Max Salary has to be more than Min Salary!",
    path: ["maxSalary"],
  });

  type SignUpSchemaType = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(validationSchema) });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });

        const jobArray = await getCompanyJobs();

        dispatch({ type: "SET_JOBLIST", payload: jobArray });
      } catch (error) {
        // Handle errors as needed
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchData();
  }, []);

  const onSubmitHandler: SubmitHandler<SignUpSchemaType> = async (values) => {
    dispatch({ type: "SET_LOADING", payload: true });
    if (state.requirements.length <= 0) {
      handleClick({
        type: "error",
        message: "Please enter atleast one job requirement!",
      });
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    } else if (state.location == "") {
      handleClick({ type: "error", message: "Please enter the job location!" });
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }
    const job: JobsModel = {
      ...values,
      skills: state.selectedSkills.map((skill: any) => skill.label),
      expiryDate: new Date(values.expiryDate).toISOString(),
      location: location.location,
      timestamp: new Date().toISOString(),
      benefits: state.benefits,
      requirements: state.requirements,
      requestCoverLetter: state.requestCoverLetter,
      hideSalary: state.hideSalary,
    };
    let res = await postJob(job);
    if (res?.status == 200) {
      window.location.reload();
    } else {
      let mes: string = res?.data?.message;
      handleClick({
        type: "error",
        message: mes,
      });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };

  const editJob = (id: any) => {
    navigate(`/edit-job/${id}`);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={state.value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Your Jobs" {...a11yProps(0)} />
          <Tab label="Create Job" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={state.value} index={0}>
        {state.loading ? (
          <Loader />
        ) : state.jobsList ? (
          state.jobsList
            .sort(
              (a: { timestamp: number }, b: { timestamp: number }) =>
                a.timestamp < b.timestamp,
            )
            .map((job: JobsModel) => {
              return (
                <JobCard
                  key={job.id!}
                  title={job.jobTitle}
                  description={job.jobDescription}
                  timestamp={new Date(job.timestamp)}
                  benefits={job.benefits}
                  minSalary={job.minSalary.toString()}
                  maxSalary={job.maxSalary.toString()}
                  location={job.location}
                  edit={() => editJob(job.id!)}
                />
              );
            })
        ) : null}
      </CustomTabPanel>
      <CustomTabPanel value={state.value} index={1}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate={true}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <label
                    htmlFor="jobTitle"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Job Title
                  </label>
                  <TextField
                    required
                    fullWidth
                    id="jobTitle"
                    label="Job Title"
                    autoFocus
                    error={!!errors["jobTitle"]}
                    helperText={
                      errors["jobTitle"] ? errors["jobTitle"].message : ""
                    }
                    {...register("jobTitle")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Job Type
                  </label>
                  <FormControl fullWidth margin="normal">
                    <Autocomplete
                      id="jobType"
                      options={jobType}
                      getOptionLabel={(option) => option.label || ""}
                      renderInput={(params) => (
                        <>
                          <TextField
                            {...params}
                            label="Job Type"
                            variant="outlined"
                            error={!!errors["jobType"]}
                            helperText={
                              errors["jobType"] ? errors["jobType"].message : ""
                            }
                            {...register("jobType")}
                          />
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <label
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Job location Type
                  </label>
                  <FormControl fullWidth margin="normal">
                    <Autocomplete
                      id="jobLocationType"
                      options={[
                        { value: "remote", label: "Remote" },
                        { value: "on_site", label: "On-site" },
                        { value: "hybrid", label: "Hybrid" },
                      ]}
                      getOptionLabel={(option) => option.label || ""}
                      renderInput={(params) => (
                        <>
                          <TextField
                            {...params}
                            label="Location Type"
                            variant="outlined"
                            error={!!errors["locationType"]}
                            helperText={
                              errors["locationType"]
                                ? errors["locationType"].message
                                : ""
                            }
                            {...register("locationType")}
                          />
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <label
                    htmlFor="field"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Job Field
                  </label>
                  <FormControl fullWidth margin="normal">
                    <Autocomplete
                      id="selectedType"
                      options={industries}
                      getOptionLabel={(option) => option.label || ""}
                      renderInput={(params) => (
                        <>
                          <TextField
                            {...params}
                            label="Job Field"
                            variant="outlined"
                            error={!!errors["field"]}
                            helperText={
                              errors["field"] ? errors["field"].message : ""
                            }
                            {...register("field")}
                          />
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <label
                    htmlFor="jobDescription"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Job Description
                  </label>
                  <TextField
                    required
                    multiline
                    fullWidth
                    rows={4}
                    maxRows={6}
                    id="jobDescription"
                    label="Job Description"
                    error={!!errors["jobDescription"]}
                    helperText={
                      errors["jobDescription"]
                        ? errors["jobDescription"].message
                        : ""
                    }
                    {...register("jobDescription")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Location
                  </label>
                  <LocationSearchInput />
                </Grid>
                <Grid item xs={12}>
                  <label
                    htmlFor="requirements"
                    className="block mb-[-5px] text-sm font-medium text-gray-900"
                  >
                    Requirements
                  </label>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    type="text"
                    id="requirements"
                    label="Requirements"
                    name="requirements"
                    autoComplete=""
                    value={req}
                    onChange={(e) => setReq(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "darkred",
                      ":hover": { backgroundColor: "black" },
                    }}
                    onClick={() => {
                      if (req != "") {
                        dispatch({
                          type: "SET_REQUIREMENTS",
                          payload: [...state.requirements, req],
                        });
                        setReq("");
                      }
                    }}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid xs={12}>
                  <List>
                    {state.requirements &&
                      state.requirements.map((req: string, index: number) => {
                        return (
                          <ListItem
                            key={index}
                            secondaryAction={
                              <IconButton
                                onClick={() => removeRequirementsHandler(req)}
                                edge="end"
                                aria-label="delete"
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                            disablePadding
                          >
                            <ListItemButton>
                              <ListItemText primary={req} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <label
                    htmlFor="expirydate"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Expiry Date
                  </label>
                  <TextField
                    fullWidth
                    type="datetime-local"
                    margin="normal"
                    variant="outlined"
                    error={!!errors["expiryDate"]}
                    helperText={
                      errors["expiryDate"] ? errors["expiryDate"].message : ""
                    }
                    {...register("expiryDate")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label
                    htmlFor="skills"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Skills (Not needed for non-programming jobs)
                  </label>
                  <Autocomplete
                    multiple
                    id="skills"
                    options={skills}
                    getOptionLabel={(option) => option.label || ""}
                    value={state.selectedSkills} // Replace with your actual selected values state
                    onChange={(_, values) =>
                      dispatch({ type: "SET_SELECTED_SKILLS", payload: values })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Skills"
                        variant="outlined"
                      />
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
                <Grid item xs={12} sm={6}>
                  <label
                    htmlFor="minSalary"
                    className="block mt-4 text-sm font-medium text-gray-900"
                  >
                    Min Salary in USD (Annual)
                  </label>
                  <TextField
                    type="text"
                    required
                    fullWidth
                    id="minSalary"
                    label="Min Salary"
                    autoFocus
                    error={!!errors["minSalary"]}
                    helperText={
                      errors["minSalary"] ? errors["minSalary"].message : ""
                    }
                    {...register("minSalary")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label
                    htmlFor="maxSalary"
                    className="block mt-4 text-sm font-medium text-gray-900"
                  >
                    Max Salary in USD (Annual)
                  </label>
                  <TextField
                    required
                    type="text"
                    fullWidth
                    id="maxSalary"
                    label="Max Salary"
                    autoFocus
                    error={!!errors["maxSalary"]}
                    helperText={
                      errors["maxSalary"] ? errors["maxSalary"].message : ""
                    }
                    {...register("maxSalary")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.hideSalary}
                        onChange={() => dispatch({ type: "SET_HIDE_SALARY" })}
                        name="hideSalary"
                      />
                    }
                    label={`Hide Salary?`}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label
                    htmlFor="benefits"
                    className="block mt-4 mb-[-5px] text-sm font-medium text-gray-900"
                  >
                    Benefits
                  </label>
                </Grid>

                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    type="text"
                    id="benefits"
                    label="Benefits"
                    name="benefits"
                    value={benefit}
                    onChange={(val) => setBenefit(val.target.value)}
                    autoComplete=""
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "darkred",
                      ":hover": { backgroundColor: "black" },
                    }}
                    onClick={() => {
                      if (benefit != "") {
                        dispatch({
                          type: "SET_BENEFITS",
                          payload: [...state.benefits, benefit],
                        });
                        setBenefit("");
                      }
                    }}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <List>
                    {state.benefits &&
                      state.benefits.map((req: string, index: number) => {
                        return (
                          <ListItem
                            key={index}
                            secondaryAction={
                              <IconButton
                                onClick={() => removeBenefitsHandler(req)}
                                edge="end"
                                aria-label="delete"
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                            disablePadding
                          >
                            <ListItemButton>
                              <ListItemText primary={req} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.redirectToOtherWebsite}
                        onChange={() =>
                          dispatch({ type: "SET_REDIRECT_TO_OTHER_WEBSITE" })
                        }
                        name="redirectToOtherWebsite"
                      />
                    }
                    label={`Redirect to another website?`}
                  />
                </Grid>
                <Grid
                  sx={{
                    display: state.redirectToOtherWebsite ? "block" : "none",
                  }}
                  xs={12}
                  item
                >
                  <label
                    htmlFor="otherSite"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Other website URL
                  </label>
                  <TextField
                    fullWidth
                    type="text"
                    margin="normal"
                    variant="outlined"
                    error={!!errors["otherSite"]}
                    helperText={
                      errors["otherSite"] ? errors["otherSite"].message : ""
                    }
                    {...register("otherSite")}
                  />
                </Grid>
                <Grid
                  sx={{
                    display: state.redirectToOtherWebsite ? "none" : "block",
                  }}
                  item
                  xs={12}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.requestCoverLetter}
                        onChange={() =>
                          dispatch({ type: "SET_REQUEST_COVER_LETTER" })
                        }
                        name="requestCoverLetter"
                      />
                    }
                    label={`Request for a cover letter?`}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label
                    htmlFor="overview"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Incase of any other details.
                  </label>
                  <TextField
                    required
                    id="otherDetails"
                    multiline
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                    variant="outlined"
                    fullWidth
                    error={!!errors["otherDetails"]}
                    helperText={
                      errors["otherDetails"]
                        ? errors["otherDetails"].message
                        : ""
                    }
                    {...register("otherDetails")}
                  />
                </Grid>
              </Grid>
              <Button
                disabled={state.loading}
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
                {state.loading ? "Loading..." : "Create Job"}
              </Button>
            </Box>
          </Box>
        </Container>
      </CustomTabPanel>
      <Snackbar open={state.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={state.message.type}
          sx={{ width: "100%" }}
        >
          {state.message.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CompanyJobs;
