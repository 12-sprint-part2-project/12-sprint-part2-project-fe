import axios from "axios";
import { getErrorMessage } from "../constants/errorMessages";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 요청 인터셉터 추가
api.interceptors.request.use((config) => {
  const sessionId = localStorage.getItem("sessionId");
  if (sessionId) {
    config.headers["x-session-id"] = sessionId;
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
