import { Drawer, Fade, Grid, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import MeetingDetails from "../MeetingDetails";
import { IMeetingInfo } from "../../Models/MeetingInfoModel";

const ApplicationCard = (props: {
  applicant: any;
  jobName: any;
  timeOfApplication: any;
  applicationStatus: any;
  resumePath: string;
  meeting: IMeetingInfo;
}) => {
  const {
    applicant,
    jobName,
    timeOfApplication,
    applicationStatus,
    resumePath,
    meeting,
  } = props;
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleViewResume = () => {
    closeMenu();
  };

  const handleChatWithRecruiter = () => {
    closeMenu();
  };

  const handleCardClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const [meetingDetails, setMeetingDetails] = useState<boolean>(false);

  const openMeetingDetails = () => {
    setMeetingDetails(true);
  };

  return (
    <div
      style={{ position: "relative", marginBottom: isMenuOpen ? "200px" : "0" }}
    >
      <Card
        onClick={handleCardClick}
        sx={{
          width: "80vw",
          height: "120px",
          margin: "16px",
          backgroundColor: "#ffffff", // White background
          color: "#000000", // Black text
          cursor: "pointer", // Change cursor on hover
          transition: "margin-bottom 0.3s ease", // Smooth transition for marginBottom
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Job: {jobName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Application Time: {timeOfApplication}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status: {applicationStatus}
          </Typography>
        </CardContent>
      </Card>
      <Fade in={isMenuOpen} timeout={300}>
        <Paper
          style={{
            position: "absolute",
            top: "100%", // Position it below the clicked card
            left: 0,
            width: "80vw",
            padding: "16px",
            backgroundColor: "#ffffff", // White background
            zIndex: 1,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
          }}
        >
          {applicationStatus === "Meeting Scheduled" ? (
            <>
              <MenuItem onClick={() => openMeetingDetails()}>
                View Meeting Details
              </MenuItem>
            </>
          ) : null}
          <MenuItem onClick={handleViewResume}>View Resume</MenuItem>
        </Paper>
      </Fade>
      <MeetingDetails
        open={meetingDetails}
        setOpen={setMeetingDetails}
        meeting={meeting}
      />
    </div>
  );
};

export default ApplicationCard;
