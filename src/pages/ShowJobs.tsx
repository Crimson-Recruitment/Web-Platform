import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Pagination } from '@mui/material';

const cards = [1, 2, 3, 4, 5, 6,7,8,9,10,11];
const pageSize = 6;

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ShowJobs() {
  const [pagination, setPagination] = React.useState({from:0, to:0});
  const pages = Math.ceil(cards.length/pageSize);
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    if(index+1 < pages) {
      setPagination({from:index*pageSize, to:pageSize})
    } else {
      setPagination({from:index*pageSize, to:cards.length})
    }
    
  }, [index])

  const pageHandler = (event:React.ChangeEvent<unknown>, page:number) => {
    setIndex(page-1);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
        <Container sx={{ py: 8 }} maxWidth="xl">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.slice(pagination.from,pagination.to).map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Software Engineer
                    </Typography>
                    <Typography>
                    A software engineer creates and maintains computer programs and applications.
                     They write code, solve problems, and collaborate with teams to build functional software
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View More</Button>
                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid 
          sx={{    
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop:"20px"
            }}>
          <Pagination
          count={Math.ceil(cards.length/6)}
            onChange={pageHandler}
          />
          </Grid>
        </Container>
      </main>
      
    </ThemeProvider>
  );
}