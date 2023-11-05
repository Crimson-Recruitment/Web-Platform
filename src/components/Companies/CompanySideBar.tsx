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
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { companyPages } from "../../Data/CompanyPages";

function CompanySideBar(props: { children: any; }) {
  const {children} = props;
  const [state, setState] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open:boolean) => (event:React.KeyboardEvent<HTMLDivElement>|React.MouseEvent) => {

    setState(open);
  };
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {companyPages.map((page) => (
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
          <Link to={""} style={{ textDecoration: "none", color: "black" }}>
            <ListItemIcon>
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
          href={""}
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
          <Box style={{ display: "flex", height: "100vh" }}>
            <Sidebar>
              <Menu>
                {companyPages.map((page) => (
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
                <MenuItem>
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

export default CompanySideBar;