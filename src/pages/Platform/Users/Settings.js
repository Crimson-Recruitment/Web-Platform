import React from "react";
import SideBar from "../../../components/Users/SideBar";
import { MDBCardText, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate()
  return (
    <SideBar>
      <MDBListGroup flush className="rounded-3 m-20">
                    <Typography sx={{marginY:"20px"}} variant="h5">
User Settings
    </Typography>
                      <MDBListGroupItem className="p-3 my-2">
                        <MDBCardText>Update Profile</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="p-3 my-2">
                        <MDBCardText>Verify Email</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="p-3 my-2">
                        <MDBCardText>Verify Phone Number</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="p-3 my-2">
                        <MDBCardText>Privacy Policy</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="p-3 my-2">
                        <MDBCardText>Terms and conditions</MDBCardText>
                      </MDBListGroupItem>
                    </MDBListGroup>
    </SideBar>
  );
};

export default Settings;
