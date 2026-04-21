import { useState, useRef, useCallback } from "react";
import useFocusSession from "./useFocusSession";
import useTimerInterval from "./useTimerInterval";
import useTimerToast from "./useTimerToast";
import { TIMER_STATUS } from "./timerConstants";
import { calcRemaining } from "./timerUtils";

function useTimer(studyId, durationSec) {
  const [timerStatus, setTimerStatus] = useState(TIMER_STATUS.IDLE);
  const [earnedPoint, setEarnedPoint] = useState(0);
  // 페이지 재진입 시 타이머 설정 시간 표시용
  const [sessionDuration, setSessionDuration] = useState(null);
  // 페이지 재진입 시 타이머가 paused 상태인지 여부 (재개 팝업 표시용)
  const [shouldShowResumePopup, setShouldShowResumePopup] = useState(false);

  // 선택한 세션 정보
  const [selectedSession, setSelectedSession] = useState(null);
  // 사용자가 설정한 세션 제목
  const [currentTitle, setCurrentTitle] = useState(null);

  const sessionIdRef = useRef(null);
  const isCompletingRef = useRef(false); // 타이머 완료 API 중복 호출 방어 플래그

  const { toast, toastComplete, toastPause, toastError } = useTimerToast();

  const { sessions, shouldShowSessionList, createSession, updateSession } =
    useFocusSession(studyId);

  // 타이머 완료 처리: failed=true일 경우 포인트 미지급
  const handleComplete = useCallback(
    async ({ action = TIMER_STATUS.COMPLETED, isAuto = false } = {}) => {
      if (isCompletingRef.current) return;
      isCompletingRef.current = true;

      try {
        const data = await updateSession(sessionIdRef.current, action);
        const pointResult = data.earnedPoint ?? 0;
        if (action === TIMER_STATUS.COMPLETED) setEarnedPoint(pointResult);
        toastComplete(action, pointResult, isAuto);
        setTimerStatus(data.status);
      } catch (e) {
        isCompletingRef.current = false;
        toastError(e.userMessage);
      }
    },
    [toastComplete, toastError, updateSession],
  );

  const { timeLeft, setTimeLeft, setEndTime, resetEndTime } = useTimerInterval({
    timerStatus,
    onComplete: handleComplete,
  });

  // 세션 선택 시 호출 (SessionListModal에서 클릭 시)
  const selectSession = async (session) => {
    // 선택한 세션 저장
    setSelectedSession(session);
    sessionIdRef.current = session.id;
    setEarnedPoint(session.earnedPoint ?? 0);
    setCurrentTitle(session.title); // 세션 선택 시 제목 저장

    if (session.status === TIMER_STATUS.RUNNING) {
      const remaining = calcRemaining(session.endTime);

      // 타이머가 돌아가는 도중 페이지를 나갔는데, 돌아왔을 때 타이머 시간이 다 지나버린 경우
      if (remaining <= 0) {
        handleComplete({ action: TIMER_STATUS.COMPLETED, isAuto: true });
        return;
      }

      // 서버에 paused로 요청
      await updateSession(session.id, TIMER_STATUS.PAUSED);

      resetEndTime();
      setTimeLeft(remaining);
      setTimerStatus(TIMER_STATUS.PAUSED);
      setSessionDuration(session.durationSec);
      setShouldShowResumePopup(true);
    } else if (session.status === TIMER_STATUS.PAUSED) {
      const remaining = calcRemaining(session.endTime, session.pausedAt);

      resetEndTime();
      setTimeLeft(remaining > 0 ? remaining : 0);
      setTimerStatus(TIMER_STATUS.PAUSED);
      setSessionDuration(session.durationSec);
      setShouldShowResumePopup(true);
    }
  };

  const start = async (title) => {
    try {
      const data = await createSession({ durationSec, title });
      sessionIdRef.current = data.id;
      setEndTime(new Date(data.endTime));
      setTimeLeft(durationSec);
      setTimerStatus(data.status);
      setCurrentTitle(title);
    } catch (e) {
      toastError(e.userMessage);
      throw e;
    }
  };

  // 일시 정지 (interval만 멈추고 endTimeRef 유지)
  const pause = async () => {
    try {
      const data = await updateSession(
        sessionIdRef.current,
        TIMER_STATUS.PAUSED,
      );
      setTimerStatus(data.status);
      toastPause();
    } catch (e) {
      toastError(e.userMessage);
    }
  };

  const resume = async () => {
    try {
      const requestedAt = Date.now(); // 네트워크 요청 직전 시각
      const data = await updateSession(
        sessionIdRef.current,
        TIMER_STATUS.RUNNING,
      );
      // 요청~응답 사이 경과 시간만큼 endTime을 앞당겨 네트워크 딜레이 보정
      const elapsed = Date.now() - requestedAt;
      setEndTime(new Date(new Date(data.endTime).getTime() - elapsed));
      setTimerStatus(data.status);
    } catch (e) {
      toastError(e.userMessage);
    }
  };

  return {
    timerStatus,
    timeLeft,
    earnedPoint,
    start,
    pause,
    resume,
    complete: (options) => handleComplete(options),
    toast,
    sessionDuration,
    shouldShowResumePopup,
    sessions,
    shouldShowSessionList,
    selectSession,
    selectedSession,
    currentTitle,
  };
}

export default useTimer;
