import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000/api/',
//    withCredentials: true,
});

const useAxiosSecure = () => {
  return [axiosSecure];
};

export default useAxiosSecure;
