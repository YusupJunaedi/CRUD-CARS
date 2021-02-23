import actionType from "../actions/actionType";

let initialState = {
  data: [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
};

const car = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case actionType.getAllMotors + "_PENDING":
      return {
        ...prevState,
        isPending: true,
      };
    case actionType.getAllMotors + "_REJECTED":
      return {
        ...prevState,
        isRejected: true,
        isPending: false,
      };
    case actionType.getAllMotors + "_FULFILLED":
      return {
        ...prevState,
        isFulfilled: true,
        isPending: false,
        data: payload.data.reverse(),
        isRejected: false,
      };
    default:
      return prevState;
  }
};


export default car;
