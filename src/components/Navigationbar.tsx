import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { companyPages } from "../Data/CompanyPages";
import { userPages } from "../Data/UserPages";
import logo from "../assets/images/logo.png";

const pages = [
  { pageName: "Home", link: "/" },
  { pageName: "About", link: "/about" },
  { pageName: "Jobs", link: "/view-jobs" },
  { pageName: "Contact Us", link: "/contact-us" },
  { pageName: "Pricing", link: "/pricing" },
];

function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<Element | null>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<Element | null>(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  const handleOpenNavMenu = (event: React.MouseEvent) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#8B0000" }}>
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
              src={logo}
              alt="logo"
              style={{ width: "200px", marginRight: "2px" }}
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
                  <MenuItem key={page.link}>
                    <Typography textAlign="center">{page.pageName}</Typography>
                  </MenuItem>
                </Link>
              ))}
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
              src={logo}
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
          {(sessionStorage.getItem("userToken") || "").length > 0 ||
          (sessionStorage.getItem("companyToken") || "").length > 0 ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Icon">
                <IconButton
                  onClick={handleOpenUserMenu}
                  color="inherit"
                  sx={{ p: 0 }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      sessionStorage.getItem("user")
                        ? JSON.parse(sessionStorage.getItem("user")!)
                            .profileImage
                        : sessionStorage.getItem("company")
                          ? JSON.parse(sessionStorage.getItem("company")!)
                              .profileImage
                          : ""
                    }
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
                {sessionStorage.getItem("account") === "user"
                  ? userPages.map((page) => (
                      <MenuItem
                        key={page.section}
                        onClick={() => {
                          dispatch({ type: page.section });
                          navigate("/user-home");
                        }}
                      >
                        {page.pageName}
                      </MenuItem>
                    ))
                  : null}
                {sessionStorage.getItem("account") === "company"
                  ? companyPages.map((page) => (
                      <MenuItem
                        key={page.section}
                        onClick={() => {
                          dispatch({ type: page.section });
                          navigate("/company-home");
                        }}
                      >
                        {page.pageName}
                      </MenuItem>
                    ))
                  : null}
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              {true ? (
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <Link to="/login">
                    <Button
                      sx={{
                        backgroundColor: "red",
                        ":hover": { backgroundColor: "darkred" },
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
                        borderColor: "red",
                        color: "red",
                        backgroundColor: "white",
                        ":hover": {
                          backgroundColor: "darkred",
                          color: "white",
                          borderColor: "red",
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
              ></Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;
