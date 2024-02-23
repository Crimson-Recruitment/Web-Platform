import CLearning from "../pages/Platform/Admin/CLearning";
import CreateJob from "../pages/Platform/Admin/CreateJob";
import EditAdminJobs from "../pages/Platform/Admin/EditAdminJobs";

const adminInitState = {
  currentPage: <CreateJob />,
};

export const adminDashboardReducer = (state = adminInitState, action: any) => {
  switch (action.type) {
    case "create-job":
      return { ...state, currentPage: <CreateJob /> };
    case "clearning":
      return { ...state, currentPage: <CLearning /> };
    case "edit-jobs":
      return { ...state, currentPage: <EditAdminJobs /> };
    default:
      return state;
  }
};
