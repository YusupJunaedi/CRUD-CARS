import actionType from './actionType'
import { getAllCars, addData } from "../../utils/api";

export const getAllCarCreator = () => {
    return {
      type: actionType.getAllCars,
      payload: getAllCars(),
    };
  };
