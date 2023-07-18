import React from "react";
import CompanySideBar from "../../../components/Companies/CompanySideBar";
import { MDBCardText, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CompanySettings() {
  const navigate = useNavigate();
  return (
    <CompanySideBar>
   
                    <MDBListGroup flush className="rounded-3 m-20">
                    <Typography sx={{marginY:"20px"}} variant="h5">
Company Settings
    </Typography>
                      <MDBListGroupItem className="p-3 my-2">
                        <MDBCardText>Update Profile</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="p-3 my-2">
                        <MDBCardText>Verify Email</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="p-3 my-2">
                        <MDBCardText>Verify Primary Phone Number</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="p-3 my-2">
                        <MDBCardText>Privacy Policy</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="p-3 my-2">
                        <MDBCardText>Terms and conditions</MDBCardText>
                      </MDBListGroupItem>
                    </MDBListGroup>
                
    </CompanySideBar>
  );
}

export default CompanySettings;
