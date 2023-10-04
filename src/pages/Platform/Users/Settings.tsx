import React, { useState } from "react";
import SideBar from "../../../components/Users/SideBar";
import { Alert, AlertColor, AlertProps, Snackbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({message:null, severity:null});
  const [open, setOpen] = useState<boolean|undefined>();

 
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <SideBar>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.severity as unknown as AlertColor}
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </SideBar>
  );
};

export default Settings;
