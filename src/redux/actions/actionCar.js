import actionType from './actionType'
import { getAllCars } from "../../utils/api";

export const getAllCarCreator = () => {
    return {
      type: actionType.getAllCars,
      payload: getAllCars(),
    };
  };

  export const editDataCreator = (data) => {
    return {
      type: actionType.editData,
      payload: data,
    };
  };