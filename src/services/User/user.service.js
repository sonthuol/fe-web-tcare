import axios from "axios";
import authHeader from "../Auth/auth-header";
const API_URL = "http://localhost:8080/api/user";

const getAllUser = async () => {
  return await axios.get(API_URL + "/get-all-user", { headers: authHeader() });
};

const userDetails = async (id) => {
  return await axios.get(API_URL + "/" + id, { headers: authHeader() });
};

const updateUser = async (id, data) => {
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

const deleteUser = async (id, user) => {
  return await axios.patch(
    API_URL + "/" + id,
    { id: id, user: user },
    { headers: authHeader() }
  );
};

const setCurrentClinic = async (id) => {
  return await axios
    .get(
      API_URL + "/userBelongClinic/" + id,
      { id: id },
      { headers: authHeader() }
    )
    .then((response) => {
      console.log(response);
      localStorage.setItem("clinic", JSON.stringify(response.data.data[0]));
    });
};

const setCurrentDoctor = async (id) => {
  return await axios
    .get(
      API_URL + "/userBelongDoctor/" + id,
      { id: id },
      { headers: authHeader() }
    )
    .then((response) => {
      console.log(response);
      localStorage.setItem("doctor", JSON.stringify(response.data.data[0]));
    });
};

export default {
  getAllUser,
  userDetails,
  updateUser,
  deleteUser,
  changeStatus,
  setCurrentClinic,
  setCurrentDoctor,
};
