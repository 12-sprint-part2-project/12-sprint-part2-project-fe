import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout/AppLayout";
import HomePage from "./pages/HomePage/Home";
import StudyDetailPage from "./pages/StudyDetailPage/StudyDetail";
import StudyFormPage from "./pages/StudyFormPage/StudyForm";
import HabitPage from "./pages/HabitPage/Habit";
import FocusPage from "./pages/FocusPage/Focus";
import PasswordModal from "./pages/StudyDetailPage/components/PasswordModal/PasswordModal";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/studies/new" element={<StudyFormPage />} />
        <Route path="/studies/:studyId" element={<StudyDetailPage />} />
        <Route path="/studies/:studyId/habits" element={<HabitPage />} />
        <Route path="/studies/:studyId/focus" element={<FocusPage />} />
      </Route>
    </Routes>
  );
}

export default App;
