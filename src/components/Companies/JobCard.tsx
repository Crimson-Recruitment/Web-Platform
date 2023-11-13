import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function JobCard(props: {
  key: number;
  title: string;
  description: string;
  timestamp: Date;
  benefits: string[];
  minSalary: string;
  maxSalary: string;
  location: string;
  edit: any;
}) {
  const {
    title,
    description,
    timestamp,
    benefits,
    maxSalary,
    minSalary,
    location,
    edit,
  } = props;
  const time = (new Date().getTime() - timestamp.getTime()) / 1000;
  const [def, setDef] = useState("");

  const timeHandler = () => {
    if (time < 0) {
      setDef("less than 1 second");
    } else if (time < 60) {
      setDef(`${time} seconds`);
    } else if (time < 3600) {
      setDef(`${time / 60} mins`);
    } else if (time < 86400) {
      setDef(`${time / 3600} hrs`);
    } else if (time >= 86400) {
      setDef(`${time / 86400} days`);
    }
  };
  useEffect(() => {
    timeHandler();
  }, [new Date().getTime(), def]);
  return (
    <Card
      sx={{
        maxWidth: "100%",
        margin: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 2 }}
        >
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1 }}
        >
          Location: {location}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1 }}
        >
          Salary: ${minSalary} - ${maxSalary}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1 }}
        >
          Benefits: {benefits.join(", ")}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: "italic" }}
        >
          Posted on: {timestamp.toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={edit} sx={{ color: "#2196f3" }}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}

export default JobCard;
