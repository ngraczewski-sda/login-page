import { postLogin } from "../api/auth";

const {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} = require("react");

const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState();

  const login = useCallback(async (userData) => {
    try {
      setError();

      const res = await postLogin(userData);
      if (res.status === 200) {
        setLoggedIn(true);
        return;
      }

      if (res.status === 401) {
        setError("Invalid credentials");
        return;
      }

      setError("Unknown error");
    } catch (e) {
      setError("Unknown error");
    }
  }, []);

  const value = useMemo(
    () => ({
      login,
      loggedIn,
      error,
    }),
    [error, loggedIn, login]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthContextProvider };
