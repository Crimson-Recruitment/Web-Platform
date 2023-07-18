import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Users/SideBar";
import Firestore from "../../../Firebase/Firestore";
import ApplicationsCard from "../../../components/Users/ApplicationsCard";
import { Grid as GridLoader } from "react-loader-spinner";
import { Alert, Grid, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Applications() {
  const firestore = new Firestore();
  var applicationList = [];
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      let hasDetails = await firestore.checkUserCompletedRegistration();
      if (hasDetails.val == false) {
        setMessage("Failed to load Applications!");
        setOpen(true);
        await new Promise((res) => setTimeout(res, 2000));
        navigate("/skills", { state: { notify: true } });
      } else {
        await firestore.getUserApplications().then((val) => {
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
            setMessage(val.val);
            setOpen(true);
            setLoading(false);
          }
        });
      }
    })();
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
          {applications.map((application) => {
            return (
              <ApplicationsCard
                applicant={application.fullNames}
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
