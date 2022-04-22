import axios from "axios";
import authHeader from "../Auth/auth-header";
const API_URL = "http://localhost:8080/api/schedules";

const createNewSchedule = async (data) => {
  return await axios.post(API_URL, data, { headers: authHeader() });
};

export default {
  createNewSchedule,
};
