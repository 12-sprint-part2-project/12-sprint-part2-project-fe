/**
 * 오늘 날짜를 기준으로
 * 이번 주 월~일 날짜 생성
 */
export const getWeekDates = () => {
  const today = new Date();
  const day = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
  monday.setHours(0, 0, 0, 0); // 시간 설정 - 시, 분, 초, 마이크로초?

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });
};

export const habitLogsMap = (habitLogs) => {
  return habitLogs.reduce((acc, log) => {
    const key = log.logDate.slice(0, 10); // yyyy-mm-dd
    acc[key] = log;
    return acc;
  }, {});
};

/**
 * 습관 출력 조건 처리
 * startAt 이전 또는 endAt 이후 에는 스탬프 미출력
 * @param {Object} habit - 습관 데이터 객체
 * @param {Date} date - 이번 주간 날짜 데이터
 * @returns {Boolean} 습관 출력 조건값
 */
export const isHabitActive = (habit, date) => {
  const start = new Date(habit.startAt);
  start.setHours(0, 0, 0, 0);

  // start 이전 이면 비활성
  if (date < start) return false;

  if (habit.endAt) {
    const end = new Date(habit.endAt);
    end.setHours(23, 59, 59, 999);

    if (date > end) return false;
  }

  return true;
};

/**
 * 스터디별 스탬프 컬러 지정
 * @param {String} studyId - 스터디 id
 * @param {Int} index - 습관의 순번
 * @returns {String} 스터디별 구한 색상값(hue)을 기준, 습관의 순번 기준 명도(lightness) 조절한 hsl 색상값
 */
export const getHabitColor = (studyId, index) => {
  const hue = (studyId * 137) % 360;
  const lightness = 90 - index * 3; // 90% 부터 0% 까지 3% 씩 감소
  return `hsl(${hue}, 60%, ${lightness}%)`;
};

/**
 *
 * @param {Date} date - 변환할 날짜 데이터
 * @param {String} format
 * @returns {String} 변환된 날짜 데이터
 */
export const dateFormat = (date, format) => {
  let convertedDate;

  switch (format) {
    case "yyyy-mm-dd":
      const d = new Date(date);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      convertedDate = `${yyyy}-${mm}-${dd}`;
      break;
    default:
      convertedDate = date;
  }

  return convertedDate;
};
