import { Alert, Box, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Grid as GridLoader } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function CompanyProfile() {
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean|undefined>();

   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {

  }, []);
  return (
    <Box
    >
      {loading ? (
        <div className="flex justify-center align-center mt-12">
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
        </div>
      ) : (
        "Company profile"
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed to load Profile!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CompanyProfile;
