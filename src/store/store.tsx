import { companyDashboardReducer, userDashboardReducer } from "./reducer";
import { createStore, combineReducers } from "redux";
import {
  companyRegisterReducer,
  userRegisterReducer,
} from "./registerReducers";
import { createJobReducer } from "./jobReducer";
import { locationReducer } from "./locationReducer";

const allReducers = combineReducers({
  company: companyDashboardReducer,
  user: userDashboardReducer,
  userRegister: userRegisterReducer,
  companyRegister: companyRegisterReducer,
  createJobs: createJobReducer,
  location: locationReducer,
});

const store = createStore(allReducers);

export default store;
