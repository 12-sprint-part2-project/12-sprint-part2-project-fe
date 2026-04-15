import { useState, useEffect, useRef, useCallback } from "react";

export const TIMER_STATUS = {
  IDLE: "idle", // 시작 전
  RUNNING: "running", // 진행 중
  PAUSED: "paused", // 일시 정지
  COMPLETED: "completed", // 종료
};

const DURATION_MIN = 1;

function useTimer() {
  const initialSeconds = DURATION_MIN * 60;

  const [timerStatus, setTimerStatus] = useState(TIMER_STATUS.IDLE);
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [earnedPoint, setEarnedPoint] = useState(0);

  // Date.now와 종료 시각을 기준으로 남은 시간 계산
  const endTimeRef = useRef(null);
  // 현재 실행 중인 Interval의 ID
  const intervalIdRef = useRef(null);

  const handleComplete = useCallback(async () => {
    try {
      setEarnedPoint(0); // API 연동 후 실제 획득한 포인트로 업데이트 예정
      setTimerStatus(TIMER_STATUS.COMPLETED);
    } catch (e) {
      console.error("세션 완료 실패", e);
    }
  }, []);

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
      // 현재 시간과 설정 시간을 더해 종료 시각 설정
      endTimeRef.current = new Date(Date.now() + DURATION_MIN * 60 * 1000);
      setTimeLeft(DURATION_MIN * 60);
      setTimerStatus(TIMER_STATUS.RUNNING);
    } catch (e) {
      console.error("세션 시작 실패", e);
    }
  };

  // 일시 정지 (interval만 멈추고 endTimeRef 유지)
  const pause = () => {
    setTimerStatus(TIMER_STATUS.PAUSED);
  };

  const resume = async () => {
    // 일시정지 시점의 남은 시간을 현재 시각에 더해 종료 시각을 재설정
    endTimeRef.current = new Date(Date.now() + timeLeft * 1000);
    setTimerStatus(TIMER_STATUS.RUNNING);
  };

  return {
    timerStatus,
    timeLeft,
    initialSeconds,
    earnedPoint,
    start,
    pause,
    resume,
  };
}

export default useTimer;
