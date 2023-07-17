import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Users/SideBar";
import Firestore from "../../../Firebase/Firestore";
import ApplicationsCard from "../../../components/Users/ApplicationsCard";
import { Grid as GridLoader } from "react-loader-spinner";
import { Grid } from "@mui/material";


function Applications() {
  const firestore = new Firestore();
  var applicationList = [];
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async() => {
      await firestore.getUserApplications()
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
    <SideBar>
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
            {applications.map((application) => {
              return(
                <ApplicationsCard 
                applicant={application.fullNames} 
                jobName={application.jobName} 
                timeOfApplication={application.timeOfApplication}
                applicationStatus={application.applicationStatus}

                />
              )
            })}
            </>:null


 }
    </SideBar>
  );
}

export default Applications;
