import axios from "axios";
import authHeader from "../Auth/auth-header";
const API_URL = "http://localhost:8080/api/doctors";

const getAllDoctors = async () => {
  return await axios.get(API_URL, { headers: authHeader() });
};

const createNewDoctor = async (data) => {
  return await axios.post(API_URL, data, { headers: authHeader() });
};

export default {
  createNewDoctor,
  getAllDoctors,
};
