import axios from "axios";
import { getErrorMessage } from "../constants/errorMessages";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const sessionId = localStorage.getItem("sessionId");
  if (sessionId) {
    const timestamp = Number(sessionId.split("-")[0]);
    const ONE_HOUR = 1000 * 60 * 60;
    if (Date.now() - timestamp > ONE_HOUR) {
      localStorage.removeItem("sessionId");
    } else {
      config.headers["x-session-id"] = sessionId;
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const code = error.response?.data?.code;
    error.code = code;
    error.userMessage = getErrorMessage(code);
    return Promise.reject(error);
  },
);

export default api;
