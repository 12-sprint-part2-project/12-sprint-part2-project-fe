import styles from "./HabitForm.module.css";

// Modal의 innerComponent로 주입되는 습관 이름 입력 폼
// value / onChange는 부모(Habit.jsx)가 관리
function HabitForm({ value, onChange }) {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="+"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={30}
      autoFocus
    />
  );
}

export default HabitForm;
