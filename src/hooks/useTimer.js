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
};

function useTimer(studyId, durationMin) {
  const initialSeconds = durationMin * 60;

  const [timerStatus, setTimerStatus] = useState(TIMER_STATUS.IDLE);
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [earnedPoint, setEarnedPoint] = useState(0);

  const endTimeRef = useRef(null); // Date.now와 종료 시각을 기준으로 남은 시간 계산
  const intervalIdRef = useRef(null); // 현재 실행 중인 Interval의 ID
  const sessionIdRef = useRef(null);

  const { toast, showToast } = useToast();

  // 타이머 완료 처리
  const handleComplete = useCallback(async () => {
    try {
      const res = await updateFocusSession(studyId, sessionIdRef.current, {
        action: TIMER_STATUS.COMPLETED,
      });

      const { data } = res.data;

      const pointResult = data.earnedPoint ?? 0;
      setEarnedPoint(pointResult);
      setTimerStatus(data.status);
      showToast("success", "포인트를 획득했습니다!", pointResult);
    } catch (e) {
      showToast("warning", e.userMessage);
    }
  }, [showToast, studyId]);

  // 페이지 진입 시 세션 조회
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await getFocusSession(studyId);

        const { data } = res.data;
        if (!data) return;

        sessionIdRef.current = data.id;
        setEarnedPoint(data.earnedPoint ?? 0);

        if (data.status === TIMER_STATUS.RUNNING) {
          // endTime 기준으로 남은 시간 계산
          const remaining = Math.ceil(
            (new Date(data.endTime).getTime() - Date.now()) / 1000,
          );

          if (remaining <= 0) {
            // 서버에선 running인데 시간이 이미 지난 경우
            handleComplete();
            return;
          }

          endTimeRef.current = new Date(data.endTime);
          setTimeLeft(remaining);
          setTimerStatus(TIMER_STATUS.RUNNING);
        } else if (data.status === TIMER_STATUS.PAUSED) {
          // paused: endTime - pausedAt 으로 남은 시간 계산
          const remaining = Math.ceil(
            (new Date(data.endTime).getTime() -
              new Date(data.pausedAt).getTime()) /
              1000,
          );

          await updateFocusSession(studyId, sessionIdRef.current, {
            action: TIMER_STATUS.RUNNING,
          });

          endTimeRef.current = new Date(Date.now() + remaining * 1000);
          setTimeLeft(remaining > 0 ? remaining : 0);
          setTimerStatus(TIMER_STATUS.RUNNING);
        }
      } catch (e) {
        showToast("warning", e.userMessage);
      }
    };

    fetchSession();
  }, [studyId, handleComplete, showToast]);

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

  const start = async () => {
    try {
      const res = await createFocusSession(studyId, {
        durationMin: durationMin,
      });

      const { data } = res.data;

      sessionIdRef.current = data.id;
      endTimeRef.current = new Date(data.endTime);
      setTimeLeft(initialSeconds);
      setTimerStatus(data.status);
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
      const requestedAt = Date.now();

      const res = await updateFocusSession(studyId, sessionIdRef.current, {
        action: TIMER_STATUS.RUNNING,
      });

      const { data } = res.data;

      const elapsed = Date.now() - requestedAt;
      endTimeRef.current = new Date(new Date(data.endTime).getTime() - elapsed);
      setTimerStatus(data.status);
    } catch (e) {
      showToast("warning", e.userMessage);
    }
  };

  return {
    timerStatus,
    timeLeft,
    earnedPoint,
    start,
    pause,
    resume,
    toast,
  };
}

export default useTimer;
