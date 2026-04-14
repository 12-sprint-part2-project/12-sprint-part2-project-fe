import React from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

//title : 모달 제목
//innerComponent : 모달 내부에 들어갈 컴포넌트
//cancelText : 취소 버튼 텍스트, 없으면 "취소"로 들어감.
//confirmText : 확인 버튼 텍스트, 없으면 "수정 완료"로 들어감. (이 모달의 기본 목적이 습관 수정 모달이라서)
const Mordal = ({
  setShowModal,
  title,
  innerComponent,
  confirmText,
  cancelText,
  onClickConfirm,
  onClickCancel,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>{title || "모달 제목"}</h2>
        <div>{innerComponent}</div>
        <div className={styles.modalButtons}>
          <div className={styles.modalButton}>
            <Button
              variant="cancel"
              label={cancelText || "취소"}
              onClick={() => {
                setShowModal(false);
                onClickCancel && onClickCancel();
              }}
            />
          </div>
          <div className={styles.modalButton}>
            <Button
              variant="create"
              label={confirmText || "수정 완료"}
              onClick={() => {
                setShowModal(false);
                onClickConfirm && onClickConfirm();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mordal;
