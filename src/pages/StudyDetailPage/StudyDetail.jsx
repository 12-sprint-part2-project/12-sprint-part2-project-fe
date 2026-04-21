import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkSession, deleteStudy, getStudyDetail } from "../../api/studies";
import useToast from "../../hooks/useToast";
import Tag from "../../components/Tag/Tag";
import BoxHeaderInfo from "../../components/BoxHeader/BoxHeaderInfo";
import NavButton from "../../components/NavButton/NavButton";
import PasswordModal from "./components/PasswordModal/PasswordModal";
import Popup from "../../components/Popup/Popup";
import SharingModal from "./components/SharingModal/SharingModal";
import Toast from "../../components/Toast/Toast";
import HabitTable from "./components/HabitTable/HabitTable";
import styles from "./StudyDetail.module.css";
import Emoji from "./components/Emoji/Emoji";

const RECENT_STUDIES = "recent_studies";

const StudyDetail = () => {
  const [loading, setLoading] = useState(true);
  const { studyId } = useParams();
  const [study, setStudy] = useState(null); //가져온 스터디 객체를 저장할 변수
  const navigate = useNavigate();

  const saveRecentStudy = (data) => {
    const recentStudyTotalPoints =
      data.focusSessions?.reduce((acc, cur) => acc + cur.earnedPoint, 0) ?? 0;

    data.points = recentStudyTotalPoints;

    const storaged = JSON.parse(localStorage.getItem(RECENT_STUDIES) || "[]");
    const filtered = storaged.filter((s) => s.id !== data.id); // 이미 로컬스토리지에 해당 스터디가 저장되어 있는 경우 담지 않음
    filtered.unshift(data);
    if (filtered.length > 3) {
      // 3개를 넘어가면 제일 처음에 조회한 스터디 제거
      filtered.pop();
    }

    localStorage.setItem(RECENT_STUDIES, JSON.stringify(filtered));
  };

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const res = await getStudyDetail(studyId);
        // console.log(res);
        const { data } = res.data;
        setStudy(data);

        saveRecentStudy(data); // localStorage 에 담기
      } catch (error) {
        console.error(`데이터 조회 실패: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStudy();
  }, [studyId]);
  // console.log(study);

  // 획득 포인트 합계
  const totalPoints =
    study?.focusSessions?.reduce((acc, cur) => acc + cur.earnedPoint, 0) ?? 0;

  /* 공유/삭제/수정 버튼 관련 상태 변수 */
  const [showPwModal, setShowPwModal] = useState(false); //비밀번호 모달

  const [showDeletePopup, setShowDeletePopup] = useState(false); //삭제 재확인 팝업
  const [showSharingModal, setShowSharingModal] = useState(false); //공유 모달

  const [confirmText, setConfirmText] = useState(""); //버튼마다 비밀번호 모달 내 버튼명이 다르므로, 여기에 저장해서 사용.
  const [pwType, setPwType] = useState(""); //삭제/수정 중 무엇인지 기록하는 용도

  //토스트
  const { toast, showToast } = useToast();

  /* 공유/수정/삭제 버튼 클릭 핸들러 */
  const onClickModify = async () => {
    //먼저 세션 확인!!!!! 세션에 없다면 비밀번호 모달 실행
    //비밀번호 체크 모달 -> 비밀번호 일치할 시 -> 수정 페이지로 Link
    setPwType("modify"); //비밀번호 모달에 필요한 Props설정
    setConfirmText("수정하러 가기");
    checkSessionFunc();
  };
  const onClickDelete = async () => {
    setPwType("delete");
    setConfirmText("삭제하기");
    checkSessionFunc();
  };
  const onClickSharing = () => {
    setShowSharingModal(true);
  };
  const onClickEnterHabit = () => {
    //비밀번호 모달에 필요한 Props설정
    setPwType("habit"); //어떤 페이지로 이동 시킬지 설정하기 위함
    setConfirmText("확인");
    checkSessionFunc();
  };
  const onClickEnterFocus = () => {
    //비밀번호 모달에 필요한 Props설정
    setPwType("focus"); //어떤 페이지로 이동 시킬지 설정하기 위함
    setConfirmText("확인");
    checkSessionFunc();
  };

  //세션 체크 -> 존재하지 않으면 비밀번호 모달, 존재하면 타겟 페이지로 이동
  const checkSessionFunc = async () => {
    try {
      await checkSession(studyId);
      //세션에 존재할 시, 바로 다음 페이지로 보냄
      onPasswordSuccess(); //(원랜 이걸 비밀번호 모달에 넘겨줬었다.)
    } catch (e) {
      console.log("세션에 존재하지 않음 =>", e);
      setShowPwModal(true);
    }
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
      case "habit":
        navigate(`/studies/${studyId}/habits`);
        break;
      case "focus":
        navigate(`/studies/${studyId}/focus`);
        break;
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
      {loading ? (
        <p className={styles.notification}>스터디 조회중...</p>
      ) : (
        <>
          {toast && <Toast type={toast.type} text={toast.text} />}
          {showPwModal &&
            study && ( //비밀번호 모달 띄우기
              <PasswordModal
                setShowModal={setShowPwModal}
                studyId={study?.id}
                title={study?.title}
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
              title={study?.title}
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

              <Emoji studyId={study?.id} />

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
              <h2 className={styles.headline}>
                {study?.nickname}의 {study?.title}
              </h2>

              <div className={styles.btnGroup}>
                <NavButton label="오늘의 습관" onClick={onClickEnterHabit} />
                <NavButton label="오늘의 집중" onClick={onClickEnterFocus} />
              </div>
            </div>

            <div className={styles.headerInfo}>
              <BoxHeaderInfo title="소개" info={study?.description} />
              <BoxHeaderInfo type="point" info={totalPoints} />
            </div>
          </div>

          <HabitTable habits={study.habits} studyId={study.id} />
        </>
      )}
    </section>
  );
};

export default StudyDetail;
