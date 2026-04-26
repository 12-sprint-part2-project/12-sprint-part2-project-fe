import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import Button from "../../components/Button/Button";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" stroke="#ccc" strokeWidth="3" />
        <rect x="29" y="18" width="6" height="22" rx="3" fill="#ccc" />
        <circle cx="32" cy="48" r="3" fill="#ccc" />
      </svg>
      <p className={styles.message}>페이지를 찾을 수 없습니다.</p>
      <p className={styles.descrption}>
        삭제되었거나 존재하지 않는 페이지입니다.
      </p>
      <div className={styles.btnWrapper}>
        <Button
          label="홈으로 돌아가기"
          onClick={() => navigate("/")}
          className={styles.btnText}
        />{" "}
      </div>
    </div>
  );
}

export default NotFoundPage;
