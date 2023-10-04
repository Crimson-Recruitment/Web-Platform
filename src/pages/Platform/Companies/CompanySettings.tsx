import React, { useState } from "react";
import { Alert, AlertColor, Snackbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CompanySideBar from "../../../components/Companies/CompanySideBar";

const Settings = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({message:null,severity:null});
  const [open, setOpen] = useState<boolean|undefined>();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <CompanySideBar>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.severity as unknown as AlertColor}
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </CompanySideBar>
  );
};

export default Settings;
