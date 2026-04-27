import React from "react";
import styles from "./HabitStamp.module.css";

const HabitStamp = ({ status, color }) => {
  return (
    <div
      className={styles.stamp}
      style={{ backgroundColor: status === "done" ? color : "var(--gray-200)" }}
    ></div>
  );
};

export default HabitStamp;
