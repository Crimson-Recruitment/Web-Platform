import { Alert, Grid, Snackbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JobsModel } from "../../../Models/JobsModel";
import "../../../Styles/jobs.css";
import ApplicationBox from "../../../components/Users/ApplicationBox";
import JobDescription from "../../../components/Users/JobDescription";
import UserJobCard from "../../../components/Users/UserJobCard";
import { getAllJobs } from "../../../core/api";
import Loader from "../../../components/Loader";

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
        <Box>
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

function ForYou() {
  const [loading, setLoading] = React.useState(true);
  const [current, setCurrent] = React.useState<number>(0);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const state = useSelector((state: any) => state.jobs);
  const dispatch = useDispatch();
  const handleDialogOpen = (index: number) => {
    setCurrent(index);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const jobHandler = (jobId: number, index: number) => {
    if (window.innerWidth < 900) {
      navigate(`/jobs/${jobId}`);
    } else {
      setCurrent(index);
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
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_JOBS_LOADING", payload: true });

        const jobArray: any[] = await getAllJobs();
        const arr = jobArray.filter((val: JobsModel) =>
          val.jobTitle
            .split(/\s+/)
            .some((word) =>
              JSON.parse(sessionStorage.getItem("user")!).jobTitle.includes(
                word,
              ),
            ),
        );
        dispatch({ type: "SET_JOBS", payload: arr });
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
          {!loading ? (
            <Loader />
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
                    dialog={() => handleDialogOpen(index)}
                    hideSalary={job.hideSalary}
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
                overview={state.jobs[current].companyOverview}
                company={state.jobs[current].companyName}
                companyId={state.jobs[current]?.company.id}
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

export default ForYou;
