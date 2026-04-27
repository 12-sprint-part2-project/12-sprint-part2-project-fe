import BoxHeaderInfo from "../../../../components/BoxHeader/BoxHeaderInfo";
import NavButton from "../../../../components/NavButton/NavButton";
import styles from "./StudyHeader.module.css";

function StudyHeader({
  nickname,
  title,
  earnedPoint,
  onNavigateHabit,
  onNavigateStudyDetail,
}) {
  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <h2 className={styles.title}>
          {nickname}의 {title}
        </h2>
        <div className={styles.nav}>
          <NavButton label="오늘의 습관" onClick={onNavigateHabit} />
          <NavButton label="스터디 상세" onClick={onNavigateStudyDetail} />
        </div>
      </div>

      <div>
        <BoxHeaderInfo type="point" info={earnedPoint} />
      </div>
    </div>
  );
}

export default StudyHeader;
