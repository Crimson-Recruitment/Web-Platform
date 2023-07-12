import Person2Icon from "@mui/icons-material/Person2";
import Favorite from "@mui/icons-material/Favorite";
import Search from "@mui/icons-material/Search";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import Settings from "@mui/icons-material/Settings";

export const userPages = [
    {
      pageName: "My Profile",
      link: "/profile",
      icon: <Person2Icon sx={{ fontSize: "35px", marginRight: "5px" }} />,
    },
    {
      pageName: "For You",
      link: "/for-you",
      icon: <Favorite sx={{ fontSize: "35px", marginRight: "5px" }} />,
    },
    {
      pageName: "Search Jobs",
      link: "/jobs",
      icon: <Search sx={{ fontSize: "35px", marginRight: "5px" }} />,
    },
    {
      pageName: "My Applications",
      link: "/applications",
      icon: <FilePresentIcon sx={{ fontSize: "35px", marginRight: "5px" }} />,
    },
    {
      pageName: "Settings",
      link: "/settings",
      icon: <Settings sx={{ fontSize: "35px", marginRight: "5px" }} />,
    },
  ];