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

  const login = useCallback(async (userData) => {
    try {
      await postLogin(userData);
      setLoggedIn(true);
    } catch (e) {
      setLoggedIn(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      login,
      loggedIn,
    }),
    [loggedIn, login]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthContextProvider };
