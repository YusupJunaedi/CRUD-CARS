import Axios from "axios";


export const getAllCars = () => {
  const URI = `http://localhost:8000/car/`;
  return Axios.get(URI)
};

