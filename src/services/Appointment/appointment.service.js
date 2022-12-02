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

const getAllMedicalRecordByDoctorId = async (doctorId) => {
  return await axios.get(
    "http://localhost:8080/api/medical-records/get-all-medical-record-by-doctor-id/" +
      doctorId,
    { headers: authHeader() }
  );
};

const updateStatusAppointment = async (id, status) => {
  return await axios.put(
    "http://localhost:8080/api/medical-records/update-status-by-medical-record-id/" +
      id,
    { status: status + 1 },
    { headers: authHeader() }
  );
};

export default {
  appointmentByDoctorAndDay,
  getMedicalRecordDetails,
  getAllMedicalRecordByDoctorId,
  updateStatusAppointment,
};
