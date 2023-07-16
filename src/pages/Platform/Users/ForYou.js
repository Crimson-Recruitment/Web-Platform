import * as React from "react";
import Box from "@mui/material/Box";
import SideBar from "../../../components/SideBar";
import "../../../Styles/jobs.css";
import { Grid, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Firestore from "../../../Firebase/Firestore";
import { industryProfessions } from "../../../Data/CompanyIndustries";
import UserJobCard from "../../../components/UserJobCard";
import { useNavigate } from "react-router-dom";

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

  React.useEffect(() => {
    (async () => {
      let hasDetails = await firestore.checkUserEmail(
        localStorage.getItem("email")
      );
      if (hasDetails.val == true) {
        navigate("/skills", { state: { notify: true } });
      } else {
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
      <Grid container>
        <Grid className="min-h-[100vh]" item xs={12} md={5}>
          {jobsList &&
            jobsList
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

export default ForYou;
