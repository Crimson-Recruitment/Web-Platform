import { Alert, Box, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApplicationsModel } from "../../../Models/ApplicationsModel";
import Loader from "../../../components/Loader";
import ApplicationsCard from "../../../components/Users/ApplicationsCard";
import { getUserApplications } from "../../../core/applicationApi";

function Applications() {
  const [applications, setApplications] = useState<Array<ApplicationsModel>>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const user: any = JSON.parse(sessionStorage.getItem("user")!);

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
    (async () => {
      let applications = await getUserApplications();
      setApplications(applications);
    })();
  }, []);
  return (
    <Box>
      {!loading ? (
        <Loader />
      ) : (
        applications !== null &&
        applications.length > 0 && (
          <>
            {applications.map((application: any) => (
              <ApplicationsCard
                key={application.user.id} // Don't forget to add a unique key for each element in the array
                applicant={application.user.firstName}
                jobName={application.job.jobTitle}
                timeOfApplication={new Date(
                  application.timeStamp,
                ).toDateString()}
                applicationStatus={application.status}
                resumePath={application.user.cv}
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
