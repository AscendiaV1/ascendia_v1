import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
  if (token) {
    config.headers["X-CSRF-TOKEN"] = token;
  }
  return config;
});

export default axiosInstance;
