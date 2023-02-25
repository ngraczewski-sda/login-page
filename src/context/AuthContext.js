import { postLogin, postRegister } from "../api/auth";

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
        throw "Invalid credentials";
      }

      throw "Unknown error";
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setError();

      const res = await postRegister(userData);
      if (res.status === 201) {
        setLoggedIn(true);
        return;
      }

      console.log(res.status);

      if ([401, 409].includes(res.status)) {
        throw await res.text();
      }

      throw "Unknown error";
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  const value = useMemo(
    () => ({
      login,
      register,
      loggedIn,
      error,
    }),
    [error, loggedIn, login]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthContextProvider };
