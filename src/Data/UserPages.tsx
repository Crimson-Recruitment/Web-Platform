import Person2Icon from "@mui/icons-material/Person2";
import Favorite from "@mui/icons-material/Favorite";
import Search from "@mui/icons-material/Search";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import Settings from "@mui/icons-material/Settings";
import UpgradeIcon from "@mui/icons-material/Upgrade";

export const userPages = [
  {
    pageName: "My Profile",
    section: "profile",
    icon: <Person2Icon sx={{ fontSize: "35px", marginRight: "5px" }} />,
  },
  {
    pageName: "For You",
    section: "for-you",
    icon: <Favorite sx={{ fontSize: "35px", marginRight: "5px" }} />,
  },
  {
    pageName: "Search Jobs",
    section: "jobs",
    icon: <Search sx={{ fontSize: "35px", marginRight: "5px" }} />,
  },
  {
    pageName: "My Applications",
    section: "applications",
    icon: <FilePresentIcon sx={{ fontSize: "35px", marginRight: "5px" }} />,
  },
  {
    pageName: "My Meetings",
    section: "meetings",
    icon: <FilePresentIcon sx={{ fontSize: "35px", marginRight: "5px" }} />,
  },
  {
    pageName: "Settings",
    section: "settings",
    icon: <Settings sx={{ fontSize: "35px", marginRight: "5px" }} />,
  },
  {
    pageName: "Upgrade Account",
    section: "user-pricing",
    icon: <UpgradeIcon sx={{ fontSize: "35px", marginRight: "5px" }} />,
  },
];
