import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import ArticleIcon from "@mui/icons-material/Article";
import Settings from "@mui/icons-material/Settings";
import UpgradeIcon from "@mui/icons-material/Upgrade";

export const companyPages = [
  {
    pageName: "Company Profile",
    section: "company-profile",
    icon: <BusinessIcon sx={{ fontSize: "35px", marginRight: "5px" }} />,
  },
  {
    pageName: "You Jobs",
    section: "company-jobs",
    icon: <WorkIcon sx={{ fontSize: "35px", marginRight: "5px" }} />,
  },
  {
    pageName: "Applications",
    section: "company-applications",
    icon: <ArticleIcon sx={{ fontSize: "35px", marginRight: "5px" }} />,
  },
  {
    pageName: "Settings",
    section: "company-settings",
    icon: <Settings sx={{ fontSize: "35px", marginRight: "5px" }} />,
  },
  {
    pageName: "Upgrade Account",
    section: "company-pricing",
    icon: <UpgradeIcon sx={{ fontSize: "35px", marginRight: "5px" }} />,
  },
];
