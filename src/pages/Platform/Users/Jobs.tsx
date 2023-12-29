import { Search } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { industries, jobType } from "../../../Data/CompanyIndustries";
import { JobsModel } from "../../../Models/JobsModel";
import "../../../Styles/jobs.css";
import Loader from "../../../components/Loader";
import ApplicationBox from "../../../components/Users/ApplicationBox";
import JobDescription from "../../../components/Users/JobDescription";
import UserJobCard from "../../../components/Users/UserJobCard";
import { getAllJobs } from "../../../core/api";

function Jobs() {
  const [current, setCurrent] = React.useState<number>(0);
  const [search, setSearch] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("None");
  const [jobTimeType, setJobTimeType] = React.useState<string>("None");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean | undefined>();
  const state = useSelector((state: any) => state.jobs);
  const dispatch = useDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const jobHandler = (jobId: number, index: number) => {
    if (window.innerWidth < 900) {
      navigate(`/jobs/${jobId}`);
    } else {
      setCurrent(index);
    }
  };
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = (index: number) => {
    setCurrent(index);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_JOBS_LOADING", payload: true });

        const jobArray = await getAllJobs();
        console.log(jobArray);

        dispatch({ type: "SET_JOBS", payload: jobArray });
      } catch (error) {
        // Handle errors as needed
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "SET_JOBS_LOADING", payload: false });
      }
    };

    fetchData();
  }, []);

  const filteredJobs = state.jobs.filter(
    (val: JobsModel) =>
      val.jobTitle.includes(search) &&
      (jobTimeType !== "None"
        ? val.jobType.replace(/\s+/g, "_").toLowerCase() ===
          jobTimeType.toLowerCase()
        : true) &&
      (category !== "None"
        ? val.field.replace(/\s+/g, "_").toLowerCase() ===
          category.toLowerCase()
        : true),
  );

  const currentJob = filteredJobs[current];
  return (
    <Box>
      <Grid container>
        <Grid className="min-h-[100vh]" item xs={12} md={6}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box className="search-box m-3">
                <input
                  type="text"
                  id="search"
                  placeholder="Search..."
                  onChange={(val) => setSearch(val.target.value)}
                />
                <Button
                  type="button"
                  onClick={() => {
                    let ser: any = document.getElementById("search");
                    setSearch(ser?.value);
                  }}
                >
                  <Search />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ marginTop: "10px" }}>
                    <InputLabel
                      sx={{ marginLeft: { xs: "20px" } }}
                      id="demo-simple-select-label"
                    >
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      placeholder="Category..."
                      value={category}
                      sx={{ marginX: { xs: "20px" } }}
                      label="Age"
                      onChange={(val) => setCategory(val.target.value)}
                    >
                      {industries.map((val: any) => {
                        return (
                          <MenuItem value={val.value}>{val.label}</MenuItem>
                        );
                      })}
                      <MenuItem value="None">None</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ marginTop: "10px" }}>
                    <InputLabel
                      sx={{ marginLeft: { xs: "20px" } }}
                      id="demo-simple-select-label"
                    >
                      Job Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      placeholder="Category..."
                      value={jobTimeType}
                      sx={{ marginX: { xs: "20px" } }}
                      label="Job Type"
                      onChange={(val) => {
                        setJobTimeType(val.target.value);
                        console.log(val.target.value);
                      }}
                    >
                      {jobType.map((val: any) => {
                        return (
                          <MenuItem value={val.value}>{val.label}</MenuItem>
                        );
                      })}
                      <MenuItem value="None">None</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {state.loading ? (
            <Loader />
          ) : (
            state.jobs.length !== 0 &&
            filteredJobs
              .sort(
                (a: any, b: any) =>
                  new Date(a.timestamp).getTime() -
                  new Date(b.timestamp).getTime(),
              )
              .map((job: JobsModel, index: number) => {
                return (
                  <UserJobCard
                    key={index}
                    title={job.jobTitle}
                    description={job.jobDescription}
                    timestamp={new Date(job.timestamp)}
                    benefits={job.benefits}
                    maxSalary={job.maxSalary.toString()}
                    minSalary={job.minSalary.toString()}
                    location={job.location}
                    hideSalary={job.hideSalary}
                    dialog={() => handleDialogOpen(index)}
                    otherSite={job.otherSite}
                    more={() => jobHandler(job.id!, index)}
                  />
                );
              })
          )}
        </Grid>
        <Grid item sx={{ display: { md: "block", xs: "none" } }} md={0.1}>
          <div className="d-flex" style={{ height: "100vh" }}>
            <div className="vr"></div>
          </div>
        </Grid>
        <Grid
          item
          sx={{
            display: {
              md: "block",
              xs: "none",
              "& h2": { fontWeight: "bold" },
              "& h3": { fontWeight: "bolder" },
            },
          }}
          md={5.9}
        >
          {filteredJobs.length > 0 ? (
            <>
              <JobDescription
                jobTitle={currentJob.jobTitle}
                description={currentJob.jobDescription}
                requirements={currentJob.requirements}
                skills={currentJob.skills}
                minSalary={currentJob.minSalary}
                maxSalary={currentJob.maxSalary}
                location={currentJob.location}
                overview={currentJob.company.overview}
                company={currentJob.company.companyName}
                companyId={currentJob.company.id}
                type={currentJob.jobType}
                hideSalary={currentJob.hideSalary}
                benefits={currentJob.benefits}
                otherDetails={currentJob.otherDetails}
              />
            </>
          ) : null}
        </Grid>
      </Grid>
      {state.jobs.length !== 0 ? (
        <ApplicationBox
          jobId={state.jobs[current].id}
          jobName={state.jobs[current].jobTitle}
          companyId={state.jobs[current].companyId}
          needCoverLetter={state.jobs[current].requestCoverLetter}
          isOpen={dialogOpen}
          onClose={handleDialogClose}
        />
      ) : null}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed to load Jobs!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Jobs;
