import React, { useEffect, useState } from "react";
import CompanySideBar from "../../../components/Companies/CompanySideBar";
import CompanyApplicationCard from "../../../components/Companies/CompanyApplicationCard";
import "flowbite/dist/flowbite.min.js";
import Firestore from "../../../Firebase/Firestore";
import { Grid as GridLoader } from "react-loader-spinner";
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Grid } from "@mui/material";

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function CompanyApplications() {
  const firestore = new Firestore();
  var applicationList = [];
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  const expandedHandler = (index) => {
    if (expanded == index) {
      setExpanded(null)
    } else {
      setExpanded(index)
    }
  }
  

  useEffect(() => {
    (async() => {
      await firestore.getCompanyApplications()
      .then(val => {
        if(val.code == 0) {
          val.val.forEach(application => {
            applicationList = [...applicationList, {...application.data(), id:application.id}]
          })
          setApplications(applicationList);
          applicationList = [];
          setLoading(false);
        } else {
          alert(val.val);
          setLoading(false)
        }
      })
    })()
  },[])
  return (
    <CompanySideBar>
      <div className="xs:min-h-[120vh]  min-h-[120vh] ms-2">
      { loading ? <div className="flex justify-center mt-12">
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
            </div>:
            applicationList !== null ? 
            <>
            {applications.map((application, index) => {
              return(
               <div role="button" onClick={() => expandedHandler(index)}>
                <CompanyApplicationCard
                applicant={application.fullNames}
                timeOfApplication={application.timeOfApplication}
                jobName={application.jobName}
                applicationStatus={application.applicationStatus}
              />
                <Grid sx={index === expanded? {
                  minHeight:"30vh",
                  maxHeight: {xs:"70vh", md:"35vh"},
                  width:"75%", 
                  transition:"all 0.2s", 
                  borderRadius:"5px", 
                  border:"1px solid lightgray",
                  overflow:"scroll", 
                  backgroundColor:"white" }:
                  {minHeight:"0vh",
                  maxHeight: {xs:"70vh", md:"35vh"},
                  width:"75%", 
                  transition:"all 0.2s",
                  borderRadius:"5px",
                  overflow:"scroll", 
                  zIndex:"10px", 
                  backgroundColor:"white" 
                  }}>
                    {index === expanded? 
                    <Grid container gap={1} sx={{padding:"10px", overflow:"hidden"}}>
                      <Grid item xs={12} md={5} fullwidth>
                      <Typography variant="h6">
                      Full Name:
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {application.fullNames}
                      </Typography>
                      <Typography variant="h6">
                      Job Title:
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {application.jobName}
                      </Typography>
                      <Typography variant="h6">
                      Link to Profile <small>(This automatically starts the review process)</small>
                      </Typography>
                      
                      <Button onClick={() =>  {
                            
                       }}>
                       Check out Profile
                       </Button>
                  
                      </Grid>
                      <Grid item xs={12} md={5} fullwidth>
                      <Typography variant="h6">
                      Download Resume: <small>(This automatically starts the review process)</small>
                      </Typography>

                       <Button onClick={() =>  {
                            window.open(`${application.resume}.pdf`,"_blank")
                       }}>
                        Download Resume
                       </Button>
                       {application.coverLetter != "" ?
                       <>
                       <Typography variant="h6">
                      Cover Letter
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {application.coverLetter}
                      </Typography>
                       </>
                        :null}
                       
                       
                       
                      </Grid>
                     
                    </Grid>
                    :null}
</Grid>

             </div>

              )
            })}
            </>:null
 } 
      </div>
     
    </CompanySideBar>
  );
}

export default CompanyApplications;
