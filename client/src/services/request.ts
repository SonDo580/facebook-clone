import axios from "axios";

const baseURL = import.meta.env.PROD
  ? (import.meta.env.VITE_SERVER_URL as string)
  : "http://localhost:5000";

console.log(baseURL);

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export { axiosInstance };
