import React, { useEffect, useState } from "react";
import CompanySideBar from "../../../components/Companies/CompanySideBar";
import CompanyApplicationCard from "../../../components/Companies/CompanyApplicationCard";
import "flowbite/dist/flowbite.min.js";
import Firestore from "../../../Firebase/Firestore";
import { Grid as GridLoader } from "react-loader-spinner";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Grid, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { clientId } from "../../../Functions/GoogleCalendar";
import { gapi } from "gapi-script";

function CompanyApplications() {
  const firestore = new Firestore();
  var applicationList = [];
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [calendarAccess, setCalendarAccess] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState({ message: "", severity: "" });
  const [open, setOpen] = React.useState();

  gapi.load("client:auth2", () => gapi.client.init({
    clientId: clientId,
    scope: "openid email profile https://www.googleapis.com/auth/calendar",
    plugin_name: "calendar",
  }));
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const expandedHandler = (index) => {
    if (expanded == index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  const handleGoogleAuth = (obj) => {
    if (obj.code !== null) {
      setCalendarAccess(true)
    } else if (obj.error !== null) {
      setMessage({ message: obj.error, severity: "error" });
    }
  };

  const updateHandler = async (applicationId, status) => {
    await firestore
      .updateApplication(applicationId, status)
      .then(async (val) => {
        if (val.code == 0) {
          setMessage({
            message: "Successfully updated application status!",
            severity: "success",
          });
          setOpen(true);
          await new Promise((res) => setTimeout(res, 2000));
          navigate(0);
        } else {
          console.log(val);
          setMessage({ severity: "error", message: val.val });
          setOpen(true);
        }
      });
  };

  useEffect(() => {
    (async () => {
      let hasDetails = await firestore.checkCompanyCompletedRegistration();
      if (hasDetails.val == false) {
        setMessage({
          message: "Failed to load Applications!",
          severity: "error",
        });
        setOpen(true);
        await new Promise((res) => setTimeout(res, 2000));
        navigate("/company-details", { state: { notify: true } });
      } else {
        await firestore.getCompanyApplications().then(async (val) => {
          if (val.code == 0) {
            val.val.forEach((application) => {
              applicationList = [
                ...applicationList,
                { ...application.data(), id: application.id },
              ];
            });
            setApplications(applicationList);
            applicationList = [];
            setLoading(false);
          } else {
            setMessage({ message: val.val, severity: "error" });
            setOpen(true);
            setLoading(false);
          }
        });
      }
    })();
  }, []);
  return (
    <CompanySideBar>
      <div className="xs:min-h-[120vh]  min-h-[120vh] ms-2">
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
        ) : applicationList !== null ? (
          <>
            {applications.map((application, index) => {
              return (
                <div role="button" onClick={() => expandedHandler(index)}>
                  <CompanyApplicationCard
                    applicant={application.fullNames}
                    timeOfApplication={application.timeOfApplication}
                    jobName={application.jobName}
                    applicationStatus={application.applicationStatus}
                  />
                  <Grid
                    sx={
                      index === expanded
                        ? {
                            minHeight: "30vh",
                            maxHeight: { xs: "70vh", md: "35vh" },
                            width: "75%",
                            transition: "all 0.2s",
                            borderRadius: "5px",
                            border: "1px solid lightgray",
                            overflow: "scroll",
                            backgroundColor: "white",
                          }
                        : {
                            minHeight: "0vh",
                            maxHeight: { xs: "70vh", md: "35vh" },
                            width: "75%",
                            transition: "all 0.2s",
                            borderRadius: "5px",
                            overflow: "scroll",
                            zIndex: "10px",
                            backgroundColor: "white",
                          }
                    }
                  >
                    {index === expanded ? (
                      <Grid
                        container
                        gap={2}
                        sx={{ padding: "10px", overflow: "hidden" }}
                      >
                        <Grid item xs={12} md={4} fullwidth>
                          <Typography variant="h6">Full Name:</Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {application.fullNames}
                          </Typography>
                          <Typography variant="h6">Job Title:</Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {application.jobName}
                          </Typography>
                          <Typography variant="h6">Link to Profile</Typography>

                          <Button
                            onClick={() => {
                              window.open(
                                `/user-view/${application.userId}`,
                                "_blank"
                              );
                            }}
                          >
                            Check out Profile
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={7} fullwidth>
                          <Typography variant="h6">
                            Download Resume:{" "}
                            <small>
                              (This automatically starts the review process)
                            </small>
                          </Typography>

                          <Button
                            onClick={() => {
                              window.open(
                                `${application.resume}.pdf`,
                                "_blank"
                              );
                              updateHandler(application.id, "Reviewing");
                            }}
                          >
                            Download Resume
                          </Button>
                          {application.coverLetter != "" ? (
                            <>
                              <Typography variant="h6">Cover Letter</Typography>
                              <Typography
                                sx={{ mb: 1.5 }}
                                color="text.secondary"
                              >
                                {application.coverLetter}
                              </Typography>
                            </>
                          ) : null}
                        </Grid>
                        <Button
                          onClick={() =>
                            updateHandler(application.id, "Success")
                          }
                          variant="contained"
                          color="success"
                        >
                          Recruit
                        </Button>
                        {calendarAccess ?
                        <Button
                          onClick={() =>{}}
                          variant="contained"
                        >
                          Schedule Meeting
                        </Button>
                          :
                        <GoogleLogin
                          clientId={clientId}
                          buttonText="Sign to schedule meetings"
                          cookiePolicy="single_host_origin"
                          onSuccess={handleGoogleAuth}
                          onFailure={handleGoogleAuth}
                          responseType="code"
                          accessType="offline"
                          scope="openid email profile https://www.googleapis.com/auth/calendar"
                        />}

                        <Button
                          onClick={() =>
                            updateHandler(application.id, "Rejected")
                          }
                          color="error"
                        >
                          Reject Application
                        </Button>
                      </Grid>
                    ) : null}
                  </Grid>
                </div>
              );
            })}
          </>
        ) : null}
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.severity}
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </CompanySideBar>
  );
}

export default CompanyApplications;
