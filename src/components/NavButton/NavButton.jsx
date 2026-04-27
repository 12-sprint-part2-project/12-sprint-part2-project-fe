import styles from "./NavButton.module.css";

function NavButton({ label, onClick }) {
  return (
    <button className={styles.navBtn} onClick={onClick}>
      {label}
      <span className="ic angle-right"></span>
    </button>
  );
}

export default NavButton;
