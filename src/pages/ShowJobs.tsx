import { Box, Pagination } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { JobsModel } from "../Models/JobsModel";
import { Grid as GridLoader } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../core/api";
import { Dialog, DialogTitle, DialogContent, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const pageSize = 6;

export default function ShowJobs() {
  const [pagination, setPagination] = React.useState({ from: 0, to: 0 });
  const state = useSelector((state:any) => state.jobs);
  const dispatch = useDispatch();
  const [pages, setPages] = React.useState<number>(0);
  const [index, setIndex] = React.useState(0);
  const [dialog, setDialog] = React.useState<boolean>(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_JOBS_LOADING", payload: true });

        const jobArray = await getAllJobs();
        //jobArray = Array.from({ length: 3 }, () => jobArray).flat()
        console.log(jobArray);
        setPages(Math.ceil(jobArray.length/pageSize));
        if (index + 1 < pages) {
          setPagination({ from: index * pageSize, to: pageSize });
        } else {
          setPagination({ from: index * pageSize, to: jobArray.length });
        }

        dispatch({ type: "SET_JOBS", payload: jobArray });
      } catch (error) {
        // Handle errors as needed
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "SET_JOBS_LOADING", payload: false });
       
      }
    };

    fetchData();
    
  }, [index, pages]);

  const pageHandler = (event: React.ChangeEvent<unknown>, page: number) => {
    setIndex(page - 1);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box component="main" sx={{minHeight:{md:"90vh"}}}>
        {state.loading ?  <div className="flex justify-center mt-12">
            <GridLoader
              height="130"
              width="130"
              color="#4fa94d"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>:  <Container sx={{ py: 8 }} maxWidth="xl">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {state.jobs && state.jobs.slice(pagination.from, pagination.to).map((card:any) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.jobTitle}
                    </Typography>
                    <Typography>
                    {card.jobDescription.length > 200 ? `${card.jobDescription.substring(0, 200)}...` : card.jobDescription}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => setDialog(true)} size="small">View More</Button>
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
              marginTop: "20px",
            }}
          >
            <Pagination
              sx={{bottom:"50px", position:"absolute"}}
              count={Math.ceil(state.jobs.length / 6)}
              onChange={pageHandler}
            />
          </Grid>
        </Container>}
        <Dialog open={dialog} onClose={() => setDialog(false)}>
      <DialogTitle>Login to apply</DialogTitle>
      <DialogContent>
        <p>
        We're thrilled that you're interested in applying for this job opportunity! To proceed, please log in or create a new account.
        </p>
        <Button variant="contained">
          <Link component={RouterLink} to="/login" color="inherit" underline="none">
            Login
          </Link>
        </Button>
      </DialogContent>
    </Dialog>
      
      </Box>
    </ThemeProvider>
  );
}
