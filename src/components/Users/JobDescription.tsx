import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

function JobDescription(props: { jobTitle: any; type: any; overview: any; description: any; requirements: any; skills: any; benefits: any; location: any; minSalary: any; maxSalary: any; hideSalary: any; otherDetails: any; }) {
  const {
    jobTitle,
    type,
    overview,
    description,
    requirements,
    skills,
    benefits,
    location,
    minSalary,
    maxSalary,
    hideSalary,
    otherDetails,
  } = props;
  return (
    <Card
      sx={{
        minHeight: "60vh",
        margin: "10px",
        paddingX: "5px",
        paddingY: "3px",
        overflow: "hidden",
      }}
      variant="outlined"
    >
      {
        <>
          <CardContent>
            <Typography variant="h4" color="text.black" gutterBottom>
              {jobTitle}
            </Typography>
            <Typography variant="h6" component="div">
              Company Overview
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {overview}
            </Typography>
            <Typography variant="h6" component="div">
              Job type
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {type}
            </Typography>
            <Typography variant="h6" component="div">
              Location
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {location}
            </Typography>
            <Typography variant="h6" component="div">
              Job Description
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {description}
            </Typography>
            <Typography variant="h6" component="div">
              Required Skills and Qualifications
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <ul>
                {requirements.map((req:string) => {
                  return <li>{req}</li>;
                })}
              </ul>
            </Typography>
            <Typography variant="h6" component="div">
              Salary (Annual in USD)
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {hideSalary === "on" ? (
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
                `${minSalary} to ${maxSalary}`
              )}
            </Typography>
            {skills.length != 0 ? (
              <>
                <Typography variant="h6" component="div">
                  Skills
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  <ul>
                    {skills.map((skill:{label:string}) => {
                      return <li>{skill.label}</li>;
                    })}
                  </ul>
                </Typography>
              </>
            ) : null}
            {benefits !== null ? (
              benefits.length != 0 ? (
                <>
                  <Typography variant="h6" component="div">
                    Benefits
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <ul>
                      {benefits.map((benefit:string) => {
                        return <li>{benefit}</li>;
                      })}
                    </ul>
                  </Typography>
                </>
              ) : null
            ) : null}
            <Typography sx={{ mb: 1.5 }} color="text.black">
              {otherDetails}
            </Typography>
          </CardContent>
        </>
      }
    </Card>
  );
}

export default JobDescription;