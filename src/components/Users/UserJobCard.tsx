import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function UserJobCard(props: {
  key: number;
  title: string;
  description: string;
  timestamp: Date;
  benefits: string[];
  minSalary: string;
  maxSalary: string;
  location: string;
  otherSite?: string;
  dialog: any;
  hideSalary: any;
  more: any;
}) {
  const {
    title,
    description,
    timestamp,
    benefits,
    maxSalary,
    minSalary,
    otherSite,
    location,
    dialog,
    hideSalary,
    more,
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
  }, []);
  return (
    <div>
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
            {description.length > 200
              ? `${description.substring(0, 200)}...`
              : description}
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
            {hideSalary === true ? (
              <div className="flex">
                <span
                  className="text-center me-3"
                  style={{
                    width: "80px",
                    height: "20px",
                    backgroundColor: "gray",
                  }}
                >
                  Hidden
                </span>
              </div>
            ) : (
              `Salary: ${minSalary} to ${maxSalary}`
            )}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginBottom: 1,
              display: benefits.length <= 0 ? "none" : "block",
            }}
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
          {otherSite ? (
            <Button
              size="small"
              onClick={() => window.open(otherSite, "_blank")}
              sx={{ color: "#2196f3" }}
            >
              Go to Application
            </Button>
          ) : (
            <Button size="small" onClick={dialog} sx={{ color: "#2196f3" }}>
              Apply Now
            </Button>
          )}
          <Button size="small" onClick={more} sx={{ color: "#757575" }}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default UserJobCard;
