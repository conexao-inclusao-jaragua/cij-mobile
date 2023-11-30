import axios from "axios";

const api = axios.create({
  baseURL: "https://ec2-18-228-222-57.sa-east-1.compute.amazonaws.com:3040",
  // baseURL: "http://192.168.1.7:3040",
  withCredentials: false,
});

export default api;
