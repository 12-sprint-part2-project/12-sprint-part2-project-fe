import formatTime from "../../formatTime";
import styles from "./TimerSetting.module.css";

const PRESETS = [15, 25, 50];

function TimerSetting({
  durationSec,
  isEditing,
  isActive,
  onSelectPreset,
  onSelectCustom,
}) {
  // 타이머 진행 중/일시중지: 타이머 설정 시간 표시
  if (isActive) {
    return (
      <div className={styles.timerSetTime}>
        <span className={`ic timer ${styles.timerSetIcon}`}></span>
        <span className={styles.timerSetValue}>{formatTime(durationSec)}</span>
      </div>
    );
  }

  return (
    <div className={styles.timerPresets}>
      {/* 프리셋 버튼: 버튼 클릭 시 15분/25분/50분 시간 설정 */}
      {PRESETS.map((min) => (
        <button
          key={min}
          type="button"
          className={`
                    ${styles.presetBtn} 
                    ${!isEditing && durationSec === min * 60 ? styles.active : ""}
                  `}
          onClick={() => onSelectPreset(min)}
        >
          {min}분
        </button>
      ))}
      {/* 직접 입력 버튼: 버튼 클릭 시 분/초 직접 설정 */}
      <button
        type="button"
        className={`${styles.presetBtn} ${isEditing ? styles.active : ""}`}
        onClick={onSelectCustom}
      >
        직접 입력
      </button>
    </div>
  );
}

export default TimerSetting;
