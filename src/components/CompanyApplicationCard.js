import React from 'react'
import { MDBCardBody, MDBCardTitle, MDBCardText, MDBCard } from "mdbreact";

function CompanyApplicationCard({applicant, jobName, timeOfApplication, applicationStatus}) {
  return (
    <MDBCard className="my-3 me-3 w-75">
        <MDBCardBody>
          <MDBCardTitle>{applicant}</MDBCardTitle>
          <MDBCardText muted={true}>
                {jobName}
          </MDBCardText>
            <small className="text-black">Applied on {timeOfApplication}</small> <br/>  
            <small className="text-muted">Status {applicationStatus}</small>
        </MDBCardBody>
      </MDBCard>
  )
}

export default CompanyApplicationCard