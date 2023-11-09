import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { companyPages } from '../../../Data/CompanyPages';
import CompanyJobs from './CompanyJobs';
import CompanyProfile from './CompanyProfile';
import CompanyApplications from './CompanyApplications';

export default function CompanyHome() {
  const [state, setState] = React.useState(false);
  const [section, setSection] = React.useState("company-jobs");

  React.useEffect(() => {},[section])
  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState(open);
    };

    const list = () => (
      <Box
        sx={{width:250}}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {companyPages.map((pages, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => setSection(pages.section)}>
                <ListItemText primary={pages.pageName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );

  function getByDisplayed(): React.ReactNode {
    switch(section) {
      case "company-jobs":
        return <CompanyJobs/>
      case "company-profile":
        return <CompanyProfile/>
      case "company-applications":
        return <CompanyApplications/>
      default:
        throw new Error("Not a valid section!")
    }
  }

  return (
    <div style={{minHeight:"100vh"}}>
         <AppBar color="transparent" position="static">
         <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon color="error" />
          </IconButton>
          </Toolbar>
         </AppBar>
        <Drawer
          anchor={"left"}
          open={state}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
        { getByDisplayed()}
  </div>
  );
}