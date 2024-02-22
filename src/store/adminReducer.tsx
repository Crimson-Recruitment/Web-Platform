import CLearning from "../pages/Platform/Admin/CLearning";
import CreateJob from "../pages/Platform/Admin/CreateJob";

const adminInitState = {
  currentPage: <CreateJob />,
};

export const adminDashboardReducer = (state = adminInitState, action: any) => {
  switch (action.type) {
    case "create-job":
      return { ...state, currentPage: <CreateJob /> };
    case "clearning":
      return { ...state, currentPage: <CLearning /> };
    default:
      return state;
  }
};
