import actionType from "../actions/actionType";

let initialState = {
  data: [],
  editData: {},
  isPending: false,
  isFulfilled: false,
  isRejected: false,
};

const car = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case actionType.getAllCars + "_PENDING":
      return {
        ...prevState,
        isPending: true,
      };
    case actionType.getAllCars + "_REJECTED":
      return {
        ...prevState,
        isRejected: true,
        isPending: false,
      };
    case actionType.getAllCars + "_FULFILLED":
      return {
        ...prevState,
        isFulfilled: true,
        isPending: false,
        data: payload.data.reverse(),
        isRejected: false,
      };
      case actionType.editData:
      return {
        ...prevState,
        editData: payload
      };
    default:
      return prevState;
  }
};


export default car;
