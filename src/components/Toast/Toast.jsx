import styles from "./Toast.module.css";

const Toast = ({ type, text, point = 0 }) => {
  /**
   * type: success 또는 warning 2개 타입만
   * text: 띄울 문구
   * point: 집중 성공시 쌓일 포인트로 필수값은 아님
   */
  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {type === "warning" ? "🚨" : "🎉"} {(point > 0 ? point : "") + text}
    </div>
  );
};

export default Toast;
