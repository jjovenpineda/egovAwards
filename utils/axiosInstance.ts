import axios from "axios";
import { config } from "./config";
import { decrypt, tokenValue } from "./utility";

const axiosInstance = axios.create({
  baseURL: config.url,
  headers: {
    Accept: "*/*",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenValue();
    if (token) {
      console.log("token :", token);
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access, logging out... redirecting to login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
