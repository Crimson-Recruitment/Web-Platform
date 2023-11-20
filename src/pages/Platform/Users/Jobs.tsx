import { Alert, Box, Button, Grid, Snackbar } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import * as React from "react";
import { Grid as GridLoader } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { JobsModel } from "../../../Models/JobsModel";
import "../../../Styles/jobs.css";
import ApplicationBox from "../../../components/Users/ApplicationBox";
import JobDescription from "../../../components/Users/JobDescription";
import UserJobCard from "../../../components/Users/UserJobCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../../../core/api";

function Jobs() {
  const [current, setCurrent] = React.useState<number>(0);
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

  const handleDialogOpen = () => {
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
  return (
    <Box>
      <Grid container>
        <Grid className="min-h-[100vh]" item xs={12} md={6}>
          <Box className="search-box">
            <input type="text" placeholder="Search..." />
            <Button type="submit">
              <i className="fas fa-search"></i>
            </Button>
          </Box>
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
          ) : (
            state.jobs.length != 0 &&
            state.jobs
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
                    dialog={handleDialogOpen}
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
          {state.jobs.length != 0 && current !== -1 ? (
            <>
              <JobDescription
                jobTitle={state.jobs[current].jobTitle}
                description={state.jobs[current].jobDescription}
                requirements={state.jobs[current].requirements}
                skills={state.jobs[current].skills}
                minSalary={state.jobs[current].minSalary}
                maxSalary={state.jobs[current].maxSalary}
                location={state.jobs[current].location}
                type={state.jobs[current].jobType}
                hideSalary={state.jobs[current].hideSalary}
                benefits={state.jobs[current].benefits}
                otherDetails={state.jobs[current].otherDetails}
              />
            </>
          ) : null}
        </Grid>
      </Grid>
      {state.jobs.length != 0 ? (
        <ApplicationBox
          jobId={!!state.jobs[current].id}
          jobName={!!state.jobs[current].jobTitle}
          companyId={!!state.jobs[current].companyId}
          needCoverLetter={!!state.jobs[current].requestCoverLetter}
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
