import logo from "../../assets/images/img_logo.svg";
import btnCTA from "../../assets/images/buttons/btn_CTA.svg";
import styles from "./Header.module.css";

function Header({ onCreateStudy }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.headerLeft}>
          <img src={logo} alt="공부의 숲" />
        </div>
        <div className={styles.headerRight}>
          <button className={styles.btnCta} onClick={onCreateStudy}>
            <img src={btnCTA} alt="스터디 만들기" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
