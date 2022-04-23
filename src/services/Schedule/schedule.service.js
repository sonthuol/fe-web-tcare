import axios from "axios";
import authHeader from "../Auth/auth-header";
const API_URL = "http://localhost:8080/api/schedules";

const createNewSchedule = async (data) => {
  return await axios.post(API_URL, data, { headers: authHeader() });
};

const scheduleByDoctorAndDay = async (doctorId, day) => {
  return await axios.get(
    API_URL + "/" + doctorId + "?day=" + day,
    { id: doctorId },
    { headers: authHeader() }
  );
};

export default {
  createNewSchedule,
  scheduleByDoctorAndDay,
};
