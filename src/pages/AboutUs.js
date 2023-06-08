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
                  fontSize: { xs: 40, md: 72 },
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
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
