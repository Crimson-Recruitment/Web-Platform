import * as React from "react";
import SideBar from "../../../components/SideBar";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import "../../../Styles/jobs.css";
import { Box, Button, Grid } from "@mui/material";
import Firestore from "../../../Firebase/Firestore";
import UserJobCard from "../../../components/UserJobCard";
import { useNavigate } from "react-router-dom";

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

  React.useEffect(() => {
    (async () => {
      let email = localStorage.getItem("email");
      let hasDetails = await firestore.checkUserEmail(
        localStorage.getItem("email")
      );
      if (hasDetails.val == true) {
        navigate("/skills", { state: { notify: true } });
      } else {
        await firestore
          .getUserDetails(email)
          .then((user) => {
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
          })
          .catch((err) => {
            alert(err);
            setLoading(false);
          });
        await firestore
          .getJobs()
          .then((val) => {
            if (val.code == 0) {
              val.val.forEach((job) => {
                if (!containsObject(job.data(), jobsList)) {
                  setJobsList([...jobsList, job.data()]);
                }
              });
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
          {jobsList &&
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
            })}
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
            <div className="job-description">
              <h2>{jobsList[current].jobTitle}</h2>
              <h4>Company Overview</h4>
              <p>{jobsList[current].companyOverview}</p>
              <h4>Job Description</h4>
              {jobsList[current].jobDescription}

              <h4>Required Skills and Qualifications</h4>
              <ul>
                {jobsList[current].requirements.map((req) => {
                  return <li>{req}</li>;
                })}
              </ul>
              <ul>
                {jobsList[current].skills.length != 0 ? (
                  <>
                    <h4>Skills</h4>
                    {jobsList[current].skills.map((skill) => {
                      return <li>{skill.label}</li>;
                    })}
                  </>
                ) : null}
              </ul>
            </div>
          ) : null}
        </Grid>
      </Grid>
    </SideBar>
  );
}

export default Jobs;
