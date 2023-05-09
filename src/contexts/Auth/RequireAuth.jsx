import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const api = useApi();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("authToken");
      if (storageData) {
        const data = await api.validateToken(storageData);
        console.log("data", data);
        if (!data.verified) {
          navigate("/admin");
          return;
        }

        setUser(data.token);
      } else {
        navigate("/admin");
        return;
      }
    };

    validateToken();
  }, []);

  return children;
};
