import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { About1, Frustrated, HelpImage } from "../Data/Images";

export default function AboutUs() {
  return (
    <main>
      <Box
        sx={{
          bgcolor: "#FFC0CB",
          pt: 8,
          pb: 6,
        }}
      >
        <Container>
          <Box>
            <Typography
              component="h1"
              sx={{
                position: "relative",
                fontSize: { xs: 50, md: 72 },
                letterSpacing: 1.5,
                fontWeight: "bold",
                lineHeight: 1.3,
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  position: "relative",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  backgroundColor: "unset",
                  align: "center",
                }}
              >
                Ignite your Professional journey with
                <Typography
                  component="span"
                  sx={{
                    fontSize: "inherit",
                    color: "red",
                    fontWeight: "inherit",
                    position: "relative",
                  }}
                >
                  &nbsp;Crimson.{" "}
                </Typography>
              </Typography>
            </Typography>
          </Box>
          <Typography
            variant="h4"
            align="center"
            color="text.secondary"
            paragraph
          >
            With our unwavering commitment to your professional growth, we
            strive to open doors to remarkable opportunities tailored to your
            unique talents and aspirations.
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={5} sx={{ marginBottom: "100px" }}>
          <Grid
            item
            component="img"
            xs={12}
            sm={6}
            src={Frustrated}
            sx={{
              marginTop: "-50px",
              objectFit: "contain",
              maxHeight: "400px",
            }}
          />
          <Grid xs={12} sm={6}>
            <Typography
              align="center"
              color="text.black"
              paragraph
              sx={{ fontSize: "25px", marginLeft: "20px" }}
            >
              Frustrated with waiting for recruiter responses or dealing with
              lengthy job applications? We've got you covered. Our platform
              streamlines the process, reducing waiting times and simplifying
              applications, so you can focus on finding your dream job.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          component="img"
          xs={12}
          src={HelpImage}
          sx={{
            objectFit: "cover",
            objectPosition: "center",
            paddingX: { md: "100px" },
          }}
        />
        <Grid item xs={12} sm={6}>
          <Typography
            align="center"
            color="text.black"
            paragraph
            sx={{ fontSize: "25px" }}
          >
            Discover a seamless job-seeking experience with us. Gain access to a
            wide array of on-demand jobs and experience the convenience of our
            platform that not only facilitates swift and easy job applications
            but also ensures quick responses from recruiters. Maximize your
            opportunities and take charge of your career journey with our
            user-friendly system."
          </Typography>
        </Grid>
        <Grid container sx={{ marginTop: "100px" }}>
          <Grid
            item
            component="img"
            src={About1}
            xs={12}
            sm={6}
            sx={{
              objectFit: "cover",
              objectPosition: "center",
              height: "300px",
            }}
          />
          <Grid item xs={12} sm={6} justifyContent="flex-end">
            <Typography
              component="blockquote"
              align="center"
              color="text.black"
              paragraph
              sx={{ fontSize: "25px" }}
            >
              "Our mission is to simplify your job search, making it effortless
              and more efficient, while also focusing on enhancing your skills
              and professional development. With our dedicated support and
              resources, you can confidently pursue your career goals, knowing
              we are here to assist you every step of the way!"
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
