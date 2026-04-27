import styles from "./Toast.module.css";
import { createPortal } from "react-dom";

const Toast = ({ type, text }) => {
  /**
   * type: success 또는 warning 2개 타입만
   * text: 띄울 문구
   * point: 집중 성공시 쌓일 포인트로 필수값은 아님
   */
  return createPortal(
    <div className={`${styles.toast} ${styles[type]}`}>
      {type === "warning" ? "🚨" : "🎉"} {text}
    </div>,
    document.body,
  );
};

export default Toast;
