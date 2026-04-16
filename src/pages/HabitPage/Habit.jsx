import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Habit.module.css";
import NavButton from "../../components/NavButton/NavButton";
import BoxHeaderInfo from "../../components/BoxHeader/BoxHeaderInfo";
import { getStudyDetail } from "../../api/studies";

function Habit() {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = useState(null);

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const res = await getStudyDetail(studyId);
        setStudy(res.data.data);
      } catch (err) {
        console.error("스터디 정보를 불러오는데 실패했습니다.", err);
      }
    };
    fetchStudy();
  }, [studyId]);

  return (
    <div className={styles.container}>
      {/* 헤더 영역 */}
      <div className={styles.studyInfo}>
        <div className={styles.studyTitleRow}>
          <h1 className={styles.studyName}>
            {study ? `${study.nickname}의 ${study.title}` : "로딩 중..."}
          </h1>
          <div className={styles.navButtons}>
            <NavButton
              label="오늘의 집중"
              onClick={() => navigate(`/studies/${studyId}/focus`)}
            />
            <NavButton
              label="홈"
              onClick={() => navigate(`/studies/${studyId}`)}
            />
          </div>
        </div>
        <BoxHeaderInfo type="time" />
      </div>

      {/* 내부 컨테이너 */}
      <div className={styles.habitSection}>
        <div className={styles.habitHeader}>
          <h2 className={styles.habitTitle}>오늘의 습관</h2>
        </div>
        <div className={styles.habitList}>
          {/* TODO: 습관 목록 */}
        </div>
      </div>
    </div>
  );
}

export default Habit;
