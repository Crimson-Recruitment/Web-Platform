import {
  Box,
  Grid,
  Drawer,
  ListItem,
  ListItemIcon,
  List,
  ListItemText,
} from "@mui/material";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { GridView } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { userPages } from "../../Data/UserPages";

function SideBar(props: { children: any; }) {
  const {children} = props;
  const [state, setState] = React.useState<boolean>(false);

  const toggleDrawer = (open:boolean) => (event:React.KeyboardEvent<HTMLDivElement>|React.MouseEvent) => {
    setState(open);
  };
  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {userPages.map((page) => (
          <ListItem key={page.link} sx={{ marginTop: "10px" }} disablePadding>
            <Link
              to={page.link}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemIcon>
                {page.icon} <ListItemText primary={page.pageName} />
              </ListItemIcon>
            </Link>
          </ListItem>
        ))}
        <ListItem sx={{ marginTop: "10px" }} disablePadding>
          <Link style={{ textDecoration: "none", color: "black" }} to={""}>
            <ListItemIcon onClick={() => null}>
              <Logout sx={{ fontSize: "35px", marginRight: "5px" }} />{" "}
              <ListItemText primary="Logout" />
            </ListItemIcon>
          </Link>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <>
      <AppBar
        sx={{ display: { xs: "block", lg: "none" } }}
        position="relative"
        color="transparent"
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            onClick={toggleDrawer(true)}
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <GridView />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <Grid container>
        <Grid item md={2.5} display={{ xs: "none", lg: "block" }}>
          <Box style={{ display: "flex", height: "100%" }}>
            <Sidebar>
              <Menu>
                {userPages.map((page) => (
                  <MenuItem key={page.pageName}>
                    <Link
                      to={page.link}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Typography
                        sx={{
                          fontSize: { md: "20px" },
                          color: "text.secondary",
                        }}
                      >
                        {page.icon}
                        {page.pageName}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem onClick={()=> null}>
                  <Typography
                    sx={{
                      fontSize: { md: "20px" },
                      color: "text.secondary",
                    }}
                  >
                    <Logout sx={{ fontSize: "35px", marginRight: "5px" }} />{" "}
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Sidebar>
          </Box>
        </Grid>
        <Grid xs={12} md={9.5}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}

export default SideBar;
