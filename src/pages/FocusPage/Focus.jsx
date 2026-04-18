import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudyDetail } from "../../api/studies";
import BoxHeaderInfo from "../../components/BoxHeader/BoxHeaderInfo";
import NavButton from "../../components/NavButton/NavButton";
import Toast from "../../components/Toast/Toast";
import useTimer, { TIMER_STATUS } from "../../hooks/useTimer";
import formatTime from "./formatTime";
import styles from "./Focus.module.css";

const PRESETS = [15, 25, 50];

function Focus() {
  const navigate = useNavigate();
  const { studyId } = useParams();

  const [study, setStudy] = useState(null);
  const [durationSec, setDurationSec] = useState(25 * 60);
  const [isEditing, setIsEditing] = useState(false);
  const [inputMin, setInputMin] = useState("25");
  const [inputSec, setInputSec] = useState("00");

  const minInputRef = useRef(null);

  useEffect(() => {
    const fetchStudy = async () => {
      const res = await getStudyDetail(studyId);
      const { data } = res.data;
      setStudy(data);
    };

    fetchStudy();
  }, [studyId]);

  const { timerStatus, timeLeft, earnedPoint, start, pause, resume, toast } =
    useTimer(studyId, durationSec);

  const isRunning = timerStatus === TIMER_STATUS.RUNNING;
  const isPaused = timerStatus === TIMER_STATUS.PAUSED;
  const isCompleted = timerStatus === TIMER_STATUS.COMPLETED;
  const isIdle = timerStatus === TIMER_STATUS.IDLE;

  // 프리셋 버튼 클릭
  const handleSelectPreset = (min) => {
    setDurationSec(min * 60);
    setIsEditing(false);
  };

  // 직접 입력 버튼 클릭
  const handleSelectCustom = () => {
    setInputMin(String(Math.floor(durationSec / 60)));
    setInputSec(String(durationSec % 60).padStart(2, "0"));
    setIsEditing(true);
    setTimeout(() => minInputRef.current?.focus(), 0);
  };

  // input 값대로 타이머 시간 설정
  const handleInputChange = (min, sec) => {
    const m = Math.min(99, Math.max(0, parseInt(min) || 1));
    const s = Math.min(59, Math.max(0, parseInt(sec) || 0));

    setInputMin(String(m));
    setInputSec(String(s).padStart(2, "0"));
    setDurationSec(Math.max(1, m * 60 + s));
  };

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

          {isIdle || isCompleted ? (
            <div className={styles.timerPresets}>
              {PRESETS.map((min) => (
                <button
                  key={min}
                  type="button"
                  className={`
                    ${styles.presetBtn} 
                    ${!isEditing && durationSec === min * 60 ? styles.active : ""}
                  `}
                  onClick={() => handleSelectPreset(min)}
                >
                  {min}분
                </button>
              ))}
              <button
                type="button"
                className={`${styles.presetBtn} ${isEditing ? styles.active : ""}`}
                onClick={handleSelectCustom}
              >
                직접 입력
              </button>
            </div>
          ) : (
            <div className={styles.timerSetTime}>
              <span className={`ic timer ${styles.timerSetIcon}`}></span>
              <span className={styles.timerSetValue}>
                {formatTime(durationSec)}
              </span>
            </div>
          )}
        </div>

        <div
          className={`${styles.timerDisplay} ${isRunning || isPaused ? styles.timerActive : ""}`}
        >
          {isEditing ? (
            <div className={styles.timerEdit}>
              <input
                ref={minInputRef}
                className={styles.timeInput}
                type="number"
                min="1"
                max="99"
                value={inputMin}
                onChange={(e) => setInputMin(e.target.value)}
                onBlur={() => handleInputChange(inputMin, inputSec)}
              />
              <span className={styles.timeSep}>:</span>
              <input
                className={styles.timeInput}
                type="number"
                min="0"
                max="59"
                value={inputSec}
                onChange={(e) => setInputSec(e.target.value)}
                onBlur={() => handleInputChange(inputMin, inputSec)}
              />
            </div>
          ) : (
            formatTime(isIdle || isCompleted ? durationSec : timeLeft)
          )}
        </div>

        <div className={styles.btnContainer}>
          {isIdle || isCompleted ? (
            <button
              type="button"
              className={`${styles.btnBase} ${styles.timerStartButton}`}
              onClick={() => {
                if (isEditing) setIsEditing(false);
                start();
              }}
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
