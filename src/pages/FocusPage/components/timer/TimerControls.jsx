import styles from "./TimerControls.module.css";

function TimerControls({
  isIdle,
  isCompleted,
  isPaused,
  isRunning,
  onStart,
  onPause,
  onResume,
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
        disabled={isPaused}
      >
        <span className="ic pause"></span>
      </button>

      <button
        type="button"
        className={`${styles.btnBase} ${styles.timerStartButton}`}
        disabled={isRunning || isPaused}
      >
        <span className="ic play"></span>
        Start!
      </button>

      <button
        type="button"
        className={`${styles.btnBase} ${styles.btnCircle} ${styles.timerRestartButton}`}
        onClick={onResume}
        disabled={isRunning}
      >
        <span className="ic restart"></span>
      </button>
    </>
  );
}

export default TimerControls;
