

import { zodResolver } from "@hookform/resolvers/zod";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Alert,
    Autocomplete,
    Button,
    Card,
    CardContent,
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
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { array, object, string, z } from "zod";
import { industries, jobType } from "../../../Data/CompanyIndustries";
import { skills } from "../../../Data/UserProfessions";
import { JobsModel } from "../../../Models/JobsModel";
import LocationSearchInput from "../../../components/LocationInput";
import { getCompanyJobs, postJob, updateJob } from "../../../core/api";
import { useNavigate, useParams } from "react-router-dom";

export const EditJob = () => {
    const {id} = useParams(); 
    const [req, setReq] = React.useState("");
    const [benefit, setBenefit] = React.useState("");
    const state = useSelector((state:any) => state.editJob);
    const jobs = useSelector((state: any) => state.createJobs);
    const location = useSelector((state: any) => state.location);
    const navigate = useNavigate();
    const dispatch = useDispatch();


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
      getValues,
      setValue,
      formState: {errors, isSubmitSuccessful },
    } = useForm<SignUpSchemaType>({ resolver: zodResolver(validationSchema), defaultValues:{...jobs.jobsList.filter((val:any) => val.id == id)[0], expiryDate: new Date(jobs.jobsList.filter((val:any) => val.id == id)[0].expiryDate).toISOString()}});
    
  
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
        requestCoverLetter: state.requestCoverLetterEdit,
        hideSalary: state.hideSalaryEdit,
      };
      let res = await updateJob(job, id);
      if (res?.status == 200) {
        window.location.href = "/company-home";
      } else {
        let mes: string = res?.data?.message;
        handleClick({
          type: "error",
          message: (mes.indexOf(":") + 1).toString(),
        });
      }
      dispatch({ type: "SET_LOADING", payload: false });
    };

    useEffect(() => {
        dispatch({ type: "SET_REQUIREMENTS", payload: jobs.jobsList.filter((val:any) => val.id == id)[0].requirements });
        dispatch({type:"SET_BENEFITS", payload: jobs.jobsList.filter((val:any) => val.id == id)[0].benefits });
        dispatch({type:"SET_HIDE_SALARY_EDIT", payload: jobs.jobsList.filter((val:any) => val.id == id)[0].hideSalary});
        dispatch({type:"SET_REQUEST_COVER_LETTER_EDIT", payload: jobs.jobsList.filter((val:any) => val.id == id)[0].requestCoverLetter});
        dispatch({type:"SET_SELECTED_SKILLS", payload: skills.filter((skill) => jobs.jobsList.filter((val:any) => val.id == id)[0].skills?.includes(skill.label)) });
    },[])
    return(
        <Box sx={{ display: "flex",
        flexDirection: "column",
        alignItems: "center"}}>
              
              <Card sx={{maxWidth: "80%",
              marginTop:"10px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",}}>
              <Grid container sx={{marginTop:5, marginLeft:5}}>
            <Grid item marginBottom={5} xs={12}>
                <Button variant="contained" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h4">
            Edit Job
        </Typography>
            </Grid>
        </Grid>
            <CardContent>
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
                      inputValue={getValues().jobType}
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
                      inputValue={getValues().locationType}
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
                      inputValue={getValues().field}
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
                    value={state.selectedSkills|| []} // Replace with your actual selected values state
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
                        checked={state.hideSalaryEdit}
                        onChange={() => dispatch({ type: "SET_HIDE_SALARY_EDIT" })}
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
                        checked={state.requestCoverLetterEdit}
                        onChange={() =>
                          dispatch({ type: "SET_REQUEST_COVER_LETTER_EDIT" })
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
                {state.loading ? "Loading..." : "Submit changes"}
              </Button>
            </Box>
          </Box>
          <Snackbar open={state.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={state.message.type}
          sx={{ width: "100%" }}
        >
          {state.message.message}
        </Alert>
      </Snackbar>
        </Container>
            </CardContent>
        </Card>

        </Box>
    )
}