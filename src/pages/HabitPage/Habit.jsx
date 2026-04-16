import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Habit.module.css";
import NavButton from "../../components/NavButton/NavButton";
import BoxHeaderInfo from "../../components/BoxHeader/BoxHeaderInfo";
import HabitItem from "./components/HabitItem";
import HabitForm from "./components/HabitForm";
import Modal from "../../components/Modal/Modal";
import { getStudyDetail } from "../../api/studies";
import useHabits from "../../hooks/useHabits";

function Habit() {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [habitInput, setHabitInput] = useState("");
  const { habits, isLoading, toggleHabit, addHabit, removeHabit } =
    useHabits(studyId);

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

  const handleAddHabit = async () => {
    if (!habitInput.trim()) return;
    await addHabit(habitInput);
    setHabitInput("");
  };

  const modalInner = (
    <div className={styles.modalInner}>
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          isEditMode={true}
          onDelete={removeHabit}
          onEdit={() => {}}
        />
      ))}
      <div className={styles.modalAddRow}>
        <HabitForm value={habitInput} onChange={setHabitInput} />
        <button className={styles.addBtn} onClick={handleAddHabit}>
          +
        </button>
      </div>
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
          <h2 className={styles.habitTitle}>오늘의 습관</h2>
          <button
            className={styles.editBtn}
            onClick={() => setShowModal(true)}
          >
            목록 수정
          </button>
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
          onClickConfirm={() => {}}
          innerComponent={modalInner}
        />
      )}
    </div>
  );
}

export default Habit;
