import "./styles/colors/colors.css";
import "./App.css";

import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <h1 className="title">Part_2 Team3</h1>
      <p className="text">CSS Variable Test</p>

      {/* Header 테스트 페이지 이동 버튼 */}
      <Link to="/header-test" className="test-btn">
        Header 테스트 페이지로 이동
      </Link>
    </div>
  );
}

export default App;
