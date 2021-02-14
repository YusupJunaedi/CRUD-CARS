import Axios from "axios";


export const getAllCars = () => {
  const URI = `http://localhost:8000/post/`;
  return Axios.get(URI)
};

