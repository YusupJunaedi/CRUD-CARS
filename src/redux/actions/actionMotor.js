import actionType from './actionType'
import { getAllCars, getAllMotors } from "../../utils/api";

export const getAllMotorCreator = () => {
    return {
      type: actionType.getAllMotors,
      payload: getAllMotors(),
    };
  };