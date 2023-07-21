import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const userTier = {
  title: "Premium",
  price: "9.99",
  description: [
    "Promote your application",
    "Get newsletters prioritizing your field",
    "Priority email support",
  ],
  buttonText: "Purchase Premium",
  buttonVariant: "contained",
};

const tiers = [
  {
    title: "Free",
    price: "0",
    description: ["$20 per job post", "View max of 10 applications"],
    buttonText: "Sign up for free",
    buttonLink: "/company-register",
    buttonVariant: "outlined",
  },
  {
    title: "Startup",
    subheader: "Most popular",
    price: "29.99",
    description: [
      "$15 per job post",
      "20 applications max per post",
      "Screening of applications",
      "Email newsletters",
      "Schedule meetings",
    ],
    buttonText: "Get started",
    buttonLink: "",
    buttonVariant: "contained",
  },
  {
    title: "Enterprise",
    price: "59.99",
    description: [
      "$10 per job post",
      "Promote job post",
      "View unlimited applications",
      "Screening of applications",
      "Email newsletters",
      "Schedule meetings",
    ],
    buttonText: "Contact us",
    buttonLink: "",
    buttonVariant: "outlined",
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          User Pricing
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} direction="column" alignContent="center">
          <Grid item key={userTier.title} xs={12}>
            <Card>
              <CardHeader
                title={userTier.title}
                subheader={userTier.subheader}
                titleTypographyProps={{ align: "center" }}
                action={userTier.title === "Pro" ? <StarIcon /> : null}
                subheaderTypographyProps={{
                  align: "center",
                }}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    mb: 2,
                  }}
                >
                  <Typography component="h2" variant="h3" color="text.primary">
                    ${userTier.price}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    /mo
                  </Typography>
                </Box>
                <ul>
                  {userTier.description.map((line) => (
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={line}
                    >
                      {line}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button fullWidth variant={userTier.buttonVariant}>
                  {userTier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Company Pricing
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid
          container
          spacing={5}
          direction={{ xs: "column", md: "row" }}
          alignContent={{ xs: "center", md: "start" }}
        >
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    onClick={() => navigate(tier.buttonLink)}
                    variant={tier.buttonVariant}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}