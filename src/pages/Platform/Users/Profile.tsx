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

const Profile = () => {
  const skills = ["JavaScript", "React.js", "Node.js", "HTML", "CSS"];

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
              <Box display="flex" justifyContent="flex-end" p={4}>
                <Button
                  id="dropdownButton"
                  aria-controls="dropdown"
                  aria-haspopup="true"
                  onClick={handleClick}
                  variant="outlined"
                  color="primary"
                  sx={{
                    "&:hover": {
                      bgcolor: "primary.light",
                    },
                  }}
                >
                  <span style={{ display: "none" }}>Open dropdown</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </Button>
                <Menu
                  id="dropdown"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                  <MenuItem onClick={handleClose}>Export Data</MenuItem>
                  <MenuItem onClick={handleClose} sx={{ color: "red.600" }}>
                    Delete
                  </MenuItem>
                </Menu>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                pb={10}
              >
                <Avatar
                  alt="Bonnie image"
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  sx={{ width: 150, height: 150, mb: 3, boxShadow: 8 }}
                />
                <Typography
                  variant="h5"
                  component="div"
                  mb={1}
                  fontWeight="medium"
                  color="text.primary"
                >
                  Bonnie Green
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Visual Designer
                </Typography>
                <Box display="flex" mt={4} justifyContent="center">
                  <Button variant="outlined" color="primary">
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
                    Johnatan Smith
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
                    example@example.com
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
                    (097) 234-5678
                  </Typography>
                </Box>
                <hr />
                <Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Mobile
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    (098) 765-4321
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
                    Bay Area, San Francisco, CA
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card
                  variant="outlined"
                  sx={{ mb: 4, maxWidth: { md: 400, xs: "100%" } }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Skills
                    </Typography>
                    <List>
                      {skills.map((skill, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemText primary={skill} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  variant="outlined"
                  sx={{ mb: 4, maxWidth: { md: 400, xs: "100%" } }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Skills
                    </Typography>
                    <List>
                      {skills.map((skill, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemText primary={skill} />
                        </ListItem>
                      ))}
                    </List>
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
