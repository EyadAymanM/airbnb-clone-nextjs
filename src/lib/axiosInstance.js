import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export const setAuthToken = (token) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => {
      // console.error("Request error:", error);
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;