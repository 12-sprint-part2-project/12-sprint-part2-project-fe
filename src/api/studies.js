import api from "./instance";

// 스터디 목록 조회
export const getStudies = (params) => api.get("/studies", { params });

// 스터디 생성
export const createStudy = (body) => api.post("/studies", body);

// 스터디 상세 조회
export const getStudyDetail = (studyId) => api.get(`/studies/${studyId}`);

// 스터디 수정
export const updateStudy = (studyId, body) =>
  api.patch(`/studies/${studyId}`, body);

// 스터디 삭제
export const deleteStudy = (studyId) => api.delete(`/studies/${studyId}`);

// 비밀번호 검증
export const verifyPassword = (studyId, body) =>
  api.post(`/studies/${studyId}/verify-password`, body);

// 응원 이모지 추가
export const addEmoji = (studyId, body) =>
  api.post(`/studies/${studyId}/emojis`, body);
