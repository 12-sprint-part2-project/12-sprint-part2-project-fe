import { useState, useEffect, useCallback } from "react";
import {
  getTodayHabits,
  createHabit,
  checkHabit,
  updateHabit as updateHabitApi,
  deleteHabit as deleteHabitApi,
} from "../api/habits";

function useHabits(studyId) {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHabits = useCallback(async () => {
    if (!studyId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await getTodayHabits(studyId);
      setHabits(res.data.data);
    } catch (err) {
      setError(err.userMessage || "습관을 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [studyId]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  // 습관 추가 — BE 응답: { success, data: { id, habitName, ... } }
  const addHabit = async (habitName) => {
    const res = await createHabit(studyId, { habitName });
    const newHabit = res.data.data;
    setHabits((prev) => [
      ...prev,
      { id: newHabit.id, habitName: newHabit.habitName, isCompleted: false },
    ]);
  };

  // 습관 체크/해제 — BE TODO: 낙관적 업데이트 후 실패 시 롤백
  const toggleHabit = async (habitId, completed) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId ? { ...h, isCompleted: completed } : h,
      ),
    );
    try {
      await checkHabit(studyId, habitId, { completed });
    } catch (err) {
      // 실패 시 원래대로 롤백
      setHabits((prev) =>
        prev.map((h) =>
          h.id === habitId ? { ...h, isCompleted: !completed } : h,
        ),
      );
      throw err;
    }
  };

  // 습관 수정 — BE TODO
  const editHabit = async (habitId, habitName) => {
    await updateHabitApi(studyId, habitId, { habitName });
    setHabits((prev) =>
      prev.map((h) => (h.id === habitId ? { ...h, habitName } : h)),
    );
  };

  // 습관 삭제 — BE TODO
  const removeHabit = async (habitId) => {
    await deleteHabitApi(studyId, habitId);
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  };

  return {
    habits,
    isLoading,
    error,
    fetchHabits,
    addHabit,
    toggleHabit,
    editHabit,
    removeHabit,
  };
}

export default useHabits;
