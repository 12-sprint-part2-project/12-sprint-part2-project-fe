import axios from "axios";
import { getErrorMessage } from "../constants/errorMessages";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // 모든 요청에, 쿠키를 자동으로 포함시킴. (세션 체크를 위함.)
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
