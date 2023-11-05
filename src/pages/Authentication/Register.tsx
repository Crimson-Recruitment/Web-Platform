import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RegisterForm from '../../components/RegisterForm';
import { Bg1 } from '../../Data/Images';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ minHeight: { lg: "90vh" }  }}>
        <CssBaseline />
        <Grid
        item
        component="img"
        src={Bg1}
        xs={false}
        sm={4}
        md={5}
        sx={{
          objectFit: "cover",
          objectPosition: "center",
          height:"90vh",
          display: { xs: 'none', md: 'block' }
        }}
      />
        <Grid item xs={12} md={7} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
          <RegisterForm/>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}