import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const Profile = () => {
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <Container className="py-5">
        <Grid container spacing={4}>
          <Grid item xs={12} lg={4}>
            <Card className="mb-4">
              <CardContent className="text-center">
                <Avatar
                  alt="avatar"
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  className="rounded-circle"
                  sx={{ width: 150, height: 150 }}
                />
                <Typography variant="subtitle2" className="text-muted mb-1">Full Stack Developer</Typography>
                <Typography variant="subtitle2" className="text-muted mb-4">Bay Area, San Francisco, CA</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Button variant="contained">Follow</Button>
                  <Button variant="outlined" className="ms-1">Message</Button>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <List className="rounded-3">
                  <ListItem className="d-flex justify-content-between align-items-center p-3">
                    <IconButton>
                      <Box component="span" sx={{ color: 'warning.main' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
                          <path d="M2 0C1.447 0 1 0.447 1 1s.447 1 1 1c.038 0 3.079.522 6.252 1.596C9.287 3.08 10.865 5.054 11 8c.068.036.14.073.217.11.302.144.625.295 1 1H8v2h2c.105.657.15 1.29.147 1.89.008.703-.088 1.41-.32 2.11-.2.57-.494 1.095-.862 1.55C9.042 15.04 5.66 16 2 16v-2c2.13 0 3.973-.122 5-1H4.845c-1.077 0-2.068-.437-2.823-1.144L2 11.155c.422.08.848.145 1.28.191.177-.67.376-1.304.594-1.896.146-.412.304-.798.455-1.164A13.115 13.115 0 0 0 2 8c0-.662.044-1.307.127-1.935.076-.606.18-1.217.309-1.826.016-.072.03-.146.045-.219a14.976 14.976 0 0 0-.179-1.498c-.104-.663-.192-1.36-.258-2.096-.042-.392-.078-.798-.115-1.204H2z" />
                        </svg>
                      </Box>
                    </IconButton>
                    <ListItemText>https://mdbootstrap.com</ListItemText>
                  </ListItem>
                  {/* ... other list items */}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Card className="mb-4">
              <CardContent>
                <Grid container>
                  <Grid item sm={3}>
                    <Typography variant="body2">Full Name</Typography>
                  </Grid>
                  <Grid item sm={9}>
                    <Typography variant="body2" className="text-muted">Johnatan Smith</Typography>
                  </Grid>
                </Grid>
                <hr />
                {/* ... other sections */}
              </CardContent>
            </Card>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <Card className="mb-4 mb-md-0">
                  <CardContent>
                    <Typography variant="body2" className="mb-4">
                      <span className="text-primary font-italic me-1">assigment</span> Project Status
                    </Typography>
                    <Typography variant="body2" className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</Typography>
                    <LinearProgress variant="determinate" value={80} />
                    {/* ... other progress bars */}
                  </CardContent>
                </Card>
              </Grid>
              {/* ... other grid items */}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Profile;
