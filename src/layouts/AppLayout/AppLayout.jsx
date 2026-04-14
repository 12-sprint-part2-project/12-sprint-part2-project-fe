import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const showButton =
    location.pathname === "/" || location.pathname === "/studies/new";

  return (
    <div className={styles.appWrapper}>
      <Header
        showButton={showButton}
        onCreateStudy={() => navigate("/studies/new")}
      />

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
