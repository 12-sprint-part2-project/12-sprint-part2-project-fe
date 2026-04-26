import Modal from "../../../../components/Modal/Modal";
import styles from "./SharingModal.module.css";

const SharingModal = ({ setShowModal, title, url, onClickConfirm }) => {
  return (
    <div>
      <Modal
        setShowModal={setShowModal}
        title={title}
        hasCancel={false}
        hasExit={true}
        confirmText="복사하기"
        innerComponent={<p className={styles.url}>{url}</p>}
        onClickConfirm={onClickConfirm}
      />
    </div>
  );
};

export default SharingModal;
