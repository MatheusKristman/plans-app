import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useApi } from "../../hooks/useApi";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const api = useApi();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("authToken");
      if (storageData) {
        const data = await api.validateToken(storageData);
        if (data.verified) {
          setUser(data.token);
        }
      }
    };

    validateToken();
  }, []);

  const signIn = async (email, password) => {
    const data = await api.signIn(email, password);
    if (data.token) {
      setUser(data.token);
      setToken(data.token);
      return true;
    }
    return false;
  };

  const setToken = async (token) => {
    localStorage.setItem("authToken", token);
  };

  const signOut = async () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
