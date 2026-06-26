import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_AI_SERVICE_URL || "http://127.0.0.1:8000",
});

export const nodeApi = axios.create({
  baseURL: import.meta.env.VITE_NODE_API_URL || "http://localhost:5000",
  withCredentials: true,
});

export default api;
