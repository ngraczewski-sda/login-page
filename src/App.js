import { LoginView } from "./views/LoginView/LoginView";
import styles from "./App.module.css";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { loggedIn } = useAuthContext();

  return (
    <div className={styles.app}>
      {!loggedIn && <LoginView />}
      {loggedIn && <div>Successfully logged in</div>}
    </div>
  );
}

export default App;
