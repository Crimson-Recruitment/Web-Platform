import { Box, Container, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { getCode } from "../core/meetingsApi";

function ZoomConnectSuccess() {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    (async () => {
      let data = await getCode(
        sessionStorage.getItem("companyToken")!,
        searchParams.get("code")!,
      );
      if (data?.result === "success") {
        setSuccess(true);
        sessionStorage.setItem("company", JSON.stringify(data.company));
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh" }}>
        <Loader />
      </Box>
    );
  } else {
    if (success) {
      return (
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          <div>
            <Typography variant="h4" color="primary">
              Zoom Sign In Successful
            </Typography>
            <Typography variant="body1">
              Your sign-in to Zoom was successful.
            </Typography>
            <Typography variant="body1">
              Continue to the main website{" "}
              <Link
                href="http://localhost:3000/company-home"
                sx={{ color: "#8B0000" }}
                underline="hover"
                fontWeight="bold"
              >
                here
              </Link>
              .
            </Typography>
          </div>
        </Container>
      );
    } else {
      return (
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          <div>
            <Typography variant="h4" color="error">
              Something Happened
            </Typography>
            <Typography variant="body1" color="text.primary">
              There was an error during the sign-in process. Please try again
              later.
            </Typography>
            <Typography variant="body1" color="text.primary">
              Go back to the main website{" "}
              <Link
                href="http://localhost:3000/company-home"
                color="primary"
                underline="hover"
                fontWeight="bold"
              >
                here
              </Link>
              .
            </Typography>
          </div>
        </Container>
      );
    }
  }
}

export default ZoomConnectSuccess;
