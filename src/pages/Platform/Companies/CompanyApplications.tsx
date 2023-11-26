import { Alert, AlertColor, Box, Grid, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Grid as GridLoader } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { ApplicationsModel } from "../../../Models/ApplicationsModel";
import CompanyApplicationCard from "../../../components/Companies/CompanyApplicationCard";
import { JobsModel } from "../../../Models/JobsModel";
import ApplicationJobCard from "../../../components/Companies/ApplicationJobCard";
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
