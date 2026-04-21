import Modal from "../../../../components/Modal/Modal";
import styles from "./SessionTitleModal.module.css";

function SessionTitleModal({
  title,
  titleError,
  onChangeTitle,
  onConfirm,
  onClose,
}) {
  const isInvalid = !!titleError || (title.length > 0 && !title.trim());

  const inner = (
    <div className={styles.inputElement}>
      <label htmlFor="session-title" className={styles.label}>
        집중 세션 제목
      </label>
      <input
        type="text"
        id="session-title"
        className={`${styles.input} ${isInvalid ? styles.inputError : ""}`}
        value={title}
        onChange={(e) => onChangeTitle(e.target.value)}
        placeholder="집중 세션 제목을 입력하세요"
      />
      <div className={`${styles.helperText} ${isInvalid ? styles.error : ""}`}>
        {isInvalid
          ? titleError || "제목을 입력해주세요."
          : "세션 제목은 생성 후 수정할 수 없습니다."}
      </div>
    </div>
  );

  return (
    <Modal
      title="세션 생성"
      setShowModal={onClose}
      confirmText="생성"
      innerComponent={inner}
      onClickConfirm={onConfirm}
      preventAutoClose={true}
    />
  );
}

export default SessionTitleModal;
