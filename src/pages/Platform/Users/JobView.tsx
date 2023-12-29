import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobDescription from "../../../components/Users/JobDescription";
import { Grid as GridLoader } from "react-loader-spinner";
import { Button, CardActions } from "@mui/material";
import ApplicationBox from "../../../components/Users/ApplicationBox";
import { ArrowBack } from "@mui/icons-material";
import { JobsModel } from "../../../Models/JobsModel";

function JobView() {
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState<JobsModel>();
  const { id } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {});

  return (
    <div className="min-h-screen lg:mx-[300px]">
      {localStorage.getItem("userEmail") != null ? (
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          size="medium"
          sx={{ margin: "10px", backgroundColor: "green" }}
        >
          <ArrowBack /> Back to Jobs
        </Button>
      ) : null}

      {loading ? (
        <div className="flex items-center justify-center mt-12">
          <GridLoader
            height="130"
            width="130"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : jobData != null ? (
        <>
          <JobDescription
            jobTitle={jobData.jobTitle}
            description={jobData.jobDescription}
            requirements={jobData.requirements}
            skills={jobData.skills}
            minSalary={jobData.minSalary}
            overview={jobData.company!.overview}
            company={jobData.company!.companyName}
            companyId={jobData.company!.id!}
            maxSalary={jobData.maxSalary}
            location={jobData.location}
            type={jobData.jobType}
            hideSalary={jobData.hideSalary}
            benefits={jobData.benefits}
            otherDetails={jobData.otherDetails}
          />
          <CardActions>
            <Button onClick={handleDialogOpen} variant="contained" size="small">
              Apply
            </Button>
          </CardActions>
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
