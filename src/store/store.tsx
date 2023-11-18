import { companyDashboardReducer, userDashboardReducer } from "./reducer";
import { createStore, combineReducers } from "redux";
import { companyRegisterReducer, userRegisterReducer } from "./registerReducers";

const allReducers = combineReducers({
  company: companyDashboardReducer,
  user: userDashboardReducer,
  userRegister: userRegisterReducer,
  companyRegister: companyRegisterReducer
});

const store = createStore(allReducers);

export default store;
