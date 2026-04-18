import React from "react";
import Modal from "../../../../components/Modal/Modal";

const SharingModal = ({ setShowModal, title, url, onClickConfirm }) => {
  return (
    <div>
      <Modal
        setShowModal={setShowModal}
        title={title}
        hasCancel={false}
        hasExit={true}
        confirmText="복사하기"
        innerComponent={<p>{url}</p>}
        onClickConfirm={onClickConfirm}
      />
    </div>
  );
};

export default SharingModal;
