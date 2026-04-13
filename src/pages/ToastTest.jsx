import Toast from "../components/Toast/Toast";

const ToastTest = () => {
  return (
    <div>
      <Toast type="warning" text="집중이 중단되었습니다." />
      <Toast
        type="warning"
        text="비밀번호가 일치하지 않습니다. 다시 입력해주세요."
      />
      <Toast type="success" point={50} text="포인트를 획득했습니다!" />
      <Toast
        type="success"
        text="개발자도구에서 제일 아래 Toast UI 부터 제거하면서 보시면 좋을 것 같아요!"
      />
    </div>
  );
};

export default ToastTest;
