import { Alert, Box, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Grid as GridLoader } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { ApplicationsModel } from "../../../Models/ApplicationsModel";
import ApplicationsCard from "../../../components/Users/ApplicationsCard";
import { applications as dApplications } from "../../../Data/DummyData";

function Applications() {
  const [applications, setApplications] = useState<Array<ApplicationsModel>>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setApplications(dApplications);
  }, []);
  return (
    <Box>
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
        applications !== null &&
        applications.length > 0 && (
          <>
            {applications.map((application: ApplicationsModel) => (
              <ApplicationsCard
                key={application.id} // Don't forget to add a unique key for each element in the array
                applicant={application.firstName}
                jobName={application.jobName}
                timeOfApplication={application.timeOfApplication}
                applicationStatus={application.applicationStatus}
                resumePath={application.resume}
              />
            ))}
          </>
        )
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Applications;
