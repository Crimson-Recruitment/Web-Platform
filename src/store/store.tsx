import { companyDashboardReducer, userDashboardReducer } from "./reducer";
import { createStore, combineReducers } from "redux";

const allReducers = combineReducers({
    company: companyDashboardReducer,
    user:userDashboardReducer
})

const store = createStore(allReducers);

export default store;
