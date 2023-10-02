import React, { useEffect, useReducer, useState } from "react";
import CompanySideBar from "../../../components/Companies/CompanySideBar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Grid,
  Button,
  CssBaseline,
  TextField,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Snackbar,
  Alert,
  FormControlLabel,
  Switch,
} from "@mui/material";
import LocationSearchInput from "../../../components/LocationInput";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { skills } from "../../../Data/UserProfessions";
import Select from "react-select";
import { industries, jobType } from "../../../Data/CompanyIndustries";
import Firestore from "../../../Firebase/Firestore";
import JobCard from "../../../components/Companies/JobCard";
import { companyJobsReducer } from "../../../Functions/Reducers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Grid as GridLoader } from "react-loader-spinner";

function CustomTabPanel(props) {
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

let initState = {
  requirements: [],
  benefits: [],
  loading: true,
  selectedSkills: null,
  selectedType: null,
  jobsList: [],
  open: false,
  value: 0,
  jobType: null,
  jobLocationType: null,
  message: { type: null, message: null },
};

function CompanyJobs() {
  const [state, dispatch] = useReducer(companyJobsReducer, initState);

  const dateHandler = (date = expiryDate) => {
    if (date.getTime() <= new Date().getTime()) {
      throw Error("Invalid Date, please enter a date in the future!");
    } else {
      setExpiryDate(date);
    }
  };

  const handleChange = (event, newValue) => {
    dispatch({ type: "SETVALUE", value: newValue });
  };
  const navigate = useNavigate();

  const removeRequirementsHandler = (res) => {
    const newList = state.requirements.filter((item) => item !== res);
    dispatch({ type: "SETREQUIREMENTS", requirements: newList });
  };
  const removeBenefitsHandler = (res) => {
    const newList = state.benefits.filter((item) => item !== res);
    dispatch({ type: "SETBENEFITS", benefits: newList });
  };
  const handleClick = (message) => {
    dispatch({
      type: "SETMESSAGE",
      message: { type: message.type, message: message.message },
    });
    dispatch({ type: "SETOPEN", open: true });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: "SETOPEN", open: false });
  };

  const firestore = new Firestore();
  const [expiryDate, setExpiryDate] = useState(new Date());
  var viewList = [];

  useEffect(() => {
    (async () => {
      let email = localStorage.getItem("companyEmail");
      if (sessionStorage.getItem("companyDetails") === null) {
        await firestore.getCompanyDetails(email).then(async (user) => {
          if (user.code == 0) {
            sessionStorage.setItem(
              "companyDetails",
              JSON.stringify(user.val.data())
            );
            sessionStorage.setItem("companyId", user.val.id);
            let hasDetails =
              await firestore.checkCompanyCompletedRegistration();
            if (hasDetails.val == false) {
              handleClick({ type: "error", message: "Failed to load jobs!" });
              await new Promise((res) => setTimeout(res, 2000));
              navigate("/company-details", { state: { notify: true } });
            } else {
              await firestore
                .getCompanyJobPosts(sessionStorage.getItem("companyId"))
                .then((val) => {
                  if (val.code == 0) {
                    val.val.forEach((job) => {
                      viewList = [...viewList, job.data()];
                    });
                    console.log(viewList);
                    dispatch({ type: "SETJOBSLIST", jobsList: viewList });
                    viewList = [];
                    dispatch({ type: "SETLOADING", loading: false });
                  } else {
                    handleClick({ type: "error", message: val.val });
                    dispatch({ type: "SETLOADING", loading: false });
                  }
                });
            }
          } else {
            handleClick({ type: "error", message: user.val });
          }
        });
      } else {
        let hasDetails = await firestore.checkCompanyCompletedRegistration();
        if (hasDetails.val == false) {
          handleClick({ type: "error", message: "Failed to load jobs!" });
          await new Promise((res) => setTimeout(res, 2000));
          navigate("/company-details", { state: { notify: true } });
        } else {
          await firestore
            .getCompanyJobPosts(sessionStorage.getItem("companyId"))
            .then((val) => {
              if (val.code == 0) {
                val.val.forEach((job) => {
                  viewList = [...viewList, job.data()];
                });
                console.log(viewList);
                dispatch({ type: "SETJOBSLIST", jobsList: viewList });
                viewList = [];
                dispatch({ type: "SETLOADING", loading: false });
              } else {
                handleClick({ type: "error", message: val.val });
                dispatch({ type: "SETLOADING", loading: false });
              }
            });
        }
      }
    })();
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    dispatch({ type: "SETLOADING", loading: true });
    await firestore
      .createJobPost(
        data.get("jobTitle"),
        state.selectedType,
        data.get("jobDescription"),
        data.get("isVolunteer"),
        state.jobType,
        state.jobLocationType,
        data.get("location"),
        state.requirements,
        state.selectedSkills,
        data.get("minSalary"),
        data.get("maxSalary"),
        state.benefits,
        data.get("hideSalary"),
        data.get("requestCoverLetter"),
        expiryDate,
        new Date().getTime(),
        data.get("otherDetails")
      )
      .then(async (val) => {
        if (val.code == 0) {
          handleClick({
            type: "success",
            message: "Successfully added Job Post!",
          });
          await new Promise((res) => setTimeout(res, 2000));
          dispatch({ type: "SETLOADING", loading: false });
          navigate(0);
        } else {
          handleClick({ type: "error", message: val.val });
          dispatch({ type: "SETLOADING", loading: false });
        }
      });
  };

  return (
    <CompanySideBar>
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
          <div className="flex justify-center mt-12">
            <GridLoader
              height="130"
              width="130"
              color="#4fa94d"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : state.jobsList ? (
          state.jobsList
            .sort((a, b) => a.timestamp < b.timestamp)
            .map((job) => {
              return (
                <JobCard
                  title={job.jobTitle}
                  description={job.jobDescription}
                  timestamp={job.timestamp}
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
              onSubmit={onSubmitHandler}
              noValidate={false}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <label
                    for="jobTitle"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Job Title
                  </label>
                  <TextField
                    name="jobTitle"
                    required
                    fullWidth
                    id="jobTitle"
                    label="Job Title"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <label
                    for="type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Job Type
                  </label>
                  <Select
                    required
                    className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    options={jobType}
                    placeholder="Select the type of job."
                    onChange={(val) => {
                      dispatch({
                        type: "SETJOBTYPE",
                        jobType: val.label,
                      });
                    }}
                    value={jobType.filter(function (option) {
                      return option.label === state.jobType;
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch name="isVolunteer" />}
                    label="Is this a volunteering job or a non-volunteering job?"
                  />
                </Grid>
                <Grid item xs={12}>
                  <label
                    for="type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Job location Type
                  </label>
                  <Select
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    options={[
                      { value: "remote", label: "Remote" },
                      { value: "on_site", label: "On-site" },
                      { value: "hybrid", label: "Hybrid" },
                    ]}
                    placeholder="Select the type of job."
                    onChange={(val) => {
                      dispatch({
                        type: "SETJOBLOCATIONTYPE",
                        jobLocationType: val.label,
                      });
                    }}
                    value={[
                      { value: "remote", label: "Remote" },
                      { value: "on_site", label: "On-site" },
                      { value: "hybrid", label: "Hybrid" },
                    ].filter(function (option) {
                      return option.label === state.jobLocationType;
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label
                    for="field"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Job Field
                  </label>
                  <Select
                    required
                    className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    options={industries}
                    name="field"
                    placeholder="Healthcare, technology,....."
                    onChange={(val) => {
                      dispatch({
                        type: "SETSELECTEDTYPE",
                        selectedType: val.label,
                      });
                    }}
                    value={industries.filter(function (option) {
                      return option.label === state.selectedType;
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label
                    for="jobDescription"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                    name="jobDescription"
                  />
                </Grid>
                <Grid item xs={12}>
                  <label
                    for="location"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Location
                  </label>
                  <LocationSearchInput />
                </Grid>
                <Grid item xs={12}>
                  <label
                    for="requirements"
                    className="block mb-[-5px] text-sm font-medium text-gray-900 dark:text-white"
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
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                      ":hover": { backgroundColor: "darkgreen" },
                    }}
                    onClick={() => {
                      if (
                        document.getElementsByName("requirements")[0].value !=
                        ""
                      ) {
                        dispatch({
                          type: "SETREQUIREMENTS",
                          requirements: [
                            ...state.requirements,
                            document.getElementsByName("requirements")[0].value,
                          ],
                        });
                        document.getElementsByName("requirements")[0].value =
                          "";
                      }
                    }}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid xs={12}>
                  <List>
                    {state.requirements != []
                      ? state.requirements.map((req, index) => {
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
                        })
                      : null}
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <label
                    for="expirydate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Expiry Date
                  </label>
                  <DatePicker
                    required
                    className="border mb-4 border-blue-300"
                    selected={expiryDate}
                    onChange={(date) => {
                      try {
                        dateHandler(date);
                      } catch (error) {
                        handleClick({ type: "error", message: error.message });
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label
                    for="skills"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Skills (Not needed for non-programming jobs)
                  </label>
                  <Select
                    className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    options={skills}
                    placeholder="Select skills,..."
                    name="skills"
                    onChange={(val) => {
                      if (val.length <= 6) {
                        dispatch({
                          type: "SETSELECTEDSKILLS",
                          selectedSkills: val,
                        });
                      } else {
                        handleClick({
                          type: "error",
                          message: "Max number of skills Added!",
                        });
                      }
                    }}
                    isSearchable={true}
                    value={state.selectedSkills}
                    isMulti
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label
                    for="minSalary"
                    className="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Min Salary in USD (Annual)
                  </label>
                  <TextField
                    name="minSalary"
                    type="text"
                    required
                    fullWidth
                    id="minSalary"
                    label="Min Salary"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label
                    for="maxSalary"
                    className="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Max Salary in USD (Annual)
                  </label>
                  <TextField
                    name="maxSalary"
                    required
                    type="text"
                    fullWidth
                    id="maxSalary"
                    label="Max Salary"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch name="hideSalary" />}
                    label="Hide Salary on the job post?"
                  />
                </Grid>
                <Grid item xs={12}>
                  <label
                    for="benefits"
                    className="block mt-4 mb-[-5px] text-sm font-medium text-gray-900 dark:text-white"
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
                    autoComplete=""
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                      ":hover": { backgroundColor: "darkgreen" },
                    }}
                    onClick={() => {
                      if (
                        document.getElementsByName("benefits")[0].value != ""
                      ) {
                        dispatch({
                          type: "SETBENEFITS",
                          benefits: [
                            ...state.benefits,
                            document.getElementsByName("benefits")[0].value,
                          ],
                        });
                        document.getElementsByName("benefits")[0].value = "";
                      }
                    }}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <List>
                    {state.benefits != []
                      ? state.benefits.map((req, index) => {
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
                        })
                      : null}
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch name="requestCoverLetter" />}
                    label="Request for a cover letter ?"
                  />
                </Grid>
                <Grid item xs={12}>
                  <label
                    for="overview"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Incase of any other details.
                  </label>
                  <textarea
                    id="otherDetails"
                    name="otherDetails"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  ></textarea>
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
                  backgroundColor: "green",
                  ":hover": { backgroundColor: "darkgreen" },
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
    </CompanySideBar>
  );
}

export default CompanyJobs;
