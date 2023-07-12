import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from "@mui/icons-material/Business";
import ArticleIcon from '@mui/icons-material/Article';
import Settings from "@mui/icons-material/Settings";

export const companyPages = [
    {
      pageName: "Company Profile",
      link: "/company-profile",
      icon: <BusinessIcon sx={{ fontSize: "35px", marginRight: "5px" }} />,
    },
    {
      pageName: "You Jobs",
      link: "/company-jobs",
      icon: <WorkIcon sx={{ fontSize: "35px", marginRight: "5px" }} />,
    },
    {
      pageName: "Applications",
      link: "/company-applications",
      icon: <ArticleIcon sx={{ fontSize: "35px", marginRight: "5px" }} />,
    },
    {
      pageName: "Settings",
      link: "/company-settings",
      icon: <Settings sx={{ fontSize: "35px", marginRight: "5px" }} />,
    },
  ];