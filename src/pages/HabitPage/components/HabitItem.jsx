import styles from "./HabitItem.module.css";
import "../../../styles/global/icon.css";

function HabitItem({ habit, isEditMode, onToggle, onEdit, onDelete }) {
  if (isEditMode) {
    return (
      <div className={styles.editRow}>
        <button
          className={`${styles.editItem} ${habit.isCompleted ? styles.completed : ""}`}
          onClick={() => onEdit(habit)}
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
