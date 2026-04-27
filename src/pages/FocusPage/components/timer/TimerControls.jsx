import styles from "./TimerControls.module.css";

function TimerControls({
  isIdle,
  isCompleted,
  isPaused,
  isRunning,
  isUpdating,
  onStart,
  onPause,
  onResume,
  onStop,
}) {
  if (isIdle || isCompleted) {
    return (
      <button
        type="button"
        className={`${styles.btnBase} ${styles.timerStartButton}`}
        onClick={onStart}
      >
        <span className="ic play"></span>
        Start!
      </button>
    );
  }

  return (
    <>
      {/* 타이머 진행 중/일시중지: 시작, 일시정지, 재시작 버튼 모두 표시 */}
      <button
        type="button"
        className={`${styles.btnBase} ${styles.btnCircle} ${styles.timerPauseButton}`}
        onClick={onPause}
        disabled={isPaused || isUpdating}
      >
        <span className="ic pause"></span>
      </button>

      <button
        type="button"
        className={`${styles.btnBase} ${styles.timerStartButton}`}
        onClick={onResume}
        disabled={isRunning || isUpdating}
      >
        <span className="ic play"></span>
        Start!
      </button>

      <button
        type="button"
        className={`${styles.btnBase} ${styles.btnCircle} ${styles.timerRestartButton}`}
        onClick={onStop}
        disabled={isUpdating}
      >
        <span className="ic restart"></span>
      </button>
    </>
  );
}

export default TimerControls;
