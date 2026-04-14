import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/Home";
import StudyDetailPage from "./pages/StudyDetailPage/StudyDetail";
import StudyFormPage from "./pages/StudyFormPage/StudyForm";
import HabitPage from "./pages/HabitPage/Habit";
import FocusPage from "./pages/FocusPage/Focus";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/studies/new" element={<StudyFormPage />} />
      <Route path="/studies/:studyId" element={<StudyDetailPage />} />
      <Route path="/studies/:studyId/habits" element={<HabitPage />} />
      <Route path="/studies/:studyId/focus" element={<FocusPage />} />
    </Routes>
  );
}

export default App;
