import React from "react";

function CompanyApplicationCard(props: { applicant: any; jobName: any; timeOfApplication: any; applicationStatus: any; }) {
  const {
    applicant,
    jobName,
    timeOfApplication,
    applicationStatus,
  } = props;
  return (
    <div>
      Company Card
    </div>
  );
}

export default CompanyApplicationCard;
