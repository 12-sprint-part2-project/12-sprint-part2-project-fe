import { useState, useEffect, useRef, useCallback } from "react";
import {
  getFocusSession,
  createFocusSession,
  updateFocusSession,
} from "../api/focus";
import useToast from "./useToast";

export const TIMER_STATUS = {
  IDLE: "idle", // 시작 전
  RUNNING: "running", // 진행 중
  PAUSED: "paused", // 일시 정지
  COMPLETED: "completed", // 종료
  FAILED: "failed",
};

function useTimer(studyId, durationSec) {
  const [timerStatus, setTimerStatus] = useState(TIMER_STATUS.IDLE);
  const [timeLeft, setTimeLeft] = useState(durationSec);
  const [earnedPoint, setEarnedPoint] = useState(0);
  // 페이지 재진입 시 타이머 설정 시간 표시용
  const [sessionDuration, setSessionDuration] = useState(null);
  // 페이지 재진입 시 타이머가 paused 상태인지 여부 (재개 팝업 표시용)
  const [shouldShowResumePopup, setShouldShowResumePopup] = useState(false);

  // 페이지 재진입 시 과거에 진행 중이던 집중 세션 목록
  const [sessions, setSessions] = useState([]);
  // 페이지 재진입 시 진행 중이던 집중 세션 목록 모달 상태
  const [shouldShowSessionList, setShouldShowSessionList] = useState(false);
  // 선택한 세션 정보
  const [selectedSession, setSelectedSession] = useState(null);

  // 사용자가 설정한 세션 제목
  const [currentTitle, setCurrentTitle] = useState(null);

  const endTimeRef = useRef(null); // Date.now와 종료 시각을 기준으로 남은 시간 계산
  const intervalIdRef = useRef(null); // 현재 실행 중인 Interval의 ID
  const sessionIdRef = useRef(null);
  const isCompletingRef = useRef(false); // 타이머 완료 API 중복 호출 방어 플래그

  const { toast, showToast } = useToast();

  // 타이머 완료 처리: failed=true일 경우 포인트 미지급
  const handleComplete = useCallback(
    async ({ action = TIMER_STATUS.COMPLETED } = {}) => {
      if (isCompletingRef.current) return;
      isCompletingRef.current = true;

      try {
        const res = await updateFocusSession(studyId, sessionIdRef.current, {
          action,
        });

        const { data } = res.data;

        if (action === TIMER_STATUS.COMPLETED) {
          const pointResult = data.earnedPoint ?? 0;
          setEarnedPoint(pointResult);
          showToast("success", "포인트를 획득했습니다!", pointResult);
        } else if (action === TIMER_STATUS.FAILED) {
          showToast("warning", "집중이 종료되어 포인트가 지급되지 않습니다.");
        }

        setTimerStatus(data.status);
      } catch (e) {
        isCompletingRef.current = false;
        showToast("warning", e.userMessage);
        console.log(e);
      }
    },
    [showToast, studyId],
  );

  // 페이지 진입 시 세션 조회
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await getFocusSession(studyId);
        const { data } = res.data;

        if (!data || data.length === 0) return;

        setSessions(data);
        setShouldShowSessionList(true);
      } catch (e) {
        showToast("warning", e.userMessage);
      }
    };

    fetchSession();
  }, [studyId, handleComplete, showToast]);

  // 세션 선택 시 호출 (SessionListModal에서 클릭 시)
  const selectSession = async (session) => {
    // 선택한 세션 저장
    setSelectedSession(session);
    sessionIdRef.current = session.id;
    setEarnedPoint(session.earnedPoint ?? 0);
    setCurrentTitle(session.title); // 세션 선택 시 제목 저장

    if (session.status === TIMER_STATUS.RUNNING) {
      const remaining = Math.ceil(
        (new Date(session.endTime).getTime() - Date.now()) / 1000,
      );

      // 타이머가 돌아가는 도중 페이지를 나갔는데, 돌아왔을 때 타이머 시간이 다 지나버린 경우
      if (remaining <= 0) {
        handleComplete();
        return;
      }

      // 서버에 paused로 요청
      await updateFocusSession(studyId, session.id, {
        action: TIMER_STATUS.PAUSED,
      });

      endTimeRef.current = null;
      setTimeLeft(remaining);
      setTimerStatus(TIMER_STATUS.PAUSED);
      setSessionDuration(session.durationSec);
      setShouldShowResumePopup(true);
    } else if (session.status === TIMER_STATUS.PAUSED) {
      const remaining = Math.ceil(
        (new Date(session.endTime).getTime() -
          new Date(session.pausedAt).getTime()) /
          1000,
      );

      endTimeRef.current = null;
      setTimeLeft(remaining > 0 ? remaining : 0);
      setTimerStatus(TIMER_STATUS.PAUSED);
      setSessionDuration(session.durationSec);
      setShouldShowResumePopup(true);
    }
  };

  // 타이머 실행
  useEffect(() => {
    if (timerStatus !== TIMER_STATUS.RUNNING) {
      clearInterval(intervalIdRef.current);
      return;
    }

    // running일 때만 타이머 동작
    intervalIdRef.current = setInterval(() => {
      if (!endTimeRef.current) return;

      // 현재 시각과 목표 종료 시각의 차이를 초 단위로 계산
      const remaining = Math.ceil(
        (endTimeRef.current.getTime() - Date.now()) / 1000,
      );

      if (remaining <= 0) {
        clearInterval(intervalIdRef.current);
        setTimeLeft(0);
        handleComplete();
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    // cleanup 함수: timerStatus 변경이나 언마운트 시 interval 제거
    return () => clearInterval(intervalIdRef.current);
  }, [timerStatus, handleComplete]);

  const start = async (title) => {
    try {
      const res = await createFocusSession(studyId, {
        durationSec,
        title,
      });

      const { data } = res.data;

      sessionIdRef.current = data.id;
      endTimeRef.current = new Date(data.endTime);
      setTimeLeft(durationSec);
      setTimerStatus(data.status);
      setCurrentTitle(title); // 시작 시 제목 저장
    } catch (e) {
      showToast("warning", e.userMessage);
    }
  };

  // 일시 정지 (interval만 멈추고 endTimeRef 유지)
  const pause = async () => {
    try {
      const res = await updateFocusSession(studyId, sessionIdRef.current, {
        action: TIMER_STATUS.PAUSED,
      });

      const { data } = res.data;

      setTimerStatus(data.status);
      showToast("warning", "집중이 중단되었습니다.");
    } catch (e) {
      showToast("warning", e.userMessage);
    }
  };

  const resume = async () => {
    try {
      const requestedAt = Date.now(); // 네트워크 요청 직전 시각

      const res = await updateFocusSession(studyId, sessionIdRef.current, {
        action: TIMER_STATUS.RUNNING,
      });

      const { data } = res.data;

      // 요청~응답 사이 경과 시간만큼 endTime을 앞당겨 네트워크 딜레이 보정
      const elapsed = Date.now() - requestedAt;
      endTimeRef.current = new Date(new Date(data.endTime).getTime() - elapsed);
      setTimerStatus(data.status);
    } catch (e) {
      showToast("warning", e.userMessage);
    }
  };

  const complete = (options) => {
    handleComplete(options);
  };

  return {
    timerStatus,
    timeLeft,
    earnedPoint,
    start,
    pause,
    resume,
    complete,
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
