import React, { useState } from "react";
import { MDBCardText, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { Alert, Snackbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Auth from "../../../Firebase/Authentication";
import CompanySideBar from "../../../components/Companies/CompanySideBar";

const Settings = () => {
  const navigate = useNavigate();
  const auth = new Auth();
  const [message, setMessage] = useState({});
  const [open, setOpen] = useState();
  const verifyEmailHandler = async () => {
    await auth.verifyEmail()
    .then(val => {
      if(val.code == 0) {
        setMessage({severity:"success", message:"Check your email for verification!"})
      } else {
        setMessage({severity:"error", message:val.val})
      }
    })
  }
  const logoutHandler = async () => {
    await auth.logout().then(() => {
      window.location.href = "/";
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <CompanySideBar>
      <MDBListGroup flush className="rounded-3 m-20">
        <Typography sx={{ marginY: "20px" }} variant="h5">
          User Settings
        </Typography>
        <MDBListGroupItem className="p-3 my-2">
          <MDBCardText>Update Profile</MDBCardText>
        </MDBListGroupItem>
        <MDBListGroupItem className="p-3 my-2">
          <MDBCardText>Privacy Policy</MDBCardText>
        </MDBListGroupItem>
        <MDBListGroupItem className="p-3 my-2">
          <MDBCardText>Terms and conditions</MDBCardText>
        </MDBListGroupItem>
        <MDBListGroupItem onClick={logoutHandler} className="p-3 my-2">
          <MDBCardText>Logout</MDBCardText>
        </MDBListGroupItem>
      </MDBListGroup>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.severity}
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </CompanySideBar>
  );
};

export default Settings;
