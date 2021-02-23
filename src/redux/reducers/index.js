import { combineReducers } from "redux";
import carReducer from "./car";
import motorReducer from "./motor";

const indexReducer = combineReducers({
  car: carReducer,
  motor: motorReducer
});

export default indexReducer;
