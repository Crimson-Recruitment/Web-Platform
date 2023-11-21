import { Drawer, Fade, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const ApplicationCard = (props: {
  applicant: any;
  jobName: any;
  timeOfApplication: any;
  applicationStatus: any;
  resumePath: string;
}) => {
  const {
    applicant,
    jobName,
    timeOfApplication,
    applicationStatus,
    resumePath,
  } = props;
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleViewResume = () => {
    // Add logic to view the resume (e.g., open a modal or navigate to a new page)
    console.log("View Resume:", resumePath);
    closeMenu();
  };

  const handleChatWithRecruiter = () => {
    // Add logic to start a chat with the recruiter
    console.log("Chat with Recruiter");
    closeMenu();
  };

  const handleCardClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
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
        <CardActions>
          <Button onClick={handleCardClick} variant="outlined" size="small">
            Open Options
          </Button>
        </CardActions>
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
          <MenuItem onClick={handleViewResume}>View Resume</MenuItem>
          <MenuItem onClick={handleChatWithRecruiter}>
            Chat with Recruiter
          </MenuItem>
        </Paper>
      </Fade>
    </div>
  );
};

export default ApplicationCard;
