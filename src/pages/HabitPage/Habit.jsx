import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavButton from "../../components/NavButton/NavButton";
import Modal from "../../components/Modal/Modal";
import Popup from "../../components/Popup/Popup";
import Toast from "../../components/Toast/Toast";
import HabitItem from "./components/HabitItem";
import HabitForm from "./components/HabitForm";
import useHabits from "../../hooks/useHabits";
import styles from "./Habit.module.css";

// 날짜/시간 포맷: "2024-01-04 오후 3:06"
function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "오후" : "오전";
  const displayHour = hours % 12 || 12;
  return `${year}-${month}-${day} ${period} ${displayHour}:${minutes}`;
}

function Habit() {
  const { studyId } = useParams();
  const navigate = useNavigate();

  const { habits, isLoading, addHabit, toggleHabit, editHabit, removeHabit } =
    useHabits(studyId);

  // ── UI 상태 ──
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalMode, setModalMode] = useState(null); // null | "add" | "edit"
  const [editTarget, setEditTarget] = useState(null); // { id, habitName }
  const [inputValue, setInputValue] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [toast, setToast] = useState(null); // { type, text }

  // ── 현재 시간 (1분마다 갱신) ──
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // ── 토스트 (2.5초 후 자동 소멸) ──
  const showToast = useCallback((type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 2500);
  }, []);

  // ── 핸들러 ──
  const handleToggle = async (habitId, completed) => {
    try {
      await toggleHabit(habitId, completed);
    } catch (err) {
      showToast("warning", err.userMessage || "오류가 발생했습니다.");
    }
  };

  const handleOpenAdd = () => {
    setInputValue("");
    setModalMode("add");
  };

  const handleOpenEdit = (habit) => {
    setEditTarget(habit);
    setInputValue(habit.habitName);
    setModalMode("edit");
  };

  // Modal이 setShowModal(false) → setModalMode(null)을 먼저 호출한 뒤 이 함수를 실행
  // 이 시점엔 아직 리렌더 전이므로 modalMode, editTarget 클로저 값이 유효
  const handleConfirmModal = async () => {
    try {
      if (modalMode === "add") {
        await addHabit(inputValue.trim());
        showToast("success", " 습관이 추가됐어요!");
      } else if (modalMode === "edit") {
        await editHabit(editTarget.id, inputValue.trim());
        showToast("success", " 습관이 수정됐어요!");
      }
    } catch (err) {
      showToast("warning", err.userMessage || "오류가 발생했습니다.");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await removeHabit(deleteTargetId);
      showToast("success", " 습관이 삭제됐어요!");
    } catch (err) {
      showToast("warning", err.userMessage || "삭제 중 오류가 발생했습니다.");
    }
    setDeleteTargetId(null);
  };

  return (
    <div className={styles.page}>
      {/* ── 스터디 정보 섹션 ── */}
      {/* TODO: getStudyDetail(studyId) 연동 후 "{nickname}의 {title}" 표시 */}
      <div className={styles.studyInfo}>
        <div className={styles.studyTitleRow}>
          <h1 className={styles.studyName}>스터디</h1>
          <div className={styles.navButtons}>
            <NavButton
              label="오늘의 집중"
              onClick={() => navigate(`/studies/${studyId}/focus`)}
            />
            <NavButton label="홈" onClick={() => navigate("/")} />
          </div>
        </div>
        <div className={styles.currentTimeRow}>
          <span className={styles.timeLabel}>현재 시간</span>
          <span className={styles.timeValue}>{formatDateTime(now)}</span>
        </div>
      </div>

      {/* ── 습관 카드 ── */}
      <div className={styles.habitCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>오늘의 습관</h2>
          <button
            className={styles.editModeBtn}
            onClick={() => setIsEditMode((prev) => !prev)}
          >
            {isEditMode ? "완료" : "목록 수정"}
          </button>
        </div>

        <div className={styles.habitList}>
          {isLoading && (
            <p className={styles.emptyMessage}>불러오는 중...</p>
          )}
          {!isLoading && habits.length === 0 && (
            <p className={styles.emptyMessage}>
              {"아직 등록된 습관이 없어요.\n목록 수정을 눌러 추가해보세요!"}
            </p>
          )}
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              isEditMode={isEditMode}
              onToggle={handleToggle}
              onEdit={handleOpenEdit}
              onDelete={(id) => setDeleteTargetId(id)}
            />
          ))}
        </div>

        {isEditMode && (
          <button className={styles.addBtn} onClick={handleOpenAdd}>
            <span className="ic plus" style={{ fontSize: "1rem" }} />
            습관 추가
          </button>
        )}
      </div>

      {/* ── 추가/수정 모달 ── */}
      {modalMode && (
        <Modal
          setShowModal={() => setModalMode(null)}
          title={modalMode === "add" ? "습관 추가" : "습관 수정"}
          innerComponent={
            <HabitForm value={inputValue} onChange={setInputValue} />
          }
          confirmText={modalMode === "add" ? "추가 완료" : "수정 완료"}
          cancelText="취소"
          onClickConfirm={handleConfirmModal}
          onClickCancel={() => setInputValue("")}
        />
      )}

      {/* ── 삭제 확인 팝업 ── */}
      {deleteTargetId && (
        <Popup
          setShowPopup={() => setDeleteTargetId(null)}
          hasCancel
          message="정말 이 습관을 삭제하시겠어요?"
          onClickConfirm={handleDeleteConfirm}
          onClickCancel={() => setDeleteTargetId(null)}
        />
      )}

      {/* ── 토스트 알림 (Toast 자체가 position: fixed) ── */}
      {toast && <Toast type={toast.type} text={toast.text} />}
    </div>
  );
}

export default Habit;
