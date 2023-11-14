import {
  Avatar,
  Box,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import MuiPhoneNumber from "material-ui-phone-number";
import React from "react";
import { Link } from "react-router-dom";
import LocationSearchInput from "../../../components/LocationInput";

const Settings = () => {
  const [tabValue, setTabValue] = React.useState("account");

  const handleTabChange = (event: any, newValue: string) => {
    setTabValue(newValue);
  };

  const manageViews = (value: string) => {
    switch (value) {
      case "account":
        return (
          <Card
            sx={{
              width: { xs: "80vw", md: "100%" },
              bgcolor: "background.paper",
            }}
            style={{
              marginBottom: "1.5rem",
              boxShadow: "0 1px 15px 1px rgba(52,40,104,.08)",
            }}
          >
            <CardHeader title="Public info" />
            <CardContent>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        sx={{ height: "150px", width: "150px" }}
                      />
                      <div className="mt-2">
                        <span className="btn btn-primary">
                          <input
                            type="file"
                            className="block mt-3 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                          />
                        </span>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item md={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiPhoneNumber
                          required={true}
                          onChange={() => null}
                          variant="outlined"
                          id="phonenumber"
                          label="Phone Number"
                          name="phonenumber"
                          fullWidth
                          defaultCountry={"ug"}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <LocationSearchInput />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          type="email"
                          id="email"
                          label="Email Address"
                          autoComplete="email"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "0.5rem" }}
                >
                  Save changes
                </Button>
              </form>
            </CardContent>
          </Card>
        );
      case "password":
        return (
          <Card
            sx={{
              width: { xs: "80vw", md: "100%" },
              bgcolor: "background.paper",
            }}
            style={{
              marginBottom: "1.5rem",
              boxShadow: "0 1px 15px 1px rgba(52,40,104,.08)",
            }}
          >
            <CardHeader title="Password" />
            <CardContent>
              <form>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="inputPasswordCurrent">
                    Current password
                  </InputLabel>
                  <Input id="inputPasswordCurrent" type="password" />
                  <Grid item xs>
                    <Link to="*">Forgot password?</Link>
                  </Grid>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="inputPasswordNew">
                    New password
                  </InputLabel>
                  <Input id="inputPasswordNew" type="password" />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="inputPasswordNew2">
                    Verify password
                  </InputLabel>
                  <Input id="inputPasswordNew2" type="password" />
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "0.5rem" }}
                >
                  Save changes
                </Button>
              </form>
            </CardContent>
          </Card>
        );
      case "privacy":
        return (
          <Card
            sx={{
              width: { xs: "80vw", md: "100%" },
              bgcolor: "background.paper",
            }}
            style={{
              marginBottom: "1.5rem",
              boxShadow: "0 1px 15px 1px rgba(52,40,104,.08)",
            }}
          >
            <CardHeader title="Notification Settings" />
            <CardContent>
              <form>
                <FormControl fullWidth margin="normal">
                  <List component="nav" aria-labelledby="nested-list-subheader">
                    <ListItemButton>
                      <ListItemText primary="Privacy Policy" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="Terms & Conditions" />
                    </ListItemButton>
                  </List>
                  <Typography>
                    <Switch name="notifications" /> Enable Notifications{" "}
                  </Typography>
                  <Grid item xs></Grid>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginTop: "0.5rem" }}
                >
                  Save changes
                </Button>
              </form>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        marginTop: "20px",
        background: "#FAFAFA",
        minHeight: "70vh",
        boxShadow: "0 1px 15px 1px rgba(52,40,104,.08)",
      }}
    >
      <Grid
        container
        xs={12}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Tab label="Account" value="account" />
          <Tab label="Change Password" value="password" />
          <Tab label="Privacy Settings" value="privacy" />
        </Tabs>
      </Grid>
      <Typography
        variant="h4"
        gutterBottom
        style={{ marginBottom: "1.5rem", marginLeft: "1.5rem" }}
      >
        Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={5} xl={4}>
          <Card
            sx={{ display: { xs: "none", md: "block" } }}
            style={{
              marginBottom: "1.5rem",
              boxShadow: "0 1px 15px 1px rgba(52,40,104,.08)",
            }}
          >
            <CardHeader title="Profile Settings" />
            <div className="list-group list-group-flush" role="tablist">
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                orientation="vertical"
              >
                <Tab label="Account" value="account" />
                <Tab label="Change Password" value="password" />
                <Tab label="Privacy Settings" value="privacy" />
              </Tabs>
            </div>
          </Card>
        </Grid>
        <Grid item md={7} xl={8}>
          <div className="tab-content">{manageViews(tabValue)}</div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
