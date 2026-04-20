import React from "react";
import Popup from "../../../components/Popup/Popup";

function ResumeConfirmPopup({ setShow, onResume, onStop }) {
  return (
    <Popup
      message="이전에 진행 중이던 집중이 있습니다. 계속 진행하시겠습니까?"
      hasCancel
      setShowPopup={setShow}
      onClickConfirm={onResume}
      onClickCancel={onStop}
      confirmText="계속 진행"
      cancelText="종료"
    />
  );
}

export default ResumeConfirmPopup;
