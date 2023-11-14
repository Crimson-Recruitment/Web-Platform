import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardText from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardMedia } from "@mui/material";

const CompanyProfile = () => {
  return (
    <div className="gradient-custom-2">
         <Container className="py-5 h-100">
      <Grid container justifyContent="center" alignItems="center" className="h-100">
        <Grid item lg={9} xl={7}>
          <Card>
            <Box sx={{ bgcolor: '#000', height: '200px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '150px' }}>
                <CardMedia
                  component="img"
                  alt="Profile Image"
                  height="150"
                  image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                  style={{ width: '150px', zIndex: '1' }}
                />
                <Button variant="outlined" style={{ height: '36px', overflow: 'visible', marginTop: '8px' }}>
                  Edit profile
                </Button>
              </Box>
              <Box sx={{ marginLeft: '16px', marginTop: '16px' }}>
                <Typography variant="h5" color="textPrimary">
                  Andy Horwitz
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  New York
                </Typography>
              </Box>
            </Box>
            <Box sx={{ bgcolor: '#f8f9fa', padding: '16px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'end', textAlign: 'center', py: 1 }}>
                <Box>
                  <Typography variant="h5" className="mb-1">
                    253
                  </Typography>
                  <Typography variant="body2" className="small text-muted mb-0">
                    Photos
                  </Typography>
                </Box>
                <Box sx={{ px: 3 }}>
                  <Typography variant="h5" className="mb-1">
                    1026
                  </Typography>
                  <Typography variant="body2" className="small text-muted mb-0">
                    Followers
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" className="mb-1">
                    478
                  </Typography>
                  <Typography variant="body2" className="small text-muted mb-0">
                    Following
                  </Typography>
                </Box>
              </Box>
            </Box>
            <CardContent className="text-black p-4">
              <Box sx={{ mb: 5 }}>
                <Typography variant="h6" className="fw-normal mb-1">
                  About
                </Typography>
                <Box sx={{ bgcolor: '#f8f9fa', p: 4 }}>
                  <Typography variant="body1" className="font-italic mb-1">
                    Web Developer
                  </Typography>
                  <Typography variant="body1" className="font-italic mb-1">
                    Lives in New York
                  </Typography>
                  <Typography variant="body1" className="font-italic mb-0">
                    Photographer
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h6" className="fw-normal mb-0">
                  Recent photos
                </Typography>
                <Typography variant="body1" className="mb-0">
                  <a href="#!" className="text-muted">
                    Show all
                  </a>
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6} lg={6}>
                  <CardMedia
                    component="img"
                    alt="Recent Photo"
                    height="140"
                    image="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                    className="w-100 rounded-3"
                  />
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <CardMedia
                    component="img"
                    alt="Recent Photo"
                    height="140"
                    image="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                    className="w-100 rounded-3"
                  />
                </Grid>
                {/* Add more Grid items for additional photos */}
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
