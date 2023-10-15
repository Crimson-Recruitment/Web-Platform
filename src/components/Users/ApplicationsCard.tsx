import React from "react";
import { Grid } from "@mui/material";

function ApplicationsCard(props: { applicant: any; jobName: any; timeOfApplication: any; applicationStatus: any; }) {
  const {
    applicant,
    jobName,
    timeOfApplication,
    applicationStatus,
  } = props;
  return (
    <div>
     Appication card
    </div>
  );
}

export default ApplicationsCard;
