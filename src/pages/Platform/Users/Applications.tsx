import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Users/SideBar";
import ApplicationsCard from "../../../components/Users/ApplicationsCard";
import { Grid as GridLoader } from "react-loader-spinner";
import { Alert, Grid, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ApplicationsModel } from "../../../Models/ApplicationsModel";

function Applications() {
  var applicationList:Array<ApplicationsModel> = [];
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
 
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    
  }, []);
  return (
    <SideBar>
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
          {applications.map((application:ApplicationsModel) => {
            return (
              <ApplicationsCard
                applicant={application.firstName}
                jobName={application.jobName}
                timeOfApplication={application.timeOfApplication}
                applicationStatus={application.applicationStatus}
              />
            );
          })}
        </>
      ) : null}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SideBar>
  );
}

export default Applications;
