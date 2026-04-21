import React, { useState } from "react";
import styles from "./PasswordModal.module.css";
import Modal from "../../../../components/Modal/Modal";
import { verifyPassword } from "../../../../api/studies";
import useToast from "../../../../hooks/useToast";
import Toast from "../../../../components/Toast/Toast";

//TODO: innerComponent 를 컴포넌트로 따로 빼기
const PasswordModal = ({
  setShowModal = () => {}, //이 모달을 보여줄지에 대한 상태. 이걸 넘겨주면, Modal에서 setShowModal(false)로 모달을 끌 수 있다.
  studyId, //스터디 id (비밀번호 검증 API에 이용)
  title, //스터디의 이름
  confirmText, //습관, 집중, 수정, 삭제에 맞는 버튼 이름.
  onPasswordSuccess = () => {}, //비밀번호가 일치했을 때 실행될 함수
}) => {
  const [password, setPassword] = useState("");
  const [pwVisibleBtn, setPwVisibleBtn] = useState(false);

  const { toast, showToast } = useToast();

  //Modal 공통 컴포넌트 안에 넣을 것
  const innerComponent = (
    <div className={styles.innerComponent}>
      <p className={styles.text}>권한이 필요합니다</p>
      <div className={styles.inputElement}>
        <label htmlFor="password-input" className={styles.label}>
          비밀번호
        </label>

        <div className={styles.inputContainer}>
          <input
            type={pwVisibleBtn ? "text" : "password"}
            id="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요"
            className={`${styles.input} ${styles.pwInput}`}
          />

          <button
            type="button"
            className={pwVisibleBtn ? "ic visible" : "ic hidden"}
            onClick={() => {
              setPwVisibleBtn(!pwVisibleBtn);
            }}
          />
        </div>
      </div>
    </div>
  );

  //버튼을 클릭했을 때, 비밀번호 검증 API를 실행하는 함수 (Modal에게 넘겨짐)
  const onClickConfirmHandler = async () => {
    if (!password.trim()) {
      showToast("warning", "비밀번호를 입력해주세요!");
      return;
    }
    try {
      const res = await verifyPassword(studyId, { password });
      console.log("비밀번호 검증 결과=>", res);
      setShowModal(false); //비밀번호 일치하면 여기서 모달 닫음.
      onPasswordSuccess();
    } catch (e) {
      showToast("warning", "비밀번호가 일치하지 않습니다!");
      return;
    }
  };
  return (
    <div className={styles.pwModalContainer}>
      <Modal
        setShowModal={setShowModal}
        title={title}
        hasCancel={false}
        hasExit={true}
        confirmText={confirmText}
        innerComponent={innerComponent}
        onClickConfirm={onClickConfirmHandler}
        preventAutoClose={true}
      ></Modal>
      <div className={styles.toast}>
        {toast && <Toast type={toast.type} text={toast.text} />}
      </div>
    </div>
  );
};

export default PasswordModal;
