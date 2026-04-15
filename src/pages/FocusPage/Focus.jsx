import { useNavigate, useParams } from "react-router-dom";
import NavButton from "../../components/NavButton/NavButton";
import BoxHeaderInfo from "../../components/BoxHeader/BoxHeaderInfo";
import useTimer, { TIMER_STATUS } from "../../hooks/useTimer";
import formatTime from "./formatTime";
import styles from "./Focus.module.css";

function Focus() {
  const navigate = useNavigate();
  const { studyId } = useParams();

  const {
    timerStatus,
    timeLeft,
    initialSeconds,
    earnedPoint,
    start,
    pause,
    resume,
  } = useTimer();

  const isRunning = timerStatus === TIMER_STATUS.RUNNING;
  const isPaused = timerStatus === TIMER_STATUS.PAUSED;
  const isCompleted = timerStatus === TIMER_STATUS.COMPLETED;
  const isIdle = timerStatus === TIMER_STATUS.IDLE;

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h2 className={styles.title}>연우의 개발공장</h2>
          <div className={styles.nav}>
            <NavButton
              label="오늘의 습관"
              onClick={() => navigate(`/studies/${studyId}/habits`)}
            />
            <NavButton label="홈" onClick={() => navigate("/")} />
          </div>
        </div>

        <div>
          <BoxHeaderInfo type="point" info={earnedPoint} />
        </div>
      </div>

      <div className={styles.timerSection}>
        <div className={styles.timerSectionheader}>
          <h3 className={styles.timerTitle}>오늘의 집중</h3>

          {(isRunning || isPaused) && (
            <div className={styles.timerPresetTime}>
              <span className={`ic timer ${styles.timerPresetIcon}`}></span>
              <span className={styles.timerPresetValue}>
                {formatTime(initialSeconds)}
              </span>
            </div>
          )}
        </div>

        <p
          className={`${styles.timerDisplay} ${isRunning || isPaused ? styles.timerActive : ""}`}
        >
          {formatTime(isCompleted ? initialSeconds : timeLeft)}
        </p>

        <div className={styles.btnContainer}>
          {isIdle || isCompleted ? (
            <button
              type="button"
              className={styles.timerStartButton}
              onClick={start}
            >
              <span className="ic play"></span>
              Start!
            </button>
          ) : (
            <>
              <button
                type="button"
                className={styles.timerPauseButton}
                onClick={pause}
                disabled={isPaused}
              >
                <span className="ic pause"></span>
              </button>

              <button
                type="button"
                className={styles.timerStartButton}
                disabled={isRunning || isPaused}
              >
                <span className="ic play"></span>
                Start!
              </button>

              <button
                type="button"
                className={styles.timerRestartButton}
                onClick={resume}
                disabled={isRunning}
              >
                <span className="ic restart"></span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Focus;
