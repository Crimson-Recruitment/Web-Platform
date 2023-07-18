import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

function UserJobCard({ title, description, timestamp }) {
  const time = (new Date().getTime() - timestamp) / 1000;
  const [def, setDef] = useState("");

  const timeHandler = () => {
    if (time < 0) {
      setDef("less than 1 second");
    } else if (time < 60) {
      setDef(`${time} seconds`);
    } else if (time < 3600) {
      setDef(`${parseInt(time / 60)} mins`);
    } else if (time < 86400) {
      setDef(`${parseInt(time / 3600)} hrs`);
    } else if (time >= 86400) {
      setDef(`${parseInt(time / 86400)} days`);
    }
  };
  useEffect(() => {
    timeHandler();
  }, [new Date().getTime(), def]);
  return (
    <MDBCard className="my-3 me-3">
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

export default UserJobCard;
