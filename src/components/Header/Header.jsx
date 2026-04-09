import logo from "../../assets/images/img_logo.svg";
import btnCTA from "../../assets/images/buttons/btn_CTA.svg";
import "./header.css";

function Header({ onCreateStudy }) {
  return (
    <header className="header">
      <div className="inner">
        <div className="header-left">
          <img src={logo} alt="공부의 숲" />
        </div>
        <div className="header-right">
          <button className="btn-cta" onClick={onCreateStudy}>
            <img src={btnCTA} alt="스터디 만들기" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
