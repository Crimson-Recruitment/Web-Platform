import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Firestore from '../../../Firebase/Firestore';
import JobDescription from '../../../components/Users/JobDescription';
import {Grid as GridLoader} from "react-loader-spinner";
import { Button, CardActions } from '@mui/material';
import ApplicationBox from '../../../components/Users/ApplicationBox';
import { ArrowBack } from '@mui/icons-material';

function JobView() {
const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState(null);
  const firestore = new Firestore();
  const { id } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate()

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    (async () => {
      await firestore.getJobById(id).then((user) => {
        if (user.code == 0) {
          setJobData({ ...user.val.data(), id: user.id });
          setLoading(false);
        } else {
          alert(user.val);
          setLoading(false);
        }
      })
    })();
  });
  return (
    <div className='min-h-screen lg:mx-[300px]'>
        {localStorage.getItem("email") != null ? <Button
                onClick={() => navigate(-1)}
                variant="contained"
                size="medium"
                sx={{margin:"10px", backgroundColor:"green"}}
            
              >
                <ArrowBack/> Back to Jobs
              </Button> :null}
       

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
                overview={jobData.companyOverview}
                description={jobData.jobDescription}
                requirements={jobData.requirements}
                skills={jobData.skills}
                minSalary={jobData.minSalary}
                maxSalary={jobData.maxSalary}
                location={jobData.location}
                type={jobData.jobType}
                hideSalary={jobData.hideSalary}
                benefits={jobData.benefits}
              />
              <CardActions>
              <Button
                onClick={handleDialogOpen}
                variant="contained"
                size="small"
              >
                Apply
              </Button>
            </CardActions>
          </>
      ):null}
<ApplicationBox
        jobId={jobData !== null ? jobData.id:null}
        jobName={jobData !== null ? jobData.jobTitle: null}
        companyId={jobData !== null ? jobData.companyId:null}
        needCoverLetter={
            jobData !== null ? jobData.requestCoverLetter:null
        }
        isOpen={dialogOpen}
        onClose={handleDialogClose}
      />
    </div>
  )
}

export default JobView