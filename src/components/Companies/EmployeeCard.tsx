import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";

interface EmployeeCardProps {
  employeeName: string;
  jobTitle: string;
  onViewDetails: () => void; // Function to handle the "View Details" action
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

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employeeName,
  jobTitle,
  onViewDetails,
}) => {
  return (
    <Card style={cardStyle}>
      <CardContent>
        <Typography variant="h6" style={titleStyle}>
          {jobTitle}
        </Typography>
        <Typography style={secondaryTextStyle}>
          Name: {employeeName}
        </Typography>
        <Grid container spacing={2} marginTop={2}>
          <Grid item>
            <Button variant="outlined" onClick={onViewDetails}>
              View Details
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
