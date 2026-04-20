import styles from "./SessionTitleInput.module.css";

function SessionTitleInput({ value, onChange }) {
  return (
    <div className={styles.inputElement}>
      <label htmlFor="session-title" className={styles.label}>
        집중 세션 제목
      </label>
      <input
        type="text"
        id="session-title"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="집중 세션 제목을 입력하세요"
      />
      <div className={styles.helperText}>
        세션 제목은 생성 후 수정할 수 없습니다.
      </div>
    </div>
  );
}

export default SessionTitleInput;
