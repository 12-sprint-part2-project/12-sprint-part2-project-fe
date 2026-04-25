import { ERROR_CODES } from "./errorCodes";

export const ERROR_MESSAGES = {
  [ERROR_CODES.STUDY_NOT_FOUND]: "해당 스터디를 찾을 수 없습니다.",
  [ERROR_CODES.HABIT_NOT_FOUND]: "해당 습관을 찾을 수 없습니다.",
  [ERROR_CODES.HABIT_LOG_NOT_FOUND]: "해당 습관 기록을 찾을 수 없습니다.",
  [ERROR_CODES.FOCUS_NOT_FOUND]: "해당 집중 세션을 찾을 수 없습니다.",
  [ERROR_CODES.VALIDATION_ERROR]: "입력값을 다시 확인해주세요.",
  [ERROR_CODES.INVALID_PASSWORD]: "비밀번호가 일치하지 않습니다.",
  [ERROR_CODES.UNAUTHORIZED]: "스터디 비밀번호 인증 후 이용해주세요.",
  [ERROR_CODES.CONFLICT]: "이미 존재하는 정보입니다.",
  [ERROR_CODES.DUPLICATE_FOCUS_TITLE]: "이미 사용 중인 집중 세션 제목입니다.",
  [ERROR_CODES.FOCUS_ALREADY_COMPLETED]:
    "이미 종료된 집중 세션은 변경할 수 없습니다.",
  [ERROR_CODES.INTERNAL_ERROR]:
    "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

export const getErrorMessage = (code) =>
  ERROR_MESSAGES[code] ?? "알 수 없는 오류가 발생했습니다.";
