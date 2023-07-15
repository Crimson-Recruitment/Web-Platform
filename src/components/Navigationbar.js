import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { auth } from "../Firebase/FirebaseConfig";
import { userPages } from "../Data/UserPages";
import { companyPages } from "../Data/CompanyPages";

const pages = [
  { pageName: "Home", link: "/" },
  { pageName: "About", link: "/about" },
  { pageName: "Contact Us", link: "/contact-us" },
  { pageName: "Forum", link: "/forum" },
];

function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  const cookie = new Cookies();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#50C878" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <img
              src="./images/logo.png"
              alt="logo"
              style={{ width: "150px", marginRight: "2px" }}
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link
                  to={page.link}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem key={page.pageName}>
                    <Typography textAlign="center">{page.pageName}</Typography>
                  </MenuItem>
                </Link>
              ))}
              <Box sx={{ display: { xs: "block", md: "none" } }}>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Link>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>
                </Link>
              </Box>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <img
              src="./images/logo.png"
              alt="logo"
              style={{ width: "150px", marginRight: "2px" }}
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={page.link} style={{ textDecoration: "none" }}>
                <Button
                  key={page.pageName}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.pageName}
                </Button>
              </Link>
            ))}
          </Box>
          {cookie.get("user-login") == "true" ||
          cookie.get("company-login") == "true" ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={sessionStorage.getItem("profileImage")}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {cookie.get("user-login") == "true"
                  ? userPages.map((userpage) => (
                      <MenuItem
                        key={userpage.link}
                        onClick={() => navigate(userpage.link)}
                      >
                        <Typography textAlign="center">
                          {userpage.pageName}
                        </Typography>
                      </MenuItem>
                    ))
                  : null}
                {cookie.get("company-login") == "true"
                  ? companyPages.map((companypage) => (
                      <MenuItem
                        key={companypage.link}
                        onClick={() => navigate(companypage.link)}
                      >
                        <Typography textAlign="center">
                          {companypage.pageName}
                        </Typography>
                      </MenuItem>
                    ))
                  : null}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              {true ? (
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <Link to="/login">
                    <Button
                      sx={{
                        backgroundColor: "green",
                        ":hover": { backgroundColor: "darkgreen" },
                      }}
                      size="large"
                      variant="contained"
                    >
                      Login
                    </Button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;
                  <Link to="/register">
                    <Button
                      sx={{
                        borderColor: "green",
                        color: "green",
                        backgroundColor: "white",
                        ":hover": {
                          backgroundColor: "darkgreen",
                          color: "white",
                          borderColor: "green",
                        },
                      }}
                      size="large"
                      variant="outlined"
                    >
                      Register
                    </Button>
                  </Link>
                </Box>
              ) : (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {cookie.get("user-login") == "true"
                  ? userPages.map((userpage) => (
                      <MenuItem
                        key={userpage.link}
                        onClick={() => navigate(userpage.link)}
                      >
                        <Typography textAlign="center">
                          {userpage.pageName}
                        </Typography>
                      </MenuItem>
                    ))
                  : null}
                {cookie.get("company-login") == "true"
                  ? companyPages.map((companypage) => (
                      <MenuItem
                        key={companypage.link}
                        onClick={() => navigate(companypage.link)}
                      >
                        <Typography textAlign="center">
                          {companypage.pageName}
                        </Typography>
                      </MenuItem>
                    ))
                  : null}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;
