import { useState, useEffect, useRef } from "react";
import { TIMER_STATUS } from "./timerConstants";

function useTimerInterval({ timerStatus, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const endTimeRef = useRef(null); // Date.now와 종료 시각을 기준으로 남은 시간 계산
  const intervalIdRef = useRef(null); // 현재 실행 중인 Interval의 ID

  // 타이머 실행
  useEffect(() => {
    // RUNNING 상태가 아니거나 종료시간이 없으면 Interva 종료
    if (timerStatus !== TIMER_STATUS.RUNNING || !endTimeRef.current) {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      return;
    }

    // 시간 계산 로직을 별도로 분리
    const updateTick = () => {
      if (!endTimeRef.current) return;

      const now = Date.now();
      const end = endTimeRef.current.getTime();
      const diff = end - now;

      const remaining = Math.max(0, Math.ceil(diff / 1000));
      setTimeLeft(remaining);

      if (remaining <= 0) {
        if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        onComplete();
      }
    };

    // 즉시 실행
    updateTick();

    // 200ms 주기로 업데이트
    intervalIdRef.current = setInterval(updateTick, 200);

    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
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
