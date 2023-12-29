import { Alert, AlertColor, Box, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JobsModel } from "../../../Models/JobsModel";
import ApplicationJobCard from "../../../components/Companies/ApplicationJobCard";
import Loader from "../../../components/Loader";
import { getCompanyJobs } from "../../../core/api";

function CompanyApplications() {
  const [jobs, setJobs] = useState<Array<JobsModel>>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [calendarAccess, setCalendarAccess] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState({ message: "", severity: "" });
  const [open, setOpen] = React.useState<boolean | undefined>();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const expandedHandler = (index: number) => {
    if (expanded == index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  useEffect(() => {
    (async () => {
      const jobArray = await getCompanyJobs();
      setJobs(jobArray);
      setLoading(false);
    })();
  }, []);

  return (
    <Box>
      <div className="xs:min-h-[120vh]  min-h-[120vh] ms-2">
        {loading ? (
          <Loader />
        ) : jobs !== null ? (
          <>
            {jobs.map((job: JobsModel, index: number) => {
              return (
                <div role="button" onClick={() => expandedHandler(index)}>
                  <ApplicationJobCard
                    title={job.jobTitle}
                    timestamp={job.timestamp}
                    applications={() =>
                      navigate(`/company-applications/${job.id}`)
                    }
                  />
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
    </Box>
  );
}

export default CompanyApplications;
