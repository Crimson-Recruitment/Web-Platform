import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { userPages } from '../../../Data/UserPages';
import Applications from './Applications';
import ForYou from './ForYou';
import Jobs from './Jobs';
import Profile from './Profile';
import Settings from './Settings';

export default function UserHome() {
  const [state, setState] = React.useState(false);
  const [section, setSection] = React.useState("for-you");

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
          {userPages.map((pages, index) => (
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
      case "for-you":
        return <ForYou/>
      case "profile":
        return <Profile/>
      case "applications":
        return <Applications/>
      case "settings":
        return <Settings/>
      case "jobs":
        return <Jobs/>
      case "settings":
        return <Settings/>
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