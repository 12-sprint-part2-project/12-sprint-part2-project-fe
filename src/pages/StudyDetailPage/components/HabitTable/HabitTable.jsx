import React from "react";
import HabitStamp from "../HabitStamp/HabitStamp";
import {
  dateFormat,
  getHabitColor,
  getWeekDates,
  habitLogsMap,
  isHabitActive,
} from "../../utils/habitUtils";
import styles from "./HabitTable.module.css";

const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

const HabitTable = ({ habits, studyId }) => {
  const weekDates = getWeekDates();

  return (
    <section className={styles.weeklyHabits}>
      <h2>습관 기록표</h2>

      <div className={styles.habitTable}>
        {habits.length ? (
          <>
            <div className={`${styles.tHead} ${styles.tRow}`}>
              <div className={`${styles.tbCell} ${styles.tbTh}`}></div>
              {DAY_LABELS.map((label) => (
                <div key={label} className={`${styles.tbCell} ${styles.tbTh}`}>
                  {label}
                </div>
              ))}
            </div>

            <div className={styles.tBody}>
              {habits.map((habit, index) => {
                const logMap = habitLogsMap(habit.habitLogs);
                const color = getHabitColor(studyId, index);

                return (
                  <div key={habit.id} className={styles.tRow}>
                    <div className={`${styles.tbCell} ${styles.tbTh}`}>
                      {habit.habitName}
                    </div>

                    {weekDates.map((date) => {
                      const key = dateFormat(date, "yyyy-mm-dd");
                      const log = logMap[key];
                      const status = !log || !log.completedAt ? "yet" : "done";

                      return (
                        <div key={key} className={styles.tbCell}>
                          {isHabitActive(habit, date) && (
                            <HabitStamp status={status} color={color} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p className={styles.notification}>등록된 습관이 없습니다.</p>
        )}
      </div>
    </section>
  );
};

export default HabitTable;
