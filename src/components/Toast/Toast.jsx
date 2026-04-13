import styles from "./Toast.module.css";

const Toast = ({ type, text, point }) => {
  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {type === "warning" ? "🚨" : "🎉"} {point > 0 ? point : ""}
      {text}
    </div>
  );
};

export default Toast;
