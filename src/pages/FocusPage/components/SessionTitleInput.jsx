import styles from "./SessionTitleInput.module.css";

function SessionTitleInput({ value, onChange, errorMessage }) {
  const isInvalid = !!errorMessage || (value.length > 0 && !value.trim());

  return (
    <div className={styles.inputElement}>
      <label htmlFor="session-title" className={styles.label}>
        집중 세션 제목
      </label>
      <input
        type="text"
        id="session-title"
        className={`${styles.input} ${isInvalid ? styles.inputError : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="집중 세션 제목을 입력하세요"
      />
      <div className={`${styles.helperText} ${isInvalid ? styles.error : ""}`}>
        {isInvalid
          ? errorMessage || "제목을 입력해주세요."
          : "세션 제목은 생성 후 수정할 수 없습니다."}
      </div>
    </div>
  );
}

export default SessionTitleInput;
