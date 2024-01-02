import axios from "axios";

const baseURL = import.meta.env.PROD
  ? (import.meta.env.VITE_SERVER_URL as string)
  : "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export { axiosInstance };
