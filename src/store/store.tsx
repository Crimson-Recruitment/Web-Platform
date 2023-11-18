import { companyDashboardReducer, userDashboardReducer } from "./reducer";
import { createStore, combineReducers } from "redux";
import { userRegisterReducer } from "./registerReducers";

const allReducers = combineReducers({
  company: companyDashboardReducer,
  user: userDashboardReducer,
  userRegister: userRegisterReducer,
});

const store = createStore(allReducers);

export default store;
