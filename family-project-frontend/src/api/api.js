import axios from "axios";

const api = axios.create({
  baseURL: "https://family-backend-v3jv.onrender.com/api",
});

export default api;
