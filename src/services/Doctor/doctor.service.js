import axios from "axios";
import authHeader from "../Auth/auth-header";
const API_URL = "http://localhost:8080/api/doctors";

const getAllDoctors = async () => {
  return await axios.get(API_URL, { headers: authHeader() });
};

const createNewDoctor = async (data) => {
  return await axios.post(API_URL, data, { headers: authHeader() });
};

const deleteDoctor = async (id, user) => {
  return await axios.patch(
    API_URL + "/" + id,
    { id: id, user: user },
    { headers: authHeader() }
  );
};

const doctorDetails = async (id) => {
  return await axios.get(API_URL + "/" + id, { headers: authHeader() });
};

const updateDoctor = async (id, data) => {
  return await axios.put(API_URL + "/" + id, data, { headers: authHeader() });
};

const changeStatus = async (id, status, userId) => {
  return await axios.patch(
    API_URL + "/changeStatus/" + id,
    { id: id, isActive: status, userId: userId },
    {
      headers: authHeader(),
    }
  );
};

const getAllDoctorRestore = async () => {
  return await axios.get(API_URL + "/restore", { headers: authHeader() });
};

const restore = async (id) => {
  return await axios.patch(
    API_URL + "/restore/" + id,
    { id: id },
    { headers: authHeader() }
  );
};

const deleteRestore = async (id) => {
  return await axios.delete(
    API_URL + "/restore/" + id,
    { id: id },
    { headers: authHeader() }
  );
};

const setCurrentClinic = async (id) => {
  return await axios
    .get(
      API_URL + "/doctorBelongClinic/" + id,
      { id: id },
      { headers: authHeader() }
    )
    .then((response) => {
      console.log(response);
      localStorage.setItem("clinic", JSON.stringify(response.data.data[0]));
    });
};

const getCurrentDoctor = () => {
  return JSON.parse(localStorage.getItem("doctor"));
};

export default {
  createNewDoctor,
  getAllDoctors,
  changeStatus,
  doctorDetails,
  updateDoctor,
  deleteDoctor,
  getAllDoctorRestore,
  restore,
  deleteRestore,
  setCurrentClinic,
  getCurrentDoctor,
};
