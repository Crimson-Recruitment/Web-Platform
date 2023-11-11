import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardText from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CompanyProfile = () => {
  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <Container className="py-5 h-100">
        <Grid container justifyContent="center" alignItems="center" className="h-100">
          <Grid item lg={9} xl={7}>
            <Card>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <Box sx={{ ms: 4, mt: 5, width: '150px', display: 'flex', flexDirection: 'column' }}>
                  <Avatar
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    sx={{ width: '150px', zIndex: '1' }}
                  />
                  <Button variant="outlined" style={{ height: '36px', overflow: 'visible' }}>
                    Edit profile
                  </Button>
                </Box>
                <Box sx={{ ms: 3, marginTop: '130px' }}>
                  <Typography variant="h5">Andy Horwitz</Typography>
                  <Typography variant="body2">New York</Typography>
                </Box>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <Typography variant="h5" className="mb-1">253</Typography>
                    <Typography variant="body2" className="small text-muted mb-0">Photos</Typography>
                  </div>
                  <Box sx={{ px: 3 }}>
                    <Typography variant="h5" className="mb-1">1026</Typography>
                    <Typography variant="body2" className="small text-muted mb-0">Followers</Typography>
                  </Box>
                  <div>
                    <Typography variant="h5" className="mb-1">478</Typography>
                    <Typography variant="body2" className="small text-muted mb-0">Following</Typography>
                  </div>
                </div>
              </div>
              <CardContent className="text-black p-4">
                <div className="mb-5">
                  <Typography variant="h5" className="fw-normal mb-1">About</Typography>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <Typography variant="body2" className="font-italic mb-1">Web Developer</Typography>
                    <Typography variant="body2" className="font-italic mb-1">Lives in New York</Typography>
                    <Typography variant="body2" className="font-italic mb-0">Photographer</Typography>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Typography variant="h5" className="fw-normal mb-0">Recent photos</Typography>
                  <Typography variant="body2" className="mb-0"><a href="#!" className="text-muted">Show all</a></Typography>
                </div>
                <Grid container>
                  <Grid item className="mb-2">
                    <Avatar
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </Grid>
                  <Grid item className="mb-2">
                    <Avatar
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="g-2">
                  <Grid item className="mb-2">
                    <Avatar
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </Grid>
                  <Grid item className="mb-2">
                    <Avatar
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CompanyProfile;
