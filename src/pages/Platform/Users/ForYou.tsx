import { Alert, Button, Grid, Snackbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import PropTypes from "prop-types";
import * as React from "react";
import { Grid as GridLoader } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { JobsModel } from "../../../Models/JobsModel";
import "../../../Styles/jobs.css";
import ApplicationBox from "../../../components/Users/ApplicationBox";
import JobDescription from "../../../components/Users/JobDescription";
import UserJobCard from "../../../components/Users/UserJobCard";
import { jobs } from "../../../Data/DummyData";

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
  const [jobsList, setJobsList] = React.useState<Array<JobsModel>>([]);
  const [loading, setLoading] = React.useState(true);
  const [current, setCurrent] = React.useState<number>(0);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  var viewList: Array<JobsModel> = [];
  const handleDialogOpen = () => {
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
    setJobsList(jobs);
  }, []);

  return (
    <Box>
      <Grid container>
        <Grid className="min-h-[100vh]" item xs={12} md={6}>
          {!loading ? (
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
            jobsList.length != 0 &&
            jobsList
              .sort(
                (a, b) =>
                  new Date(a.timestamp).getTime() -
                  new Date(b.timestamp).getTime(),
              )
              .map((job, index) => {
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
          {jobsList.length != 0 && current !== -1 ? (
            <>
              <JobDescription
                jobTitle={jobsList[current].jobTitle}
                description={jobsList[current].jobDescription}
                requirements={jobsList[current].requirements}
                skills={jobsList[current].skills}
                minSalary={jobsList[current].minSalary}
                maxSalary={jobsList[current].maxSalary}
                location={jobsList[current].location}
                type={jobsList[current].jobType}
                hideSalary={jobsList[current].hideSalary}
                benefits={jobsList[current].benefits}
                otherDetails={jobsList[current].otherDetails}
              />
            </>
          ) : null}
        </Grid>
      </Grid>
      {jobsList.length != 0 ? (
        <ApplicationBox
          jobId={!!jobsList[current].id}
          jobName={!!jobsList[current].jobTitle}
          companyId={!!jobsList[current].companyId}
          needCoverLetter={!!jobsList[current].requestCoverLetter}
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
