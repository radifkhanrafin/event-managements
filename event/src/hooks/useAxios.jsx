import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: true,
});

// Add request interceptor to attach token globally
axiosSecure.interceptors.request.use(
  (config) => {
    const localData = JSON.parse(localStorage.getItem("user"));
    if (localData?.token) {
      config.headers.Authorization = `Bearer ${localData.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const useAxiosSecure = () => {
  return [axiosSecure];
};

export default useAxiosSecure;
