import axios from "axios";

const api = axios.create({
  // baseURL: "http://ec2-15-228-164-199.sa-east-1.compute.amazonaws.com:3040",
  baseURL: "http://192.168.1.7:3040",
  withCredentials: false,
});

export default api;
