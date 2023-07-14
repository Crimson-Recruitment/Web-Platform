import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AboutUs() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "lightgreen",
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
                      color: "green",
                      fontWeight: "inherit",
                      position: "relative",
                    }}
                  >
                    &nbsp;Jade.{" "}
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
          <Grid container spacing={4} sx={{ marginBottom: "100px" }}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                backgroundImage:
                  "url(https://source.unsplash.com/random?wallpapers)",
                minHeight: "300px",
              }}
            />
            <Grid xs={12} sm={6}>
              <Typography
                align="center"
                color="text.black"
                paragraph
                sx={{ fontSize: "30px" }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                atque dolore voluptatibus nisi. Nihil placeat, eius a harum
                tenetur, nemo, ipsam fugiat quos itaque nam est ipsa maxime quod
                ducimus!
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              minHeight: "300px",
            }}
          />
          <Grid item xs={12} sm={6}>
            <Typography
              align="center"
              color="text.black"
              paragraph
              sx={{ fontSize: "30px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam atque
              dolore voluptatibus nisi. Nihil placeat, eius a harum tenetur,
              nemo, ipsam fugiat quos itaque nam est ipsa maxime quod ducimus!
            </Typography>
          </Grid>
          <Grid container spacing={4} sx={{ marginTop: "100px" }}>
            <Grid xs={12} sm={6}>
              <Typography
                align="center"
                color="text.black"
                paragraph
                sx={{ fontSize: "30px" }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                atque dolore voluptatibus nisi. Nihil placeat, eius a harum
                tenetur, nemo, ipsam fugiat quos itaque nam est ipsa maxime quod
                ducimus!
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                backgroundImage:
                  "url(https://source.unsplash.com/random?wallpapers)",
                minHeight: "300px",
              }}
            />
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
