import api from "./instance";

// 집중 세션 조회
export const getFocusSession = (studyId) =>
  api.get(`/studies/${studyId}/focus-sessions`);

// 집중 세션 생성 (시작)
export const createFocusSession = (studyId, body) =>
  api.post(`/studies/${studyId}/focus-sessions`, body);

// 집중 세션 상태 변경 (일시정지/다시시작/종료)
export const updateFocusSession = (studyId, sessionId, body) =>
  api.patch(`/studies/${studyId}/focus-sessions/${sessionId}`, body);
