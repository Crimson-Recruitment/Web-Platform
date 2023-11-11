import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Avatar, TextField, Typography, Box } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import LocationSearchInput from '../../../components/LocationInput';
import { Link } from 'react-router-dom';

const CompanySettings = () => {
  const [tabValue, setTabValue] = React.useState("account");

  const handleTabChange = (event:any, newValue:string) => {
    setTabValue(newValue);
  };


  const manageViews = (value:string) => {
      switch (value) {
        case "account":
          return (
            <Card style={{ marginBottom: '1.5rem', boxShadow: '0 1px 15px 1px rgba(52,40,104,.08)' }}>
                <CardHeader title="Public info" />
                <CardContent>
                  <form>
                    <Grid container spacing={2}>
                      <Grid item md={8}>
                      <Grid container spacing={2}>
                   <Grid item xs={12}>
                     <TextField
                       required
                       fullWidth
                       id="companyname"
                       label="Company Name"
                     />
                   </Grid>
                   <Grid item xs={12}>
                     <LocationSearchInput />
                   </Grid>
                   <Grid item xs={12}>
                     <MuiPhoneNumber
                       required
                       onChange={()=> null}
                       variant="outlined"
                       id="phonenumber"
                       label="Phone Number 1"
                       name="phonenumber1"
                       fullWidth
                       defaultCountry={"ug"}
                     />
                   </Grid>
                   <Grid item xs={12}>
                     <MuiPhoneNumber
                       required
                       onChange={()=> null}
                       variant="outlined"
                       id="phonenumber"
                       label="Phone Number 2"
                       name="phonenumber2"
                       fullWidth
                       defaultCountry={"ug"}
                     />
                   </Grid>
                   <Grid item xs={12}>
                     <TextField
                       required
                       fullWidth
                       id="email"
                       label="Email Address"
                     />
                   </Grid>
                   <Grid item xs={12}>
                     <TextField
                       required
                       fullWidth
                       label="Password"
                       type="password"
                     />
                   </Grid>
                 </Grid>
                      </Grid>
                      <Grid item md={4}>
                        <Box sx={{   
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",}}>
                          <Avatar 
                          src="https://bootdey.com/img/Content/avatar/avatar1.png" 
                          sx={{ height: "150px", width: "150px" }}/>
                          <div className="mt-2">
                            <span className="btn btn-primary">
                              <input type="file"  className="block mt-3 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" />
                            </span>
                          </div>
                        </Box>
                      </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '0.5rem' }}>
                      Save changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
          )
          case "password":
            return (<Card style={{ marginBottom: '1.5rem', boxShadow: '0 1px 15px 1px rgba(52,40,104,.08)' }}>
            <CardHeader title="Password" />
            <CardContent>
              <form>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="inputPasswordCurrent">Current password</InputLabel>
                  <Input id="inputPasswordCurrent" type="password" />
                  <Grid item xs>
                <Link to="*">
                  Forgot password?
                </Link>
                </Grid>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="inputPasswordNew">New password</InputLabel>
                  <Input id="inputPasswordNew" type="password" />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="inputPasswordNew2">Verify password</InputLabel>
                  <Input id="inputPasswordNew2" type="password" />
                </FormControl>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '0.5rem' }}>
                  Save changes
                </Button>
              </form>
            </CardContent>
          </Card>)
          case "privacy":
            return (
              <Typography>
                Privacy
              </Typography>
            )
      }

  }

  return (
    <Container maxWidth="lg" style={{ 
      marginTop: '20px', 
      background: "#FAFAFA", 
      minHeight:"70vh", 
      boxShadow: '0 1px 15px 1px rgba(52,40,104,.08)'  }}>
       <Typography variant="h4" gutterBottom style={{ marginBottom: '1.5rem' }}>
        Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={5} xl={4}>
          <Card style={{ marginBottom: '1.5rem', boxShadow: '0 1px 15px 1px rgba(52,40,104,.08)' }}>
            <CardHeader title="Profile Settings" />
            <div className="list-group list-group-flush" role="tablist">
              <Tabs value={tabValue} onChange={handleTabChange} orientation="vertical">
                <Tab label="Account" value="account" />
                <Tab label="Change Password" value="password"/>
                <Tab label="Privacy Settings" value="privacy"/>
                {/* ... Add other tabs as needed */}
              </Tabs>
            </div>
          </Card>
        </Grid>
        <Grid item md={7} xl={8}>
          <div className="tab-content">
            {manageViews(tabValue)}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanySettings;