/**
 * 오늘 날짜를 기준으로
 * 이번 주 월~일 날짜 생성
 */
export const getWeekDates = () => {
  // KST 기준 오늘 날짜 문자열
  const kstNow = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
  const kstDateStr = kstNow.toISOString().slice(0, 10); // "2026-04-27"

  // UTC 자정 기준 Date로 변환 (DB logDate와 맞추기 위해)
  const today = new Date(`${kstDateStr}T00:00:00.000Z`);
  const day = today.getUTCDay();
  const monday = new Date(today);
  monday.setUTCDate(today.getUTCDate() - (day === 0 ? 6 : day - 1));

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setUTCDate(monday.getUTCDate() + i);
    return date;
  });
};

export const habitLogsMap = (habitLogs) => {
  return habitLogs.reduce((acc, log) => {
    const key = log.logDate.slice(0, 10); // 그냥 UTC 날짜 그대로 사용
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
  const startUTC = habit.startAt.slice(0, 10); // "2026-04-26"
  const dateUTC = dateFormat(date, "yyyy-mm-dd"); // UTC 기준

  if (dateUTC < startUTC) return false;

  if (habit.endAt) {
    const endUTC = habit.endAt.slice(0, 10);
    if (dateUTC > endUTC) return false;
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
  switch (format) {
    case "yyyy-mm-dd":
      // UTC 기준으로 날짜 추출 (DB와 맞추기)
      const d = new Date(date);
      const yyyy = d.getUTCFullYear();
      const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
      const dd = String(d.getUTCDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    default:
      return date;
  }
};
