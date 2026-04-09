import logo from "../../assets/images/img_logo.svg";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="inner">
        <div className="header-left">
          <img src={logo} alt="공부의 숲" />
        </div>
        <div className="header-right">{/* 버튼 컴포넌트 연결 예정 */}</div>
      </div>
    </header>
  );
}

export default Header;
