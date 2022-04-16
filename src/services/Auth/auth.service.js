import axios from "axios";
// const API_URL = process.env.API_URL + "auth/";
const API_URL = "http://localhost:8080/api/auth/";
const register = (
  username,
  email,
  password,
  roles,
  fullname,
  address,
  phoneNumber
) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    roles,
    fullname,
    phoneNumber,
    address,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      console.log(response);
      if (response.data.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      return response.data.data;
    });
};

const logout = () => {
  // localStorage.removeItem("user");
  localStorage.clear();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
