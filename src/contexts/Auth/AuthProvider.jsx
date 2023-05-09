import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useApi } from "../../hooks/useApi";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const api = useApi();

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
    <AuthContext.Provider value={{ user, setUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
