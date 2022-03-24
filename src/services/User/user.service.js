import axios from "axios";
import authHeader from "../Auth/auth-header";
const API_URL = "http://localhost:8080/api/user";

const getAllUser = async () => {
  return await axios.get(API_URL + "/get-all-user", { headers: authHeader() });
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

const changeStatus = async (id, status, userId) => {
  return await axios.patch(
    API_URL + "/changeStatus/" + id,
    { id: id, status: status, userId: userId },
    {
      headers: authHeader(),
    }
  );
};

const deleteClinic = async (id, user) => {
  return await axios.patch(
    API_URL + "/" + id,
    { id: id, user: user },
    { headers: authHeader() }
  );
};
export default {
  getAllUser,
  // clinicDetails,
  // createNewClinic,
  // deleteClinic,
  // updateClinic,
  // changeStatus,
};
