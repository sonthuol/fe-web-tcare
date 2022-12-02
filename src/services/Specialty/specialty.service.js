import axios from "axios";
import authHeader from "../Auth/auth-header";
const API_URL = "http://localhost:8080/api/specialties";

const getAllSpecialties = async () => {
  return await axios.get(API_URL, { headers: authHeader() });
};

const getFindSpecialtyBySpecialtyName = async (key) => {
  return await axios.get(
    "http://localhost:8080/api/public/specialties/find/" + key,
    {
      headers: authHeader(),
    }
  );
};

const specialtyDetails = async (id) => {
  return await axios.get(API_URL + "/" + id, { headers: authHeader() });
};

const updateSpecialty = async (id, data) => {
  return await axios.put(API_URL + "/" + id, data, { headers: authHeader() });
};

const changeStatus = async (id, status, userId) => {
  return await axios.patch(
    API_URL + "/changeStatus/" + id,
    { id: id, status: status, userId: userId },
    {
      headers: authHeader(),
    }
  );
};

const createNewSpecialty = async (data) => {
  return await axios.post(API_URL, data, { headers: authHeader() });
};

const deleteSpecialty = async (id, user) => {
  return await axios.patch(
    API_URL + "/" + id,
    { id: id, user: user },
    { headers: authHeader() }
  );
};

const getAllSpecialtyRestore = async () => {
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

export default {
  getAllSpecialties,
  changeStatus,
  createNewSpecialty,
  specialtyDetails,
  updateSpecialty,
  deleteSpecialty,
  getAllSpecialtyRestore,
  restore,
  deleteRestore,
  getFindSpecialtyBySpecialtyName,
};
