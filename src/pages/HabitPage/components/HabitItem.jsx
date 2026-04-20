import styles from "./HabitItem.module.css";
import "../../../styles/global/icon.css";

function HabitItem({
  habit,
  isEditMode,
  isEditing,
  editValue,
  onToggle,
  onEditStart,
  onEditChange,
  onDelete,
}) {
  if (isEditMode) {
    // 인라인 편집 중인 아이템
    if (isEditing) {
      return (
        <div className={styles.editRow}>
          <div className={styles.editInputWrap}>
            <input
              className={styles.editInput}
              value={editValue}
              onChange={(e) => onEditChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") onEditStart(null);
              }}
              autoFocus
            />
          </div>
          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(habit.id)}
            aria-label="delete"
          >
            <span className="ic trash" />
          </button>
        </div>
      );
    }

    // 기본 편집 모드 아이템 (클릭 시 편집 시작)
    return (
      <div className={styles.editRow}>
        <button
          className={`${styles.editItem} ${habit.isCompleted ? styles.completed : ""}`}
          onClick={() => onEditStart(habit)}
        >
          <span className={styles.editName}>{habit.habitName}</span>
        </button>
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(habit.id)}
          aria-label="delete"
        >
          <span className="ic trash" />
        </button>
      </div>
    );
  }

  return (
    <button
      className={`${styles.habitBtn} ${habit.isCompleted ? styles.completed : ""}`}
      onClick={() => onToggle(habit.id, !habit.isCompleted)}
    >
      {habit.habitName}
    </button>
  );
}

export default HabitItem;
