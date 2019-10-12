import {combineReducers} from "redux";
import userReducer from "./user";
import companiesReducer from "./companies";

export default combineReducers({
  user: userReducer,
  companies: companiesReducer
})
