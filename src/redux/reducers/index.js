import { combineReducers } from "redux";
import carReducer from "./car";

const indexReducer = combineReducers({
  car: carReducer,
});

export default indexReducer;
