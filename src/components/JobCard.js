import React, { useEffect, useState } from "react";
import { MDBCardBody, MDBCardTitle, MDBCardText, MDBCard } from "mdbreact";

function JobCard({ title, id, description, timestamp }) {
  const time = (new Date().getTime() - timestamp) / 1000;
  const [def, setDef] = useState("");

  const timeHandler = () => {
    if (time < 0) {
      setDef("less than 1 second");
    } else if (time < 60) {
      setDef(`${parseInt(time)} seconds`);
    } else if (time < 3600) {
      setDef(`${parseInt(time / 60)} mins`);
    } else if (time < 216000) {
      setDef(`${parseInt(time / 3600)} hrs`);
    }
  };
  useEffect(() => {
    timeHandler();
  }, [new Date().getTime(), def]);
  return (
    <MDBCard className="my-3 me-3 h-[300px] w-75">
      <MDBCardBody>
        <MDBCardTitle>{title}</MDBCardTitle>
        <MDBCardText>{description}</MDBCardText>
        <MDBCardText>
          <small className="text-muted">Last updated {def} ago</small>
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
}

export default JobCard;
