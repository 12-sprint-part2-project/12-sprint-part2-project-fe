import { Routes, Route, Link } from "react-router-dom";
import HeaderTest from "./pages/HeaderTest";
import { Tag } from "./components/Tag/Tag";

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

              <div>
                <Tag
                  type="point"
                  theme="light"
                  variant="general"
                  points={100}
                />
              </div>

              <Link to="/header-test" className="test-btn">
                Header 테스트 페이지로 이동
              </Link>
            </div>
          }
        />

        <Route path="/header-test" element={<HeaderTest />} />
      </Routes>
    </>
  );
}

export default App;
