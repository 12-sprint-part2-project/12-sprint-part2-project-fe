import React, { useEffect, useState } from "react";
import styles from "./StudyDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Tag from "../../components/Tag/Tag";
import BoxHeaderInfo from "../../components/BoxHeader/BoxHeaderInfo";
import NavButton from "../../components/NavButton/NavButton";
import { deleteStudy, getStudyDetail } from "../../api/studies";
import PasswordModal from "./components/PasswordModal/PasswordModal";
import Popup from "../../components/Popup/Popup";
import SharingModal from "./components/SharingModal/SharingModal";
import Toast from "../../components/Toast/Toast";
import useToast from "../../hooks/useToast";

const StudyDetail = () => {
  const { id } = useParams();
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
  }, [id]);

  /* 공유/삭제/수정 버튼 관련 상태 변수 */
  const [showPwModal, setShowPwModal] = useState(false); //비밀번호 모달

  const [showDeletePopup, setShowDeletePopup] = useState(false); //삭제 재확인 팝업
  const [showSharingModal, setShowSharingModal] = useState(false); //공유 모달

  const [confirmText, setConfirmText] = useState(""); //버튼마다 비밀번호 모달 내 버튼명이 다르므로, 여기에 저장해서 사용.
  const [pwType, setPwType] = useState(""); //삭제/수정 중 무엇인지 기록하는 용도

  //토스트
  const { toast, showToast } = useToast();

  /* 공유/수정/삭제 버튼 클릭 핸들러 */
  const onClickModify = () => {
    //먼저 세션 확인!!!!! 세션에 없다면 비밀번호 모달 실행
    //비밀번호 체크 모달 -> 비밀번호 일치할 시 -> 수정 페이지로 Link
    setPwType("modify");
    setConfirmText("수정하러 가기");
    setShowPwModal(true);
  };
  const onClickDelete = () => {
    setPwType("delete");
    setConfirmText("삭제하기");
    setShowPwModal(true);
  };
  const onClickSharing = () => {
    setShowSharingModal(true);
  };

  //비밀번호 인증 성공 시 실행할 함수.
  const onPasswordSuccess = () => {
    switch (pwType) {
      case "modify":
        navigate(`/studies/new`, {
          state: { type: "modify", study },
        });
        break;
      case "delete":
        //진짜로 삭제할거냔 거 표시하기 -> 취소버튼 누르면, 원래 상세 페이지로. 확인 버튼 누르면 -> delete api 호출
        setShowDeletePopup(true);
        break;
      //TODO: 여기에 집중 진입, 습관 진입 시의 코드도 적을 수 있을 것 같습니다!
      default:
        break;
    }
  };

  //공유 모달에서 '복사하기'버튼 클릭 시 실행할 함수
  const onHandleSharing = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      console.log("복사 성공.");
      showToast("success", "복사되었습니다!");
    } catch (e) {
      console.log("복사 실패=>", e);
      showToast("warning", "복사에 실패했습니다.");
    }
  };

  //삭제해주는 함수. 삭제 버튼 -> 비밀번호 입력 -> 인증 성공 -> 정말 삭제하시겠습니까? 네 -> 하고나서 실행 될 함수.
  const handleDelete = async () => {
    try {
      await deleteStudy(id);
      navigate("/");
      showToast("success", "삭제되었습니다");
    } catch (e) {
      showToast("warning", "삭제에 실패했습니다");
      console.log("삭제 실패 =>", e);
    }
    setShowDeletePopup(false);
  };

  return (
    <section className={styles.box}>
      {toast && <Toast type={toast.type} text={toast.text} />}
      {showPwModal &&
        study && ( //비밀번호 모달 띄우기
          <PasswordModal
            setShowModal={setShowPwModal}
            studyId={id}
            title={study.title}
            confirmText={confirmText}
            onPasswordSuccess={onPasswordSuccess}
          />
        )}
      {showDeletePopup && ( //정말 삭제하시겠습니까? 팝업
        <Popup
          setShowPopup={setShowDeletePopup}
          hasCancel={true}
          message="정말 삭제하시겠습니까?"
          onClickConfirm={handleDelete}
          onClickCancel={() => setShowDeletePopup(false)}
        />
      )}
      {showSharingModal && study && (
        <SharingModal
          setShowModal={setShowSharingModal}
          title={study.title}
          url={window.location.href}
          onClickConfirm={onHandleSharing}
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
