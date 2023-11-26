import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

const HomeHero = () => {
  return (
    <Box
      id="hero"
      sx={{
        backgroundColor: "background.paper",
        position: "relative",
        pt: 4,
        pb: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          sx={{ flexDirection: { xs: "column", md: "unset" } }}
        >
          <Grid>
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box>
                <Typography
                  component="h1"
                  sx={{
                    position: "relative",
                    fontSize: { xs: 50, md: 80 },
                    letterSpacing: 1.5,
                    fontWeight: "bold",
                    lineHeight: 1.3,
                  }}
                >
                  <Typography
                    component="mark"
                    sx={{
                      position: "relative",
                      color: "red",
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      backgroundColor: "unset",
                    }}
                  >
                    Creating <br />
                    <Box
                      sx={{
                        position: "absolute",
                        top: { xs: 24, md: 34 },
                        left: 2,
                        transform: "rotate(3deg)",
                        "& img": {
                          width: { xs: 146, md: 210 },
                          height: "auto",
                        },
                      }}
                    ></Box>
                  </Typography>
                  Opportunities <br />
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      position: "relative",
                      "& svg": {
                        position: "absolute",
                        top: -16,
                        width: { xs: 22, md: 30 },
                        height: "auto",
                      },
                    }}
                  >
                    &nbsp;for
                    <br />
                  </Typography>{" "}
                  &nbsp;Job seekers.
                </Typography>
              </Box>
              <Box sx={{ marginX: "10px", marginY: "30px" }}>
                <Typography
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                    fontSize: "25px",
                  }}
                >
                  Discover your path to professional greatness with Crimson. As a
                  leading recruitment company, we connect talented individuals
                  with exceptional opportunities. Let us be your trusted partner
                  in achieving your career goals. Join Crimson today and unlock
                  your potential for success.
                </Typography>
              </Box>
              <Box>
                <Link to="/login">
                  <Button
                    sx={{
                      backgroundColor: "darkred",
                      ":hover": { backgroundColor: "black" },
                    }}
                    size="large"
                    variant="contained"
                    startIcon={<WorkIcon />}
                  >
                    Job Seeker?
                  </Button>
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to="/company-login">
                  <Button
                    sx={{
                      borderColor: "darkred",
                      color: "darkred",
                      backgroundColor: "white",
                      ":hover": {
                        backgroundColor: "black",
                        color: "white",
                        borderColor: "black",
                      },
                    }}
                    size="large"
                    variant="outlined"
                    startIcon={<SupervisorAccountIcon />}
                  >
                    Recruiter
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeHero;
