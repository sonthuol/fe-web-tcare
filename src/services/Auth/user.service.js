import axios from "axios";
import authHeader from "./auth-header";
// const API_URL = process.env.API_URL + "test/";
const API_URL = "http://localhost:8080/api/test/";
const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getRootBoard = () => {
  return axios.get(API_URL + "root", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getDoctorBoard = () => {
  return axios.get(API_URL + "doctor", { headers: authHeader() });
};

const getReceptionistBoard = () => {
  return axios.get(API_URL + "receptionist", { headers: authHeader() });
};
export default {
  getPublicContent,
  getRootBoard,
  getReceptionistBoard,
  getAdminBoard,
  getDoctorBoard,
};
