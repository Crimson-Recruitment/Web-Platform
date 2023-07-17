import * as React from "react";
import SideBar from "../../../components/SideBar";
import "../../../Styles/jobs.css";
import { Alert, Box, Button, Grid, Snackbar } from "@mui/material";
import Firestore from "../../../Firebase/Firestore";
import UserJobCard from "../../../components/UserJobCard";
import { useNavigate } from "react-router-dom";
import { Grid as GridLoader } from "react-loader-spinner";
import CardActions from "@mui/material/CardActions";
import JobDescription from "../../../components/JobDescription";
import ApplicationBox from "../../../components/ApplicationBox";

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }

  return false;
}

function Jobs() {
  const firestore = new Firestore();
  const [jobsList, setJobsList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [current, setCurrent] = React.useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState();
  var viewList = [];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  React.useEffect(() => {
    (async () => {
      let email = localStorage.getItem("email");
      let hasDetails = await firestore.checkUserEmail(
        localStorage.getItem("email")
      );
      if (hasDetails.val == true) {
        setOpen(true);
      } else {
        await firestore.getUserDetails(email).then((user) => {
          if (user.code == 0) {
            if (sessionStorage.getItem("userDetails") != null) {
              setLoading(false);
              return;
            }
            sessionStorage.setItem(
              "userDetails",
              JSON.stringify(user.val.data())
            );
            setLoading(false);
          } else {
            alert(user.val);
            setLoading(false);
          }
        });
        await firestore.getJobs().then((val) => {
          if (val.code == 0) {
            val.val.forEach((job) => {
              console.log(job.data());
              if (containsObject(job.data(), jobsList) == false) {
                viewList = [...viewList, job.data()];
              }
            });
            setJobsList(viewList);
            viewList = [];
            setLoading(false);
          } else {
            alert(val.val);
            setLoading(false);
          }
        });
      }
    })();
  }, []);

  return (
    <SideBar>
      <Grid container padding="0px">
        <Grid className="min-h-[100vh]" item xs={12} lg={5}>
          <Box className="search-box">
            <input type="text" placeholder="Search..." />
            <Button type="submit">
              <i className="fas fa-search"></i>
            </Button>
          </Box>
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
            jobsList.sort((a,b) => a.timestamp < b.timestamp).map((job, index) => {
              return (
                <a onClick={() => setCurrent(index)}>
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
          <div className="d-flex" style={{ minHeight: "100vh" }}>
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
          xs={false}
          sm={false}
          md={false}
          lg={6.9}
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
                <Button onClick={handleDialogOpen} variant="contained" size="small">
                  Apply
                </Button>
              </CardActions>
            </>
          ) : null}
        </Grid>
      </Grid>
      <ApplicationBox needCoverLetter={current !== null ? jobsList[current].requestCoverLetter : null} open={dialogOpen} onClose={handleDialogClose}/>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed to load Jobs!
        </Alert>
      </Snackbar>
    </SideBar>
  );
}

export default Jobs;
