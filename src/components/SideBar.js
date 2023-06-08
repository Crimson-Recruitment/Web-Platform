import { Box, Grid, Drawer, ListItem, ListItemIcon, List, ListItemText } from '@mui/material'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { GridView} from '@mui/icons-material';
import Person2Icon from '@mui/icons-material/Person2';
import Favorite from "@mui/icons-material/Favorite";
import Search from "@mui/icons-material/Search";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import {Link} from "react-router-dom"
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';

const pages = [
  {pageName:"My Profile", link:"/profile", icon:<Person2Icon sx={{fontSize:"35px", marginRight:"5px"}}/>}, 
  {pageName:"For You", link:"/for-you", icon:<Favorite sx={{fontSize:"35px", marginRight:"5px"}}/>}, 
  {pageName:"Search Jobs", link:"/search-jobs", icon:<Search sx={{fontSize:"35px", marginRight:"5px"}}/>}, 
  {pageName:"My Applications", link:"/my-applications", icon:<FilePresentIcon sx={{fontSize:"35px", marginRight:"5px"}}/>}, 
  {pageName:"Settings", link:"/settings", icon:<Settings sx={{fontSize:"35px", marginRight:"5px"}}/>}, 
  {pageName:"Logout", link:"/logout", icon:<Logout sx={{fontSize:"35px", marginRight:"5px"}}/>}
];


function SideBar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <List>
            {pages.map((page) => (
                 <ListItem key={page.link} sx={{marginTop:"10px"}} disablePadding>
                   <Link to={page.link} style={{textDecoration:"none" ,color:"black"}}>
                     <ListItemIcon>
                       {page.icon}  <ListItemText primary={page.pageName}/>
                     </ListItemIcon>
                   </Link>
                 </ListItem>
              ))}
            </List>
    </Box>
  );
  return (
   <>
    <AppBar sx={{display:{xs:"block", md:"none"}}} position="relative" color='transparent'>
        <Toolbar variant="dense">
          <IconButton edge="start" onClick={toggleDrawer("left",true)} color="transparent" aria-label="menu" sx={{ mr: 2 }}>
            <GridView />
          </IconButton>
        </Toolbar>
      </AppBar>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
   <Grid container display={{xs:"none", md:"block"}}>
   <Box style={{ display: "flex", height: "100vh" }}>
          <Sidebar>
            <Menu>
            {pages.map((page) => (
                <MenuItem key={page.pageName}>
                     <Link to={page.link} style={{textDecoration:"none" ,color:"black"}}>
                  <Typography sx={{fontSize:{md:"20px"}, color:"text.secondary"}}>{page.icon}{page.pageName}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Sidebar>
        </Box>
   </Grid>
   </>
  )
}

export default SideBar