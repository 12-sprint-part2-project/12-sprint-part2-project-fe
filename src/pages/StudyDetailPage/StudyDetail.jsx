import React from "react";
import styles from "./StudyDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Tag from "../../components/Tag/Tag";
import BoxHeaderInfo from "../../components/BoxHeader/BoxHeaderInfo";
import NavButton from "../../components/NavButton/NavButton";

const StudyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <section className={styles.box}>
      <div className={styles.boxHeader}>
        <div className={styles.headerTop}>
          <div className={styles.management}>
            <ul>
              <li>
                <button>공유하기</button>
              </li>
              <li>
                <button>수정하기</button>
              </li>
              <li>
                <button>스터디 삭제하기</button>
              </li>
            </ul>
          </div>

          <div className={styles.emoji}>
            <div className={styles.emojiTop3}>
              <Tag
                variant="general"
                type="emoji"
                theme="dark"
                emojiIcon="👩🏻‍💻"
                count={37}
              />
              <Tag
                variant="general"
                type="emoji"
                theme="dark"
                emojiIcon="👍"
                count={11}
              />
              <Tag
                variant="general"
                type="emoji"
                theme="dark"
                emojiIcon="🤩"
                count={9}
              />
            </div>

            <button className={styles.addEmoji}>
              <i className="ic smile"></i> 추가
            </button>
          </div>
        </div>
        <div className={styles.headerTitle}>
          <h2 className={styles.headline}>연우의 개발공장</h2>

          <div className={styles.btnGroup}>
            <NavButton
              label="오늘의 습관"
              onClick={() => navigate(`/studies/${studyId}/habits`)}
            />
            <NavButton
              label="오늘의 집중"
              onClick={() => navigate(`/studies/${studyId}/focus`)}
            />
          </div>
        </div>

        <div className={styles.headerInfo}>
          <BoxHeaderInfo
            title="소개"
            info="Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)"
          />
          <BoxHeaderInfo type="point" info={310} />
        </div>
      </div>

      <div className={styles.todayHabits}>습관 데이터 불러올 자리</div>
    </section>
  );
};

export default StudyDetail;
