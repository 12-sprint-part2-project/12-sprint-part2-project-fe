# feat/#6-habits-test-view → dev

## 개요

오늘의 습관 페이지(HabitPage) UI를 구현했습니다.  
메인 뷰(오늘의 습관 토글)와 목록 수정 모달(습관 추가/삭제)을 포함하며,  
두 뷰 간 디자인 불일치 수정 및 추가 입력 UX 개선 작업이 포함되어 있습니다.

---

## 변경 사항

### 🆕 신규 구현
- **오늘의 습관 메인 뷰**: 습관 목록 렌더링, 완료/미완료 토글 기능 (`useHabits` 훅 연동)
- **목록 수정 모달**: 습관 추가(+버튼), 삭제(쓰레기통 버튼) 기능
- **빈 상태(empty state)** UI 처리

### 🎨 디자인 통일 (HabitItem)
- 메인 뷰의 습관 아이템 디자인을 목록 수정 모달의 아이템 디자인에 맞게 통일
  - `border-radius`: `0.625rem` → `1.25rem` (pill 형태)
  - 텍스트: `text-16-medium` → `text-16-bold` + 밑줄 + `gray-500` 색상
- 목록 수정 모달의 아이템 레이아웃 개선: 이름 버튼 + 삭제 버튼 분리(`editRow` 구조)

### 🐛 UX 수정 (습관 추가 입력)
- **문제**: `+` 버튼으로 입력 필드를 열면 다른 곳 클릭 시(`onBlur`) 즉시 사라지는 현상
- **수정**: `onBlur` 제거 → 명시적 액션(Enter / 쓰레기통 버튼 / 수정 완료)으로만 닫히도록 변경
- 입력 행에 삭제(취소) 버튼 추가 — 기존 습관 아이템의 삭제 버튼과 동일한 디자인 적용
- 입력 중 **수정 완료** 버튼 클릭 시에도 습관이 정상 저장되도록 연동

### 📐 레이아웃 수정 (Habit.jsx)
- `habitHeader` 구조 개선: `titleGroup`으로 타이틀과 목록 수정 버튼을 묶어 중앙 정렬 유지
- `editBtn` 위치 기준을 `habitHeader` → `titleGroup` 기준으로 변경하여 타이틀 우측 고정

---

## 영향 범위

- `src/pages/HabitPage/Habit.jsx` — 메인 페이지 로직 및 모달 구조
- `src/pages/HabitPage/Habit.module.css` — 레이아웃 및 입력 스타일
- `src/pages/HabitPage/components/HabitItem.jsx` — 아이템 컴포넌트 구조 변경
- `src/pages/HabitPage/components/HabitItem.module.css` — 디자인 통일
- 공통 컴포넌트(`Modal`, `NavButton`, `BoxHeaderInfo`) 사용, 변경 없음
- API: `useHabits` 훅(`GET`, `POST`, `PATCH`, `DELETE`) 연동, 훅 자체 변경 없음

---

## 관련 이슈

- close #6
