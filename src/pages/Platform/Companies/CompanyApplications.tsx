import React, { useEffect, useState } from "react";
import CompanySideBar from "../../../components/Companies/CompanySideBar";
import CompanyApplicationCard from "../../../components/Companies/CompanyApplicationCard";
import { Grid as GridLoader } from "react-loader-spinner";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, AlertColor, Grid, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ApplicationsModel } from "../../../Models/ApplicationsModel";

function CompanyApplications() {
  var applicationList:Array<ApplicationsModel> = [];
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number|null>(null);
  const [calendarAccess, setCalendarAccess] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState({ message: "", severity: "" });
  const [open, setOpen] = React.useState<boolean|undefined>();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const expandedHandler = (index:number) => {
    if (expanded == index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  const updateHandler = async (applicationId:number, status:string) => {
   
  };

  useEffect(() => {
  
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
            {applications.map((application:ApplicationsModel, index:number) => {
              return (
                <div role="button" onClick={() => expandedHandler(index)}>
                  <CompanyApplicationCard
                    applicant={application.firstName}
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
                        <Grid item xs={12} md={4}>
                          <Typography variant="h6">Full Name:</Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {application.firstName}
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
                        <Grid item xs={12} md={7}>
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
                       
                        <Button
                          onClick={() =>{}}
                          variant="contained"
                        >
                          Schedule Meeting
                        </Button>
                      

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
          severity={message.severity as AlertColor}
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </CompanySideBar>
  );
}

export default CompanyApplications;
