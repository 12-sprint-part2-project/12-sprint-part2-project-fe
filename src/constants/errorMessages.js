import { ERROR_CODES } from "./errorCodes";

export const ERROR_MESSAGES = {
  [ERROR_CODES.NOT_FOUND]: "해당 리소스를 찾을 수 없습니다.",
  [ERROR_CODES.VALIDATION_ERROR]: "입력값을 다시 확인해주세요.",
  [ERROR_CODES.UNAUTHORIZED]: "스터디 비밀번호 인증이 필요합니다.",
  [ERROR_CODES.CONFLICT]: "이미 존재하는 정보합니다.",
  [ERROR_CODES.INTERNAL_ERROR]:
    "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

export const getErrorMessage = (code) =>
  ERROR_MESSAGES[code] ?? "알 수 없는 오류가 발생했습니다.";
