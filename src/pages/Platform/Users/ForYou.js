import * as React from "react";
import Box from "@mui/material/Box";
import SideBar from "../../../components/Users/SideBar";
import "../../../Styles/jobs.css";
import { Alert, Grid, Button, Snackbar, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Firestore from "../../../Firebase/Firestore";
import { industryProfessions } from "../../../Data/CompanyIndustries";
import UserJobCard from "../../../components/Users/UserJobCard";
import { useNavigate } from "react-router-dom";
import { Grid as GridLoader } from "react-loader-spinner";
import JobDescription from "../../../components/Users/JobDescription";
import CardActions from "@mui/material/CardActions";
import ApplicationBox from "../../../components/Users/ApplicationBox";

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

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }

  return false;
}

function ForYou() {
  const firestore = new Firestore();
  const [jobsList, setJobsList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [current, setCurrent] = React.useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  var viewList = [];
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const jobHandler = (jobId,index) => {
    
    if (window.innerWidth <= 1080) {
        navigate(`/jobs/${jobId}`)
    } else {
      setCurrent(index)   
    }
 
}

  React.useEffect(() => {
    (async () => {
      let hasDetails = await firestore.checkUserCompletedRegistration();
      if (hasDetails.val == false) {
        setOpen(true);
        await new Promise((res) => setTimeout(res, 2000));
        navigate("/skills", { state: { notify: true } });
      }
      await firestore
        .getJobs()
        .then((val) => {
          if (val.code == 0) {
            val.val.forEach((job) => {
              if (!containsObject(job.data(), jobsList)) {
                viewList = [...viewList, { ...job.data(), id: job.id }];
              }
            });
            setJobsList(viewList);
            viewList = [];
            setLoading(false);
          } else {
            alert(val.val);
            setLoading(false);
          }
        })
        .catch((err) => {
          alert(err);
          setLoading(false);
        });
    })();
  }, []);
  return (
    <SideBar>
      <Grid container>
        <Grid className="min-h-[100vh]" item xs={12} md={5}>
          {loading ? (
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
            jobsList &&
            jobsList
              .sort((a, b) => a.timestamp < b.timestamp)
              .filter((val) => {
                if (
                  industryProfessions[val.jobField].indexOf(
                    JSON.parse(sessionStorage.getItem("userDetails")).profession
                      .label
                  ) !== -1
                ) {
                  return true;
                } else {
                  return false;
                }
              })
              .map((job, index) => {
                return (
                  <a onClick={() => jobHandler(job.id,index)}>
                    <UserJobCard
                      key={index}
                      title={job.jobTitle}
                      description={job.jobDescription}
                      timestamp={job.timestamp}
                    />
                  </a>
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
          md={6.9}
        >
          {current !== null ? (
            <>
              <JobDescription
                jobTitle={jobsList[current].jobTitle}
                overview={jobsList[current].companyOverview}
                description={jobsList[current].jobDescription}
                requirements={jobsList[current].requirements}
                skills={jobsList[current].skills}
                minSalary={jobsList[current].minSalary}
                maxSalary={jobsList[current].maxSalary}
                location={jobsList[current].location}
                type={jobsList[current].jobType}
                hideSalary={jobsList[current].hideSalary}
                benefits={jobsList[current].benefits}
              />

              <CardActions>
                <Button
                  onClick={handleDialogOpen}
                  variant="contained"
                  size="small"
                >
                  Apply
                </Button>
              </CardActions>
            </>
          ) : null}
        </Grid>
      </Grid>
      <ApplicationBox
        jobId={current !== null ? jobsList[current].id : null}
        jobName={current !== null ? jobsList[current].jobTitle : null}
        companyId={current !== null ? jobsList[current].companyId : null}
        needCoverLetter={
          current !== null ? jobsList[current].requestCoverLetter : null
        }
        isOpen={dialogOpen}
        onClose={handleDialogClose}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed to load Jobs!
        </Alert>
      </Snackbar>
    </SideBar>
  );
}

export default ForYou;
