import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { Menu, MenuItem } from "@mui/material";
import { userModel } from "../../../Models/UserModel";

const Profile = () => {
  const skills = ["JavaScript", "React.js", "Node.js", "HTML", "CSS"];
  const profile: userModel = JSON.parse(sessionStorage.getItem("user")!);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Container className="py-5">
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            lg={4}
            sx={{
              display: { xs: "flex", md: "block" },
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", md: "left" },
            }}
          >
            <Box width="100%" maxWidth="sm" bgcolor="white" borderRadius={8}>
              <Box display="flex" justifyContent="flex-end" p={4}></Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                pb={10}
              >
                <Avatar
                  alt="Bonnie image"
                  src={profile.profileImage}
                  sx={{ width: 150, height: 150, mb: 3, boxShadow: 8 }}
                />
                <Typography
                  variant="h5"
                  component="div"
                  mb={1}
                  fontWeight="medium"
                  color="text.primary"
                >
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile.jobTitle}
                </Typography>
                <Box display="flex" mt={4} justifyContent="center">
                  <Button
                    variant="outlined"
                    onClick={() => window.open(profile.cv + ".pdf", "_blank")}
                    color="primary"
                  >
                    View Resume
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Card variant="outlined" sx={{ mb: 4 }}>
              <CardContent>
                <Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Full Name
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    {profile.firstName} {profile.lastName}
                  </Typography>
                </Box>
                <hr />
                <Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Email
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    {profile.email}
                  </Typography>
                </Box>
                <hr />
                <Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Phone
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    {profile.phoneNumber}
                  </Typography>
                </Box>
                <hr />
                <Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Address
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    {profile.location}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card
                  variant="outlined"
                  sx={{ mb: 4, maxWidth: { md: 400, xs: "100%" } }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Skills
                    </Typography>
                    <List>
                      {profile.skills.map((skill, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemText primary={skill} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card
                  variant="outlined"
                  sx={{ mb: 4, maxWidth: { md: 400, xs: "100%" } }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      About
                    </Typography>
                    <Typography
                      component="pre"
                      variant="body1"
                      className="font-italic mb-1"
                      sx={{ whiteSpace: "pre-wrap" }}
                    >
                      {profile.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Profile;
