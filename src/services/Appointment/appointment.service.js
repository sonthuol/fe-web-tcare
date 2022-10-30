import axios from "axios";
import authHeader from "../Auth/auth-header";
const API_URL = "http://localhost:8080/api/appointment";

const appointmentByDoctorAndDay = async (doctorId, day) => {
  return await axios.get(
    API_URL + "/" + doctorId + "?day=" + day,
    { id: doctorId },
    { headers: authHeader() }
  );
};

const getMedicalRecordDetails = async (id) => {
  return await axios.get(
    API_URL + "/details/" + id,
    { id: id },
    { headers: authHeader() }
  );
};

export default {
  appointmentByDoctorAndDay,
  getMedicalRecordDetails,
};
