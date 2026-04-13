// axios 설치 후 주석 해제
// import axios from "axios";
// import { getErrorMessage } from "../constants/errorMessages";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// api.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     const code = error.response?.data?.code;
//     error.code = code;
//     error.userMessage = getErrorMessage(code);
//     return Promise.reject(error);
//   }
// );

// export default api;
