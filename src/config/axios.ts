import axios from "axios";

const API_VERSION = "/api/v1";

const axiosConfig = axios.create({
  //   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + API_VERSION,
  baseURL: "https://api.escuelajs.co" + API_VERSION,
  headers: {
    Accept: "application/json",
  },
});

export default axiosConfig;
