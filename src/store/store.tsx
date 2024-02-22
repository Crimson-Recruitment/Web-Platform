import { companyDashboardReducer, userDashboardReducer } from "./reducer";
import { createStore, combineReducers } from "redux";
import {
  companyRegisterReducer,
  userRegisterReducer,
} from "./registerReducers";
import { createJobReducer, editJobReducer, jobsReducer } from "./jobReducer";
import { locationReducer } from "./locationReducer";
import { meetingScheduleReducer } from "./applicationReducer";
import { adminDashboardReducer } from "./adminReducer";

const allReducers = combineReducers({
  company: companyDashboardReducer,
  user: userDashboardReducer,
  userRegister: userRegisterReducer,
  companyRegister: companyRegisterReducer,
  createJobs: createJobReducer,
  editJob: editJobReducer,
  location: locationReducer,
  jobs: jobsReducer,
  schedule: meetingScheduleReducer,
  admin: adminDashboardReducer,
});

const store = createStore(allReducers);

export default store;
