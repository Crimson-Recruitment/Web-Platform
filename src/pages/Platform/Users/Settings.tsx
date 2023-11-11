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
import { Typography } from '@mui/material';

const Settings = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event:any, newValue:number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px', background: '#FFC0CB' }}>
       <Typography variant="h4" gutterBottom style={{ marginBottom: '1.5rem' }}>
        Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={5} xl={4}>
          <Card style={{ marginBottom: '1.5rem', boxShadow: '0 1px 15px 1px rgba(52,40,104,.08)' }}>
            <CardHeader title="Profile Settings" />
            <div className="list-group list-group-flush" role="tablist">
              <Tabs value={tabValue} onChange={handleTabChange} orientation="vertical">
                <Tab label="Account" />
                <Tab label="Password" />
                {/* ... Add other tabs as needed */}
              </Tabs>
            </div>
          </Card>
        </Grid>
        <Grid item md={7} xl={8}>
          <div className="tab-content">
            <div className={`tab-pane fade ${tabValue === 0 ? 'show active' : ''}`} id="account" role="tabpanel">
              <Card style={{ marginBottom: '1.5rem', boxShadow: '0 1px 15px 1px rgba(52,40,104,.08)' }}>
                <CardHeader title="Public info" />
                <CardContent>
                  <form>
                    <Grid container spacing={2}>
                      <Grid item md={8}>
                        <FormControl fullWidth margin="normal">
                          <InputLabel htmlFor="inputUsername">Username</InputLabel>
                          <Input id="inputUsername" type="text" />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                          <InputLabel htmlFor="inputBio">Biography</InputLabel>
                          <TextareaAutosize id="inputBio" minRows={2} placeholder="Tell something about yourself" />
                        </FormControl>
                      </Grid>
                      <Grid item md={4}>
                        <div className="text-center">
                          <img
                            alt="Profile"
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            className="rounded-circle img-responsive mt-2"
                            width="128"
                            height="128"
                          />
                          <div className="mt-2">
                            <span className="btn btn-primary">
                              <input type="file" />
                            </span>
                          </div>
                          <small>For best results, use an image at least 128px by 128px in .jpg format</small>
                        </div>
                      </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '0.5rem' }}>
                      Save changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <div className={`tab-pane fade ${tabValue === 1 ? 'show active' : ''}`} id="password" role="tabpanel">
              <Card style={{ marginBottom: '1.5rem', boxShadow: '0 1px 15px 1px rgba(52,40,104,.08)' }}>
                <CardHeader title="Password" />
                <CardContent>
                  <form>
                    <FormControl fullWidth margin="normal">
                      <InputLabel htmlFor="inputPasswordCurrent">Current password</InputLabel>
                      <Input id="inputPasswordCurrent" type="password" />
                      <small><a href="#">Forgot your password?</a></small>
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
              </Card>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;