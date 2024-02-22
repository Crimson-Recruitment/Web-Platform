import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminPages } from "../../../Data/AdminPages";

export default function CompanyHome() {
  const [state, setState] = React.useState(false);
  const admin = useSelector((state: any) => state.admin);
  const dispatch = useDispatch();

  React.useEffect(() => {}, [admin]);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
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
        {adminPages.map((pages, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => dashboardHandler(pages.section)}>
              <ListItemText primary={pages.pageName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const dashboardHandler = (value: string) => {
    dispatch({ type: value });
  };

  return (
    <div style={{ minHeight: "100vh" }}>
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
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      {admin.currentPage}
    </div>
  );
}
