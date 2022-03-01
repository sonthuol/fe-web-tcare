import axios from "axios";
import authHeader from "../Auth/auth-header";
const API_URL = "http://localhost:8080/api/clinics";

const getAllClinics = async () => {
  return await axios.get(API_URL, { headers: authHeader() });
};

const clinicDetails = async (id) => {
  return await axios.get(API_URL + "/" + id, { headers: authHeader() });
};

const createNewClinic = async (data) => {
  return await axios.post(API_URL, data, { headers: authHeader() });
};

const updateClinic = async (id, data) => {
  return await axios.put(API_URL + "/" + id, data, { headers: authHeader() });
};

const deleteClinic = async (id) => {
  return await axios.patch(
    API_URL + "/" + id,
    { id: id },
    { headers: authHeader() }
  );
};
export default {
  getAllClinics,
  clinicDetails,
  createNewClinic,
  deleteClinic,
  updateClinic,
};
