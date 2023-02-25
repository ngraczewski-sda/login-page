import { LoginView } from "./views/LoginView/LoginView";
import styles from "./App.module.css";
import { useAuthContext } from "./context/AuthContext";
import { Switch, Route, Redirect } from "react-router-dom";
import { RegisterView } from "./views/RegisterView/RegisterView";

function App() {
  const { loggedIn } = useAuthContext();

  return (
    <div className={styles.app}>
      <Switch>
        <Route path="/login">
          <LoginView />
        </Route>
        <Route path="/register">
          <RegisterView />
        </Route>
        {loggedIn ? (
          <Route path="/home">
            <div>Successfully logged in</div>
          </Route>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </div>
  );
}

export default App;
