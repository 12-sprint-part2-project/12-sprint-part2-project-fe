import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "../../components/Toast/Toast";
import useStudyDetail from "../../hooks/useStudyDetail";
import useTimer from "../../hooks/timer/useTimer";
import { TIMER_STATUS } from "../../hooks/timer/timerConstants";
import TimerSetting from "./components/timer/TimerSetting";
import TimerControls from "./components/timer/TimerControls";
import ResumeConfirmPopup from "./components/popups/ResumeConfirmPopup";
import StopConfirmPopup from "./components/popups/StopConfirmPopup";
import SessionTitleModal from "./components/session/SessionTitleModal";
import SessionListModal from "./components/session/SessionListModal";
import StudyHeader from "./components/header/StudyHeader";
import formatTime from "./formatTime";
import styles from "./Focus.module.css";
import useStudySessionCheck from "../../hooks/useStudySessionCheck";

function Focus() {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const queryClient = useQueryClient();

  const [durationSec, setDurationSec] = useState(25 * 60);
  const [isEditing, setIsEditing] = useState(false);
  const [inputMin, setInputMin] = useState("25");
  const [inputSec, setInputSec] = useState("00");
  // 재개 여부 선택 팝업 상태
  const [showResumePopup, setShowResumePopup] = useState(false);
  // 종료 재확인 팝업 상태
  const [showStopConfirmPopup, setShowStopConfirmPopup] = useState(false);
  // 타이머 시작 시 제목 생성 팝업 상태
  const [showTitleModal, setShowTitleModal] = useState(false);
  // 타이머 세션 제목
  const [title, setTitle] = useState("");
  // 세션 목록 확인 팝업 상태
  const [showSessionListModal, setShowSessionListModal] = useState(false);
  // 세션 제목 입력 시 에러
  const [titleError, setTitleError] = useState("");

  // 직접입력 버튼 클릭 시 분 input 포커스용 ref
  const minInputRef = useRef(null);

  // 스터디 세션 체크
  const { toast: sessionToast } = useStudySessionCheck(studyId);

  // 스터디 정보 조회
  const { data: study, isLoading } = useStudyDetail(studyId);

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ["study", studyId],
      });
    };
  }, [queryClient, studyId]);

  const {
    timerStatus,
    timeLeft,
    earnedPoint,
    start,
    pause,
    resume,
    complete,
    toast,
    sessionDuration,
    shouldShowResumePopup,
    sessions,
    shouldShowSessionList,
    selectSession,
    selectedSession,
    currentTitle,
  } = useTimer(studyId, durationSec);

  useEffect(() => {
    if (shouldShowSessionList) setShowSessionListModal(true);
  }, [shouldShowSessionList]);

  // 페이지 재진입 시 타이머 설정 시간 표시
  useEffect(() => {
    if (sessionDuration) setDurationSec(sessionDuration);
  }, [sessionDuration]);

  useEffect(() => {
    if (shouldShowResumePopup) setShowResumePopup(true);
  }, [shouldShowResumePopup]);

  // 타이머 상태: 진행/중지/완료/시작 전
  const isRunning = timerStatus === TIMER_STATUS.RUNNING;
  const isPaused = timerStatus === TIMER_STATUS.PAUSED;
  const isCompleted = timerStatus === TIMER_STATUS.COMPLETED;
  const isIdle = timerStatus === TIMER_STATUS.IDLE;

  // 프리셋 버튼 클릭
  const handleSelectPreset = (min) => {
    setDurationSec(min * 60);
    setIsEditing(false);
  };

  // 직접 입력 버튼 클릭
  const handleSelectCustom = () => {
    setInputMin(String(Math.floor(durationSec / 60)));
    setInputSec(String(durationSec % 60).padStart(2, "0"));
    setIsEditing(true);
    setTimeout(() => minInputRef.current?.focus(), 0);
  };

  // 타이머 시간 설정: 분/초 입력값 보정
  const handleInputChange = (min, sec) => {
    const m = Math.min(99, Math.max(0, parseInt(min) || 1));
    const s = Math.min(59, Math.max(0, parseInt(sec) || 0));

    let total = m * 60 + s;

    // 1분 미만이면 1:00으로 고정
    if (total < 60) total = 60;

    const newMin = Math.floor(total / 60);
    const newSec = total % 60;

    setInputMin(String(newMin));
    setInputSec(String(newSec).padStart(2, "0"));
    setDurationSec(total);
  };

  // 타이머 start 버튼 클릭 이벤트 핸들러
  const handleStartClick = () => {
    if (isEditing) setIsEditing(false);
    setTitle("");
    setTitleError("");
    setShowTitleModal(true);
  };

  // 제목 설정 이후 타이머 시작
  const handleStart = async () => {
    if (!title.trim()) {
      setTitleError("제목을 입력해주세요.");
      return;
    }

    try {
      await start(title);
      setShowTitleModal(false);
      setTitle("");
      setTitleError("");
    } catch {}
  };

  // 재진입 팝업에서 "계속 진행" 선택 시 일시정지된 타이머를 재시작하고 팝업 닫기
  const handleResumeConfirm = () => {
    resume();
    setShowResumePopup(false);
  };

  // 재진입 팝업에서 "종료" 선택 시 바로 종료하지 않고 종료 재확인 팝업 노출
  const handleStopClick = () => {
    setShowResumePopup(false);
    setShowStopConfirmPopup(true);
  };

  // 종료 재확인 팝업에서 "종료" 선택 시 포인트 지급 없이 타이머 종료 처리
  const handleStopConfirm = () => {
    complete({ action: "failed" });
    setShowStopConfirmPopup(false);
  };

  // 획득 포인트 합계
  const totalPoints =
    (study?.focusSessions?.reduce((acc, cur) => acc + cur.earnedPoint, 0) ??
      0) + earnedPoint;

  return (
    <section className={styles.container}>
      {toast && (
        <Toast type={toast.type} text={toast.text} point={toast.point} />
      )}
      {sessionToast && (
        <Toast type={sessionToast.type} text={sessionToast.text} />
      )}
      {showSessionListModal && (
        <SessionListModal
          sessions={sessions}
          onSelect={(session) => {
            selectSession(session);
            setShowSessionListModal(false);
          }}
          onClose={() => setShowSessionListModal(false)}
        />
      )}
      {/* 타이머 생성 시 집중 세션 제목 설정 팝업 */}
      {showTitleModal && (
        <SessionTitleModal
          title={title}
          titleError={titleError}
          onChangeTitle={(val) => {
            setTitle(val);
            if (val.trim()) setTitleError("");
          }}
          onConfirm={handleStart}
          onClose={() => setShowTitleModal(false)}
        />
      )}
      {/* 페이지 재진입 시 진행 중이던 타이머가 있었던 경우 표시되는 재개 여부 선택 팝업 */}
      {showResumePopup && (
        <ResumeConfirmPopup
          setShow={setShowResumePopup}
          onResume={handleResumeConfirm}
          onStop={handleStopClick}
          title={selectedSession?.title}
        />
      )}
      {/* 재진입 팝업에서 종료 선택 시 표시되는 최종 종료 확인 팝업 */}
      {showStopConfirmPopup && (
        <StopConfirmPopup
          setShow={setShowStopConfirmPopup}
          onResume={handleResumeConfirm}
          onStop={handleStopConfirm}
        />
      )}
      {/* 스터디 정보 표시 */}
      <StudyHeader
        nickname={study?.nickname}
        title={study?.title}
        earnedPoint={totalPoints}
        onNavigateHabit={() => navigate(`/studies/${studyId}/habits`)}
        onNavigateHome={() => navigate("/")}
      />

      {/* 타이머 */}
      <div className={styles.timerSection}>
        <div className={styles.timerSectionheader}>
          <h3 className={styles.timerTitle}>
            {isRunning || isPaused
              ? (currentTitle ?? "오늘의 집중")
              : "오늘의 집중"}
          </h3>

          {/* 타이머 시작 전/완료: 집중 시간 설정 UI 표시 */}
          <TimerSetting
            durationSec={durationSec}
            isEditing={isEditing}
            isActive={isRunning || isPaused}
            onSelectPreset={handleSelectPreset}
            onSelectCustom={handleSelectCustom}
          />
        </div>

        <div
          className={`${styles.timerDisplay} ${isRunning || isPaused ? styles.timerActive : ""}`}
        >
          {/* 직접 입력 버튼을 클릭한 경우 타이머 시간(분/초) 입력 Input */}
          {/* 그 외의 경우에는 사용자가 설정한 타이머 시간 */}
          {isEditing ? (
            <div className={styles.timerEdit}>
              <input
                ref={minInputRef}
                className={styles.timeInput}
                type="number"
                min="1"
                max="99"
                value={inputMin}
                onChange={(e) => setInputMin(e.target.value)}
                onBlur={() => handleInputChange(inputMin, inputSec)}
              />
              <span className={styles.timeSep}>:</span>
              <input
                className={styles.timeInput}
                type="number"
                min="0"
                max="59"
                value={inputSec}
                onChange={(e) => setInputSec(e.target.value)}
                onBlur={() => handleInputChange(inputMin, inputSec)}
              />
            </div>
          ) : (
            formatTime(isIdle || isCompleted ? durationSec : timeLeft)
          )}
          <p className={styles.helperText}>
            {isEditing ? "최소 1분부터 설정할 수 있어요" : ""}
          </p>
        </div>

        {/* 타이머 조작 버튼 (시작/일시정지/재시작) */}
        <div className={styles.btnContainer}>
          <TimerControls
            isIdle={isIdle}
            isCompleted={isCompleted}
            isRunning={isRunning}
            isPaused={isPaused}
            onStart={handleStartClick}
            onPause={pause}
            onResume={resume}
          />
        </div>
      </div>
    </section>
  );
}

export default Focus;
