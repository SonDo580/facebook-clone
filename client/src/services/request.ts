import axios from "axios";

// TODO: use live server url in production mode
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export { axiosInstance };
