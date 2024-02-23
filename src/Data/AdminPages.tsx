import { ModeEdit, School } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";

export const adminPages = [
  {
    pageName: "Create Jobs",
    section: "create-job",
    icon: <BusinessIcon sx={{ fontSize: "35px", marginRight: "5px" }} />,
  },
  {
    pageName: "Edit Jobs",
    section: "edit-jobs",
    icon: <ModeEdit sx={{ fontSize: "35px", marginRight: "5px" }} />,
  },
  {
    pageName: "C-Learning",
    section: "clearning",
    icon: <School sx={{ fontSize: "35px", marginRight: "5px" }} />,
  },
];
