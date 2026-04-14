import { useNavigate, useParams } from "react-router-dom";
import Tag from "../../components/Tag/Tag";
import NavButton from "../../components/NavButton/NavButton";
import styles from "./Focus.module.css";

function Focus() {
  const navigate = useNavigate();
  const { studyId } = useParams();

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h2 className={styles.title}>연우의 개발공장</h2>
          <div className={styles.nav}>
            <NavButton
              label="오늘의 습관"
              onClick={() => navigate(`/studies/${studyId}/habits`)}
            />
            <NavButton label="홈" onClick={() => navigate("/")} />
          </div>
        </div>

        <div>
          <p className={styles.pointLabel}>현재까지 획득한 포인트</p>
          <Tag type="point" theme="light" variant="general" points={310} />
        </div>
      </div>

      <div className={styles.timerSection}>
        <h3 className={styles.timerTitle}>오늘의 집중</h3>
        <p className={styles.timer}>25:00</p>
        <button className={styles.timerPlayBtn}>
          <span className="ic play"></span>
          Start!
        </button>
      </div>
    </section>
  );
}

export default Focus;
