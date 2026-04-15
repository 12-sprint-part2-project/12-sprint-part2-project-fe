import styles from "./HabitItem.module.css";
import "../../../styles/global/icon.css";

function HabitItem({ habit, isEditMode, onToggle, onEdit, onDelete }) {
  if (isEditMode) {
    return (
      <div
        className={`${styles.editItem} ${habit.isCompleted ? styles.completed : ""}`}
      >
        <span className={styles.editName}>{habit.habitName}</span>
        <div className={styles.editActions}>
          <button className={styles.editBtn} onClick={() => onEdit(habit)}>
            수정
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(habit.id)}
            aria-label="삭제"
          >
            <span className="ic trash" />
          </button>
        </div>
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
