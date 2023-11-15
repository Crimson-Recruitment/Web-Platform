import { CardMedia } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Popover from '@mui/material/Popover';
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Person, peopleData } from "../../../Data/DummyData";

const CompanyProfile = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, personId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedPerson(personId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedPerson(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? `simple-popover-${selectedPerson}` : undefined;

  return (
    <div className="gradient-custom-2">
         <Container className="py-5 h-100">
      <Grid container justifyContent="center" alignItems="center" className="h-100">
        <Grid item lg={9} xl={7}>
          <Card>
            <Box sx={{ bgcolor: '#000', height: '270px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
                <CardMedia
                  component="img"
                  alt="Profile Image"
                  height="300"
                  image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp"
                  style={{ width: '200px', zIndex: '1', borderRadius:"10px" }}
                />
                     <Box sx={{ marginLeft: '16px', marginTop: '16px' }}>
                <Typography variant="h6" color="white">
                  Beauty Delights
                </Typography>
                <Typography variant="body1" sx={{marginBottom:"10px"}} color="lightgray">
                  New York, USA
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
                  Company Photos
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
              <Typography variant="h5" marginY={"10px"} gutterBottom>
          Our Team
        </Typography>
        <Box display="flex" justifyContent="space-between">
          {peopleData.map((person) => (
            <Box key={person.id} textAlign="center">
              <CardMedia
                component="img"
                alt={person.name}
                height="150"
                image={person.image}
                sx={{ cursor: 'pointer', borderRadius: '50%', width: '150px', height: '150px' }}
                onClick={(event) => handleClick(event, person.id)}
              />
              <Typography variant="subtitle1" mt={1}>
                {person.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {person.position}
              </Typography>
              <Popover
                id={id}
                open={selectedPerson === person.id && open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Box p={2}>
                  <Typography variant="subtitle1">{person.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {person.position}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {person.contactDetails.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Phone: {person.contactDetails.phone}
                  </Typography>
                </Box>
              </Popover>
            </Box>
          ))}
        </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default CompanyProfile;
