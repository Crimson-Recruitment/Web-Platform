import { ArrowBack, LinkTwoTone } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JobsModel } from "../../../Models/JobsModel";
import Loader from "../../../components/Loader";
import ApplicationBox from "../../../components/Users/ApplicationBox";
import JobDescription from "../../../components/Users/JobDescription";
import { useSelector } from "react-redux";

function JobView() {
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState<JobsModel | null>(null);
  const { id } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const state = useSelector((state: any) => state.jobs);
  const navigate = useNavigate();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    let job: JobsModel[] = state.jobs.filter((j: JobsModel) => j.id == id);
    setJobData(job[0]);
    console.log(job);
    setLoading(false);
  });

  return (
    <div className="min-h-screen lg:mx-[300px]">
      {sessionStorage.getItem("account") ? (
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          size="medium"
          sx={{ margin: "10px" }}
        >
          <ArrowBack /> Back to Jobs
        </Button>
      ) : null}

      {loading ? (
        <Loader />
      ) : jobData != null ? (
        <>
          <Card
            sx={{
              width: "100%",
              maxHeight: "90vh",
              marginTop: "30px",
              overflowY: "auto",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <Typography variant="h4" color="text..primary" gutterBottom>
                {jobData.jobTitle}
              </Typography>
              <Typography variant="h6" component="div" color="text.secondary">
                Company
              </Typography>
              <Typography mb={1.5} color="text.primary">
                {jobData.company?.companyName}
              </Typography>
              {/* <Typography variant="h6" component="div" color="text.secondary">
        Link to Profile
      </Typography>
      <Box
        component="a"
        color="darkred"
        target="_blank"
        href={`/company-view/${jobData.company?.id}`}
        mb={1.5}
      >
        <LinkTwoTone /> Company Profile
      </Box> */}
              <Typography variant="h6" component="div" color="text.secondary">
                Company Overview
              </Typography>
              <Typography mb={1.5} color="text.primary">
                {jobData.company?.overview}
              </Typography>
              <Typography variant="h6" component="div" color="text.secondary">
                Job Type
              </Typography>
              <Typography mb={1.5} color="text.primary">
                {jobData.jobType}
              </Typography>
              <Typography variant="h6" component="div" color="text.secondary">
                Location
              </Typography>
              <Typography mb={1.5} color="text.primary">
                {jobData.location}
              </Typography>
              <Typography variant="h6" component="div" color="text.secondary">
                Job Description
              </Typography>
              <Typography mb={1.5} color="text.primary">
                {jobData.jobDescription}
              </Typography>
              <Typography variant="h6" component="div" color="text.secondary">
                Required Skills and Qualifications
              </Typography>
              <Typography mb={1.5} color="text.primary">
                <ul>
                  {jobData.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </Typography>
              <Typography variant="h6" component="div" color="text.secondary">
                Salary (Annual in USD)
              </Typography>
              <Typography mb={1.5} color="text.primary">
                {jobData.hideSalary ? (
                  <div style={{ display: "flex" }}>
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
                  `${jobData.minSalary} to ${jobData.maxSalary}`
                )}
              </Typography>
              {jobData.skills && jobData.skills.length > 0 && (
                <>
                  <Typography
                    variant="h6"
                    component="div"
                    color="text.secondary"
                  >
                    Skills
                  </Typography>
                  <Typography mb={1.5} color="text.primary">
                    <ul>
                      {jobData.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </Typography>
                </>
              )}
              {jobData.benefits && jobData.benefits.length > 0 && (
                <>
                  <Typography
                    variant="h6"
                    component="div"
                    color="text.secondary"
                  >
                    Benefits
                  </Typography>
                  <Typography mb={1.5} color="text.primary">
                    <ul>
                      {jobData.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </Typography>
                </>
              )}
              <Typography mb={1.5} color="primary">
                {jobData.otherDetails}
              </Typography>
            </CardContent>
            <CardActions>
              {sessionStorage.getItem("account") ? (
                <Button
                  onClick={handleDialogOpen}
                  variant="contained"
                  size="medium"
                >
                  Apply
                </Button>
              ) : (
                <Button
                  onClick={() => window.open("/login")}
                  variant="contained"
                  size="medium"
                >
                  Login to Apply
                </Button>
              )}
            </CardActions>
          </Card>
        </>
      ) : null}
      <ApplicationBox
        jobId={jobData?.id}
        jobName={jobData?.jobTitle}
        companyId={jobData?.companyId}
        needCoverLetter={jobData?.requestCoverLetter}
        isOpen={dialogOpen}
        onClose={handleDialogClose}
      />
    </div>
  );
}

export default JobView;
