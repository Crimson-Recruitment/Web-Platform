import * as React from "react";
import SideBar from "../../../components/SideBar";
import "../../../Styles/jobs.css";
import { Alert, Box, Button, Grid, Snackbar } from "@mui/material";
import Firestore from "../../../Firebase/Firestore";
import UserJobCard from "../../../components/UserJobCard";
import { useNavigate } from "react-router-dom";
import { Grid as GridLoader } from "react-loader-spinner";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
              if (containsObject(job.data(), jobsList) == false) {
                setJobsList([...jobsList, job.data()]);
              }
            });
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
            jobsList.map((job, index) => {
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
            <Card
              sx={{ margin: "10px", paddingX: "5px", paddingY: "3px" }}
              variant="outlined"
            >
              {
                <>
                  <CardContent>
                    <Typography variant="h4" color="text.black" gutterBottom>
                      {jobsList[current].jobTitle}
                    </Typography>
                    <Typography variant="h5" component="div">
                      Company Overview
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {jobsList[current].companyOverview}
                    </Typography>
                    <Typography variant="h5" component="div">
                      Job Description
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {jobsList[current].jobDescription}
                    </Typography>
                    <Typography variant="h5" component="div">
                      Required Skills and Qualifications
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <ul>
                        {jobsList[current].requirements.map((req) => {
                          return <li>{req}</li>;
                        })}
                      </ul>
                    </Typography>
                    {jobsList[current].skills.length != 0 ? (
                      <>
                        <Typography variant="h5" component="div">
                          Skills
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          <ul>
                            {jobsList[current].skills.map((skill) => {
                              return <li>{skill.label}</li>;
                            })}
                          </ul>
                        </Typography>
                      </>
                    ) : null}
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" size="small">
                      Apply
                    </Button>
                  </CardActions>
                </>
              }
            </Card>
          ) : null}
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed to load Jobs!
        </Alert>
      </Snackbar>
    </SideBar>
  );
}

export default Jobs;
