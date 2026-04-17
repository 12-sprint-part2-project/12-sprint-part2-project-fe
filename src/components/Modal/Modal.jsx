import React from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

//title : 모달 제목
//innerComponent : 모달 내부에 들어갈 컴포넌트
//cancelText : 취소 버튼 텍스트, 없으면 "취소"로 들어감.
//confirmText : 확인 버튼 텍스트, 없으면 "수정 완료"로 들어감. (이 모달의 기본 목적이 습관 수정 모달이라서)
//hasCancle : 취소 버튼 유무
//hasExit : 나가기 버튼 유무
const Mordal = ({
  setShowModal,
  title = "모달 제목",
  hasCancle = true,
  hasExit = false,
  cancelText = "취소",
  confirmText = "수정 완료",
  innerComponent,
  onClickConfirm,
  onClickCancel,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <div className={styles.headerContainer}>
          <h2 className={styles.modalTitle}>{title}</h2>
          {hasExit && (
            <button
              type="button"
              className={`${styles.exitBtn} ${styles.topBtn}`}
            >
              나가기
            </button>
          )}
        </div>

        <div>{innerComponent}</div>
        <div className={styles.modalButtons}>
          {hasCancle && (
            <div className={styles.modalButton}>
              <Button
                variant="cancel"
                label={cancelText}
                onClick={() => {
                  setShowModal(false);
                  onClickCancel && onClickCancel();
                }}
              />
            </div>
          )}
          <div className={styles.modalButton}>
            <Button
              variant="create"
              label={confirmText}
              onClick={() => {
                setShowModal(false);
                onClickConfirm && onClickConfirm();
              }}
            />
          </div>
        </div>
        {hasExit && (
          <button
            type="button"
            className={`${styles.exitBtn} ${styles.bottomBtn}`}
          >
            나가기
          </button>
        )}
      </div>
    </div>
  );
};

export default Mordal;
