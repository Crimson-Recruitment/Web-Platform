import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Button,
  Container,
  CssBaseline,
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
import React, { useEffect, useReducer, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Grid as GridLoader } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { industries, jobType } from "../../../Data/CompanyIndustries";
import { skills } from "../../../Data/UserProfessions";
import { companyJobsReducer } from "../../../Functions/Reducers";
import JobCard from "../../../components/Companies/JobCard";
import LocationSearchInput from "../../../components/LocationInput";
import { JobsModel } from "../../../Models/JobsModel";
import { jobs } from "../../../Data/DummyData";

function CustomTabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) {
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

let initState = {
  requirements: [],
  benefits: [],
  loading: false,
  selectedSkills: null,
  selectedType: null,
  jobsList: jobs,
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

  const handleChange = (event: any, newValue: any) => {
    dispatch({ type: "SETVALUE", value: newValue });
  };
  const navigate = useNavigate();

  const removeRequirementsHandler = (res: any) => {
    const newList = state.requirements.filter((item: any) => item !== res);
    dispatch({ type: "SETREQUIREMENTS", requirements: newList });
  };
  const removeBenefitsHandler = (res: any) => {
    const newList = state.benefits.filter((item: any) => item !== res);
    dispatch({ type: "SETBENEFITS", benefits: newList });
  };
  const handleClick = (message: { type: any; message: any; }) => {
    dispatch({
      type: "SETMESSAGE",
      message: { type: message.type, message: message.message },
    });
    dispatch({ type: "SETOPEN", open: true });
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: "SETOPEN", open: false });
  };

  const [expiryDate, setExpiryDate] = useState(new Date());
  var viewList: any[] = [];

  useEffect(() => {
    dispatch({type:"SETJOBLIST", jobsList:jobs});
  }, []);

  const onSubmitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    
  };

  const editJob = () => {

  }

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
            .sort((a: { timestamp: number; }, b: { timestamp: number; }) => a.timestamp < b.timestamp)
            .map((job: JobsModel) => {
              return (
                <JobCard
                key={job.id}
                  title={job.jobTitle}
                  description={job.jobDescription}
                  timestamp={job.timestamp}
                  benefits={job.benefits}
                  minSalary={job.minSalary}
                  maxSalary={job.maxSalary}
                  location={job.location}
                  edit={editJob}
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
                    htmlFor="jobTitle"
                    className="block mb-2 text-sm font-medium text-gray-900"
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
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Job Type
                  </label>
                  <Select
                    required
                    className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    options={jobType}
                    placeholder="Select the type of job."
                    onChange={(val: { label: any; }|null) => {
                      dispatch({
                        type: "SETJOBTYPE",
                        jobType: val?.label,
                      });
                    }}
                    value={jobType.filter(function (option) {
                      return option.label === state.jobType;
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Job location Type
                  </label>
                  <Select
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    options={[
                      { value: "remote", label: "Remote" },
                      { value: "on_site", label: "On-site" },
                      { value: "hybrid", label: "Hybrid" },
                    ]}
                    placeholder="Select the type of job."
                    onChange={(val: { label: string, value:string }|null) => {
                      dispatch({
                        type: "SETJOBLOCATIONTYPE",
                        jobLocationType: val?.label,
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
                    htmlFor="field"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Job Field
                  </label>
                  <Select
                    required
                    className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    options={industries}
                    name="field"
                    placeholder="Healthcare, technology,....."
                    onChange={(val: { label: any; }|null) => {
                      dispatch({
                        type: "SETSELECTEDTYPE",
                        selectedType: val?.label,
                      });
                    }}
                    value={industries.filter(function (option) {
                      return option.label === state.selectedType;
                    })}
                  />
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
                    name="jobDescription"
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
                      if (
                        document.getElementsByName("requirements")[0].innerHTML !=
                        ""
                      ) {
                        dispatch({
                          type: "SETREQUIREMENTS",
                          requirements: [
                            ...state.requirements,
                            document.getElementsByName("requirements")[0].innerHTML,
                          ],
                        });
                        document.getElementsByName("requirements")[0].innerHTML =
                          "";
                      }
                    }}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid xs={12}>
                  <List>
                    {state.requirements &&
                       state.requirements.map((req: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => {
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
                    }
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <label
                    htmlFor="expirydate"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Expiry Date
                  </label>
                  <DatePicker
                    required
                    className="border mb-4 border-blue-300"
                    selected={expiryDate}
                    onChange={(date: Date | undefined|null) => {
                      try {
                        dateHandler(date!);
                      } catch (error: any) {
                        handleClick({ type: "error", message: error.message });
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label
                    htmlFor="skills"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Skills (Not needed for non-programming jobs)
                  </label>
                  <Select
                    className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    options={skills}
                    placeholder="Select skills,..."
                    name="skills"
                    onChange={(val: string | any |null) => {
                      if (val?.length <= 6) {
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
                    htmlFor="minSalary"
                    className="block mt-4 text-sm font-medium text-gray-900"
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
                    htmlFor="maxSalary"
                    className="block mt-4 text-sm font-medium text-gray-900"
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
                    
                    }}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <List>
                    {state.benefits &&
                       state.benefits.map((req: string, index:number) => {
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
                      }
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
                    htmlFor="overview"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Incase of any other details.
                  </label>
                  <textarea
                    id="otherDetails"
                    name="otherDetails"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
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
