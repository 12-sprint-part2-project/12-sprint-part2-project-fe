import React from "react";
import styles from "./Popup.module.css";
import Button from "../Button/Button";

//hanCancel : 취소 버튼 여부
const Popup = ({
  setShowPopup,
  hasCancel,
  message,
  onClickConfirm,
  onClickCancel,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popupContainer}>
        <div className={styles.popupTextContainer}>
          <p className={styles.popupText}>{message || "팝업 메세지입니다."}</p>{" "}
          {/*message가 전달되지 않으면 기본 메세지를 보여줌*/}
        </div>

        <div className={styles.popupButtons}>
          {hasCancel && (
            <Button
              variant="cancel"
              label="취소"
              onClick={() => {
                setShowPopup(false);
                //취소 버튼 클릭 시 수행할 작업 (아마 거의 쓰일 일이 없을듯 싶지만?)
                //onClickCancel이 전달된 경우에만 실행
                onClickCancel && onClickCancel();
              }}
            />
          )}
          <Button
            variant="create"
            label="확인"
            onClick={() => {
              // 확인 버튼 클릭 시 수행할 작업
              setShowPopup(false);
              //onClickConfirm이 전달된 경우에만 실행
              onClickConfirm && onClickConfirm();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
