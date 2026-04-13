import { Routes, Route, Link } from "react-router-dom";
import HeaderTest from "./pages/HeaderTest";
import TagTest from "./pages/TagTest";
import CardTest from "./pages/CardTest";
import ButtonTest from "./pages/ButtonTest";
import PopupTest from "./pages/PopupTest";
import ModalTest from "./pages/ModalTest";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <h1 className="title">Part_2 Team3</h1>
              <p className="text">CSS Variable Test</p>

              <Link to="/header-test" className="test-btn">
                Header 테스트 페이지로 이동
              </Link>
              <br />
              <Link to="/tag-test">Tag 테스트 페이지로 이동</Link>
              <br />
              <Link to="/card-test">Card 테스트 페이지로 이동</Link>
              <br />
              <Link to="/button-test">Button 테스트 페이지로 이동</Link>
              <br />
              <Link to="/popup-test">Popup 테스트 페이지로 이동</Link>
              <br />
              <Link to="/modal-test">Modal 테스트 페이지로 이동</Link>
            </div>
          }
        />

        <Route path="/header-test" element={<HeaderTest />} />
        <Route path="/tag-test" element={<TagTest />} />
        <Route path="/card-test" element={<CardTest />} />
        <Route path="/button-test" element={<ButtonTest />} />
        <Route path="/popup-test" element={<PopupTest />} />
        <Route path="/modal-test" element={<ModalTest />} />
      </Routes>
    </>
  );
}

export default App;
