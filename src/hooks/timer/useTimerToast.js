import { useCallback } from "react";
import useToast from "../useToast";
import { TIMER_STATUS } from "./timerConstants";

function useTimerToast() {
  const { toast, showToast } = useToast();

  const toastComplete = useCallback(
    (action, point) => {
      if (action === TIMER_STATUS.COMPLETED) {
        showToast("success", "포인트를 획득했습니다!", point);
      } else if (action === TIMER_STATUS.FAILED) {
        showToast("warning", "집중이 종료되어 포인트가 지급되지 않습니다.");
      }
    },
    [showToast],
  );

  const toastPause = useCallback(
    () => showToast("warning", "집중이 중단되었습니다."),
    [showToast],
  );

  const toastError = useCallback(
    (msg) => showToast("warning", msg),
    [showToast],
  );

  return { toast, toastComplete, toastPause, toastError };
}

export default useTimerToast;
