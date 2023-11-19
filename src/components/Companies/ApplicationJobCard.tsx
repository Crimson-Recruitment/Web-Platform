import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const ApplicationJobCard = (props: {
  title: any;
  timestamp: any;
  applications: any;
}) => {
  const { title, timestamp, applications } = props;
  const handleCardClick = () => {
    if (applications) {
      applications();
    }
  };

  return (
    <Card
      sx={{
        maxWidth: "100%",
        margin: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        cursor: "pointer", // Add this to show it's clickable
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", marginBottom: 1 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: "italic", marginBottom: 1 }}
        >
          Posted on: {new Date(timestamp).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={handleCardClick}
          sx={{ color: "#2196f3" }}
        >
          View Applications
        </Button>
      </CardActions>
    </Card>
  );
};

export default ApplicationJobCard;
