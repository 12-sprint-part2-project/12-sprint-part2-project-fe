import { useState, useEffect, useRef } from "react";
import { TIMER_STATUS } from "./useTimer";

function useTimerInterval({ timerStatus, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const endTimeRef = useRef(null); // Date.now와 종료 시각을 기준으로 남은 시간 계산
  const intervalIdRef = useRef(null); // 현재 실행 중인 Interval의 ID

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
        onComplete();
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    // cleanup 함수: timerStatus 변경이나 언마운트 시 interval 제거
    return () => clearInterval(intervalIdRef.current);
  }, [timerStatus, onComplete]);

  const setEndTime = (date) => {
    endTimeRef.current = date;
  };

  const resetEndTime = () => {
    endTimeRef.current = null;
  };

  return { timeLeft, setTimeLeft, setEndTime, resetEndTime };
}

export default useTimerInterval;
