import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Habit.module.css";
import NavButton from "../../components/NavButton/NavButton";
import BoxHeaderInfo from "../../components/BoxHeader/BoxHeaderInfo";
import HabitItem from "./components/HabitItem";
import Modal from "../../components/Modal/Modal";
import useStudyDetail from "../../hooks/useStudyDetail";
import useStudySessionCheck from "../../hooks/useStudySessionCheck";
import useHabits from "../../hooks/useHabits";
import "../../styles/global/icon.css";

function Habit() {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const { data: study } = useStudyDetail(studyId);
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [habitInput, setHabitInput] = useState("");
  const [editingHabitId, setEditingHabitId] = useState(null);
  const [originalHabitName, setOriginalHabitName] = useState("");
  const [editingValue, setEditingValue] = useState("");
  const [stagedEdits, setStagedEdits] = useState({});
  const { habits, isLoading, toggleHabit, addHabit, editHabit, removeHabit } =
    useHabits(studyId);
  useStudySessionCheck(studyId);

  // 인라인 편집 시작 / 취소
  const handleEditStart = (habit) => {
    if (habit === null) {
      setEditingHabitId(null);
      setEditingValue("");
      return;
    }
    setEditingHabitId(habit.id);
    // 이미 stagedEdits에 수정값이 있으면 그걸 보여줌 (다른 습관 편집 후 돌아올 때)
    setEditingValue(stagedEdits[habit.id] ?? habit.habitName);
    setOriginalHabitName(habit.habitName);
  };

  // 편집값 변경 시 stagedEdits에 누적
  const handleEditChange = (habitId, value) => {
    setEditingValue(value);
    setStagedEdits((prev) => ({ ...prev, [habitId]: value }));
  };

  // 수정 완료: stagedEdits 전체 API 전송 + 추가 중인 습관 저장
  const handleConfirm = async () => {
    try {
      const editPromises = Object.entries(stagedEdits)
        .filter(([, name]) => name.trim())
        .map(([id, name]) => editHabit(Number(id), name.trim()));
      await Promise.all(editPromises);

      if (isAdding && habitInput.trim()) {
        await addHabit(habitInput);
      }
    } finally {
      setEditingHabitId(null);
      setEditingValue("");
      setOriginalHabitName("");
      setHabitInput("");
      setIsAdding(false);
      setStagedEdits({});
    }
  };

  const handleAddCancel = () => {
    setHabitInput("");
    setIsAdding(false);
  };

  // 삭제: 편집 중인 아이템이 삭제되면 편집 상태도 초기화, stagedEdits에서도 제거
  const handleDelete = async (habitId) => {
    await removeHabit(habitId);
    if (editingHabitId === habitId) {
      setEditingHabitId(null);
      setEditingValue("");
    }
    setStagedEdits((prev) => {
      const next = { ...prev };
      delete next[habitId];
      return next;
    });
  };

  // + 버튼 클릭: 입력 중인 게 있으면 저장 후 새 입력 열기
  const handleAddClick = async () => {
    if (isAdding) {
      if (habitInput.trim()) {
        try {
          await addHabit(habitInput);
        } finally {
          setHabitInput("");
        }
      }
      // isAdding은 true 유지 → 입력 칸 그대로 열린 상태
    } else {
      setIsAdding(true);
    }
  };

  const modalInner = (
    <div className={styles.modalInner}>
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          isEditMode={true}
          isEditing={editingHabitId === habit.id}
          editValue={editingValue}
          stagedName={stagedEdits[habit.id]}
          onEditStart={handleEditStart}
          onEditChange={handleEditChange}
          onDelete={handleDelete}
        />
      ))}
      {isAdding && (
        <div className={styles.newHabitRow}>
          <div
            className={`${styles.newHabitInputWrap} ${
              habitInput ? styles.hasValue : ""
            }`}
          >
            <input
              className={styles.newHabitInput}
              value={habitInput}
              onChange={(e) => setHabitInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleConfirm();
                if (e.key === "Escape") handleAddCancel();
              }}
            />
          </div>
          <button
            className={styles.newHabitDeleteBtn}
            onClick={handleAddCancel}
            aria-label="취소"
          >
            <span className="ic trash" />
          </button>
        </div>
      )}

      <button className={styles.addBtn} onClick={handleAddClick}>
        +
      </button>
    </div>
  );

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
          <div className={styles.titleGroup}>
            <h2 className={styles.habitTitle}>오늘의 습관</h2>
            <button
              className={styles.editBtn}
              onClick={() => setShowModal(true)}
            >
              목록 수정
            </button>
          </div>
        </div>
        <div className={styles.habitList}>
          {isLoading ? (
            <p>불러오는 중...</p>
          ) : habits.length === 0 ? (
            <div className={styles.emptyState}>
              <p>아직 습관이 없어요</p>
              <p>목록 수정을 눌러 습관을 생성해보세요</p>
            </div>
          ) : (
            habits.map((habit) => (
              <HabitItem
                key={habit.id}
                habit={habit}
                isEditMode={false}
                onToggle={toggleHabit}
              />
            ))
          )}
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          title="습관 목록"
          confirmText="수정 완료"
          cancelText="취소"
          onClickConfirm={handleConfirm}
          onClickCancel={() => {
            setEditingHabitId(null);
            setEditingValue("");
            setIsAdding(false);
            setHabitInput("");
            setStagedEdits({});
          }}
          innerComponent={modalInner}
        />
      )}
    </div>
  );
}

export default Habit;
