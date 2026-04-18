import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudyDetail } from "../../api/studies";
import BoxHeaderInfo from "../../components/BoxHeader/BoxHeaderInfo";
import NavButton from "../../components/NavButton/NavButton";
import Toast from "../../components/Toast/Toast";
import useTimer, { TIMER_STATUS } from "../../hooks/useTimer";
import formatTime from "./formatTime";
import styles from "./Focus.module.css";

function Focus() {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const [study, setStudy] = useState(null);

  const [durationMin, setDurationMin] = useState(25);

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const res = await getStudyDetail(studyId);
        const { data } = res.data;
        console.log(data);
        setStudy(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchStudy();
  }, [studyId]);

  const { timerStatus, timeLeft, earnedPoint, start, pause, resume, toast } =
    useTimer(studyId, durationMin);

  const isRunning = timerStatus === TIMER_STATUS.RUNNING;
  const isPaused = timerStatus === TIMER_STATUS.PAUSED;
  const isCompleted = timerStatus === TIMER_STATUS.COMPLETED;
  const isIdle = timerStatus === TIMER_STATUS.IDLE;

  return (
    <section className={styles.container}>
      {toast && (
        <Toast type={toast.type} text={toast.text} point={toast.point} />
      )}

      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h2 className={styles.title}>
            {study?.nickname}의 {study?.title}
          </h2>
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
            <div className={styles.timerSetTime}>
              <span className={`ic timer ${styles.timerSetIcon}`}></span>
              <span className={styles.timerSetValue}>
                {formatTime(durationMin)}
              </span>
            </div>
          )}
        </div>

        <p
          className={`${styles.timerDisplay} ${isRunning || isPaused ? styles.timerActive : ""}`}
        >
          {formatTime(isCompleted ? durationMin : timeLeft)}
        </p>

        <div className={styles.btnContainer}>
          {isIdle || isCompleted ? (
            <button
              type="button"
              className={`${styles.btnBase} ${styles.timerStartButton}`}
              onClick={start}
            >
              <span className="ic play"></span>
              Start!
            </button>
          ) : (
            <>
              <button
                type="button"
                className={`${styles.btnBase} ${styles.btnCircle} ${styles.timerPauseButton}`}
                onClick={pause}
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
