import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logos/logo.svg";
import Button from "../Button/Button";
import styles from "./Header.module.css";

function Header({ onCreateStudy, showButton = true }) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.headerLeft}>
          <img
            src={logo}
            alt="공부의 숲"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
        </div>
        {showButton && (
          <div className={styles.headerRight}>
            <div className={styles.btnWrapper}>
              <Button
                variant="create"
                label="스터디 만들기"
                onClick={onCreateStudy}
                className={styles.ctaText}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
