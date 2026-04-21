import Popup from "../../../../components/Popup/Popup";

function StopConfirmPopup({ setShow, onResume, onStop }) {
  return (
    <Popup
      message="지금 종료 시 포인트가 지급되지 않습니다. 종료하시겠습니까?"
      hasCancel
      setShowPopup={setShow}
      confirmText="종료"
      cancelText="계속 진행"
      onClickConfirm={onStop}
      onClickCancel={onResume}
    />
  );
}

export default StopConfirmPopup;
