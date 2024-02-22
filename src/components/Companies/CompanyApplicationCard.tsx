import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Options from "./Options";
import { Button, Grid } from "@mui/material";
import { IMeetingInfo } from "../../Models/MeetingInfoModel";
import MeetingDetails from "../MeetingDetails";

interface CompanyApplicationCardProps {
  applicant: string;
  jobName: string;
  timeOfApplication: string;
  applicationStatus: string;
  id: number;
  expanded: any;
  meeting: IMeetingInfo;
}

const cardStyle: React.CSSProperties = {
  marginBottom: "16px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  width: "80vw",
};

const titleStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "bold",
};

const secondaryTextStyle: React.CSSProperties = {
  color: "#6c757d", // Bootstrap secondary text color
};

const CompanyApplicationCard: React.FC<CompanyApplicationCardProps> = (
  props,
) => {
  const {
    applicant,
    jobName,
    timeOfApplication,
    applicationStatus,
    id,
    expanded,
    meeting,
  } = props;
  const [meetingDetails, setMeetingDetails] = useState<boolean>(false);

  const openMeetingDetails = () => {
    setMeetingDetails(true);
  };

  return (
    <Card style={cardStyle}>
      <CardContent>
        <Typography variant="h6" style={titleStyle}>
          {jobName}
        </Typography>
        <Typography style={secondaryTextStyle}>
          Applicant: {applicant}
        </Typography>
        <Typography style={secondaryTextStyle}>
          Time of Application: {timeOfApplication}
        </Typography>
        <Typography style={secondaryTextStyle}>
          Application Status: {applicationStatus}
        </Typography>
        <Grid container spacing={2} marginTop={1}>
          {applicationStatus === "Approved" ||
          applicationStatus === "Rejected" ? null : (
            <Grid item>
              <Options id={id} />
            </Grid>
          )}
          <Grid item>
            <Button variant="outlined" onClick={expanded}>
              View Details
            </Button>
          </Grid>
          {applicationStatus === "Meeting Scheduled" ? (
            <>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => openMeetingDetails()}
                >
                  View Meeting Details
                </Button>
              </Grid>
            </>
          ) : null}
        </Grid>
      </CardContent>
      <MeetingDetails
        open={meetingDetails}
        setOpen={setMeetingDetails}
        meeting={meeting}
      />
    </Card>
  );
};

export default CompanyApplicationCard;
