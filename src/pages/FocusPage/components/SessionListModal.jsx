import Modal from "../../../components/Modal/Modal";
import styles from "./SessionListModal.module.css";

function SessionListModal({ sessions, onSelect, onClose }) {
  const inner = (
    <div className={styles.container}>
      <p className={styles.description}>
        이 스터디에 진행 중이던 집중 세션이 있어요.
        <br />
        이어서 진행하고 싶은 세션을 선택하거나, 닫기를 눌러 새로 시작하세요.
      </p>
      <div className={styles.list}>
        {sessions.map((session) => {
          return (
            <button
              key={session.id}
              className={styles.item}
              onClick={() => onSelect(session)}
            >
              <span className={styles.title}>
                {session.title ?? "오늘의 집중"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <Modal
      title="진행 중인 집중 세션"
      hasCancel={false}
      confirmText="닫기"
      setShowModal={onClose}
      onClickConfirm={onClose}
      innerComponent={inner}
    />
  );
}

export default SessionListModal;
