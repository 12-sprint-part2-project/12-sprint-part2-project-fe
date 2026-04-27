import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTodayHabits,
  createHabit,
  checkHabit,
  updateHabit,
  deleteHabit,
} from "../api/habits";

function useHabits(studyId) {
  const queryClient = useQueryClient();

  // 오늘의 습관 조회
  const { data: habits = [], isLoading } = useQuery({
    queryKey: ["habits", studyId],
    queryFn: () => getTodayHabits(studyId).then((res) => res.data.data),
    enabled: !!studyId,
  });

  // 캐시 무효화 헬퍼 — habits 캐시 + study 캐시 동시 무효화
  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["habits", studyId] });
    queryClient.invalidateQueries({ queryKey: ["study", Number(studyId)] });
  };

  // 습관 추가
  const { mutateAsync: addHabitMutation } = useMutation({
    mutationFn: (habitName) => createHabit(studyId, { habitName }),
    onSuccess: invalidateAll,
  });

  // 습관 체크/해제 — 낙관적 업데이트 후 실패 시 롤백
  const { mutate: toggleHabitMutation } = useMutation({
    mutationFn: ({ habitId, completed }) =>
      checkHabit(studyId, habitId, { completed }),
    onMutate: async ({ habitId, completed }) => {
      await queryClient.cancelQueries({ queryKey: ["habits", studyId] });
      const previous = queryClient.getQueryData(["habits", studyId]);
      queryClient.setQueryData(["habits", studyId], (old) =>
        old.map((h) => (h.id === habitId ? { ...h, isCompleted: completed } : h)),
      );
      return { previous };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["habits", studyId], context.previous);
    },
    onSettled: invalidateAll,
  });

  // 습관 수정
  const { mutateAsync: editHabitMutation } = useMutation({
    mutationFn: ({ habitId, habitName }) =>
      updateHabit(studyId, habitId, { habitName }),
    onSuccess: invalidateAll,
  });

  // 습관 삭제
  const { mutateAsync: removeHabitMutation } = useMutation({
    mutationFn: (habitId) => deleteHabit(studyId, habitId),
    onSuccess: invalidateAll,
  });

  // 기존 호출부(Habit.jsx) 인터페이스 유지
  const addHabit = (habitName) => addHabitMutation(habitName);
  const toggleHabit = (habitId, completed) =>
    toggleHabitMutation({ habitId, completed });
  const editHabit = (habitId, habitName) =>
    editHabitMutation({ habitId, habitName });
  const removeHabit = (habitId) => removeHabitMutation(habitId);

  return { habits, isLoading, toggleHabit, addHabit, editHabit, removeHabit };
}

export default useHabits;
