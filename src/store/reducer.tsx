import CompanyApplications from "../pages/Platform/Companies/CompanyApplications";
import CompanyJobs from "../pages/Platform/Companies/CompanyJobs";
import CompanyPricing from "../pages/Platform/Companies/CompanyPricing";
import CompanyProfile from "../pages/Platform/Companies/CompanyProfile";
import CompanySettings from "../pages/Platform/Companies/CompanySettings";
import Employees from "../pages/Platform/Companies/Employees";
import Applications from "../pages/Platform/Users/Applications";
import ForYou from "../pages/Platform/Users/ForYou";
import Jobs from "../pages/Platform/Users/Jobs";
import Profile from "../pages/Platform/Users/Profile";
import Settings from "../pages/Platform/Users/Settings";
import UserPricing from "../pages/Platform/Users/UserPricing";

const userInitState = {
  currentPage: <ForYou />,
};

export const userDashboardReducer = (state = userInitState, action: any) => {
  switch (action.type) {
    case "for-you":
      return { ...state, currentPage: <ForYou /> };
    case "profile":
      return { ...state, currentPage: <Profile /> };
    case "applications":
      return { ...state, currentPage: <Applications /> };
    case "settings":
      return { ...state, currentPage: <Settings /> };
    case "jobs":
      return { ...state, currentPage: <Jobs /> };
    case "user-pricing":
      return { ...state, currentPage: <UserPricing /> };
    default:
      return state;
  }
};

const companyInitState = {
  currentPage: <CompanyJobs />,
};

export const companyDashboardReducer = (
  state = companyInitState,
  action: any,
) => {
  switch (action.type) {
    case "company-jobs":
      return { ...state, currentPage: <CompanyJobs /> };
    case "company-profile":
      return { ...state, currentPage: <CompanyProfile /> };
    case "company-applications":
      return { ...state, currentPage: <CompanyApplications /> };
    case "company-settings":
      return { ...state, currentPage: <CompanySettings /> };
    case "company-pricing":
      return { ...state, currentPage: <CompanyPricing /> };
    case "hires":
        return { ...state, currentPage: <Employees /> };
    default:
      return state;
  }
};
