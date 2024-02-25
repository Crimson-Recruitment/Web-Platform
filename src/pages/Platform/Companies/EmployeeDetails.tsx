import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar, Button, Chip, Grid, Paper, TextField } from '@mui/material';
import { ArrowBack, Chat, PictureAsPdf } from '@mui/icons-material';
import { IEmployee } from '../../../Models/IEmployee';
import { getEmployee } from '../../../core/api';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import "../../../Styles/print.css";
import { number, object, string } from 'zod';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const schema = object({
    id: number(),
    dateOfBirth: string(),
    gender: string(),
    address: string(),
    position: string(),
    department: string(),
    startDate: string(),
    criminalRecord: string(),
    medicalReport: string(),
    nationalIdFront: string(),
    nationalIdBack: string(),
    passport: string(),
    nextOfKinName: string(),
    nextOfKinRelationship: string(),
    nextOfKinPhone: string(),
    nextOfKinAddress: string(),
  });

  const defaultValues = {
      id: 0,
      dateOfBirth: '',
      gender: '',
      address: '',
      position: '',
      department: '',
      startDate: '',
      criminalRecord: '',
      medicalReport: '',
      nationalIdFront: '',
      nationalIdBack: '',
      passport: '',
      nextOfKinName: '',
      nextOfKinRelationship: '',
      nextOfKinPhone: '',
      nextOfKinAddress: '',
  };
  
export default function EmployeeDetails() {
  const [value, setValue] = React.useState(0);
  const [employee, setEmployee] = React.useState<IEmployee>()
  const {id} = useParams();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
        let emp = await getEmployee(id as unknown as number);
        setEmployee(emp)
        console.log(emp)
    })()
  }, [])

  const { handleSubmit, control } = useForm<IEmployee>({
    resolver: zodResolver(schema),
    defaultValues: employee,
  });

  const onSubmit = (data: IEmployee) => {
    console.log('Submitted data:', data);
    // Handle form submission here
  };

  return (

    <Box sx={{ width: '100%', minHeight:"100vh" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} className="hide-on-print" aria-label="basic tabs example">
          <Tab label="Employee Profile" {...a11yProps(0)} />
          <Tab label="Bio Data" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
  <Button variant='contained' size='small' className="hide-on-print" sx={{ marginBottom: "20px", mt: 2 }} onClick={() => navigate(-1)}>
    <ArrowBack sx={{ color: 'white', mr: 1 }}/> Go Back
  </Button>
  <Typography variant='h4' sx={{ fontSize: "34px", mb: 2 }}>User Profile</Typography>
  {employee && <Paper sx={{ padding: 4, margin: 'auto', maxWidth: 800, flexGrow: 1, backgroundColor: "#f5f5f5" }}>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <Avatar alt={`${employee.user.firstName} ${employee.user.lastName}`} src={employee.user.profileImage} sx={{ width: 100, height: 100, mx: "auto" }} />
      </Grid>
      <Grid item xs={12} sm={8} md={9} lg={10} container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              {employee.user.firstName} {employee.user.lastName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {employee.position} - {employee.user.location}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {employee.user.bio}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Contact: {employee.user.phoneNumber} | <Link to={`mailto:${employee.user.email}`} color="primary">{employee.user.email}</Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="body2" component="div" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {employee.user.skills.map((skill, index) => (
              <Chip key={index} label={skill} sx={{ margin: 0.5, bgcolor:"#8B0000", color:"white"}} />
            ))}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
  <Button
    variant="contained"
    color="primary"
    href={employee.user.cv}
    target="_blank"
    sx={{
      mt: 2,
      mr: 4,
      bgcolor: "#8B0000", 
      color: "#FFFFFF",    
      '&:hover': {
        bgcolor: "#660000", 
      },
    }}
  >
    <PictureAsPdf/> View CV
  </Button>
  <Button
    variant="contained"
    sx={{
      mt: 2,
      bgcolor: "#8B0000", 
      color: "#FFFFFF", 
      '&:hover': {
        bgcolor: "#660000", 
      },
    }}
  >
    <Chat sx={{ mr: 1 }} />
    Chat
  </Button>
</Grid>
    </Grid>
  </Paper>}
</CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
      <Button variant="contained" size='small' className="hide-on-print" sx={{marginBottom:"10px"}} onClick={() => navigate(-1)}>
            <ArrowBack sx={{color:'white'}}/> Go Back
        </Button>
      <Typography variant='h4' sx={{fontSize:"30px"}}>Bio Data</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Employee Information</Typography>
        </Grid>
        {Object.keys(defaultValues).map((key) => (
          <Grid item xs={12} sm={6} key={key}>
            <Controller
              name={key as keyof IEmployee}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={key}
                />
              )}
            />
          </Grid>
        ))}
   <Grid item xs={12} className="hide-on-print">
  <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>
    Save
  </Button>
  <Button variant="contained" onClick={() => window.print()}>
    Print Form
  </Button>
</Grid>
      </Grid>
    </Box>
      </CustomTabPanel>
    </Box>
  );
}