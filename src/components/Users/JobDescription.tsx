import { LinkTwoTone } from "@mui/icons-material";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

function JobDescription(props: {
  jobTitle: any;
  type: any;
  description: any;
  requirements: any;
  skills: any;
  benefits: any;
  location: any;
  minSalary: any;
  maxSalary: any;
  overview: string;
  hideSalary: any;
  companyId: number;
  otherDetails: any;
  company: string;
}) {
  const {
    jobTitle,
    type,
    description,
    requirements,
    skills,
    overview,
    company,
    benefits,
    location,
    minSalary,
    maxSalary,
    companyId,
    hideSalary,
    otherDetails,
  } = props;
  const [isFixed, setIsFixed] = useState(false);
  const [initialOffset, setInitialOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 1200;
      if (scrollPosition > threshold && !isFixed) {
        setInitialOffset(scrollPosition);
        setIsFixed(true);
      } else if (scrollPosition <= threshold && isFixed) {
        setInitialOffset(0);
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFixed]);

  return (
    <Card
      sx={{
        width: "45vw",
        position: "fixed",
        top: isFixed ? `${initialOffset}px` : "auto",
        bottom: isFixed ? "auto" : 0,
        maxHeight: "75vh",
        overflowY: "auto",
        marginTop: "10vh",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Typography variant="h4" color="text.primary" gutterBottom>
          {jobTitle}
        </Typography>
        <Typography variant="h6" component="div">
          Company
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {company}
        </Typography>
        <Typography variant="h6" component="div">
          Link to profile
        </Typography>
        <Box
          component="a"
          color="darkred"
          href={`/company-view/${companyId}`}
          sx={{ mb: 1.5 }}
        >
          <LinkTwoTone /> Company Profile
        </Box>

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
            {requirements.map((req: string, index: number) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </Typography>
        <Typography variant="h6" component="div">
          Salary (Annual in USD)
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
            `${minSalary} to ${maxSalary}`
          )}
        </Typography>
        {skills && skills.length > 0 && (
          <>
            <Typography variant="h6" component="div">
              Skills
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <ul>
                {skills.map((skill: string, index: number) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </Typography>
          </>
        )}
        {benefits && benefits.length > 0 && (
          <>
            <Typography variant="h6" component="div">
              Benefits
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <ul>
                {benefits.map((benefit: string, index: number) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </Typography>
          </>
        )}
        <Typography sx={{ mb: 1.5 }} color="text.primary">
          {otherDetails}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default JobDescription;
