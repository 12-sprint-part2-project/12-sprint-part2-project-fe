import React, { useEffect, useState } from "react";
import styles from "./StudyDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Tag from "../../components/Tag/Tag";
import BoxHeaderInfo from "../../components/BoxHeader/BoxHeaderInfo";
import NavButton from "../../components/NavButton/NavButton";
import { getStudyDetail } from "../../api/studies";
import PasswordModal from "./components/PasswordModal/PasswordModal";

const StudyDetail = () => {
  const { id = 1 } = useParams();
  const [study, setStudy] = useState(null); //가져온 스터디 객체를 저장할 변수
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const res = await getStudyDetail(id);
        setStudy(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error(`데이터 조회 실패: ${error}`);
      }
    };
    fetchStudy();
  }, []);

  /* 공유/삭제/수정 버튼 관련 상태 변수 */
  const [showModal, setShowModal] = useState(false); //비밀번호 모달을 보여주는 상태

  const [formType, setFormType] = useState(""); //생성/수정의 경우, 비밀번호 인증 성공 시 실행할 form의 type. (create, modify)
  const [confirmText, setConfirmText] = useState(""); //버튼마다 비밀번호 모달 내 버튼명이 다르므로, 여기에 저장해서 사용.
  //근데 이건 현재 페이지의 UI로 보이는 게 아니라서, 그냥 let 변수로 관리하는 게 더 부하 적을 것이라 판단.
  /* 공유/수정/삭제 버튼 클릭 핸들러 */
  const onClickModify = () => {
    //비밀번호 체크 모달 -> 비밀번호 일치할 시 -> 수정 페이지로 Link
    setFormType("modify");
    setConfirmText("수정하러 가기");
    setShowModal(true);
  };
  const onClickDelete = () => {};
  const onClickSharing = () => {};

  return (
    <section className={styles.box}>
      {showModal && study && (
        <PasswordModal
          setShowModal={setShowModal}
          studyId={id}
          title={study.title}
          confirmText={confirmText}
          onPasswordSuccess={() => {
            navigate(`/studies/new`, {
              state: { type: formType, study },
            });
          }}
        />
      )}
      <div className={styles.boxHeader}>
        <div className={styles.headerTop}>
          <div className={styles.management}>
            <ul>
              <li>
                <button onClick={onClickSharing}>공유하기</button>
              </li>
              <li>
                <button onClick={onClickModify}>수정하기</button>
              </li>
              <li>
                <button onClick={onClickDelete}>스터디 삭제하기</button>
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
