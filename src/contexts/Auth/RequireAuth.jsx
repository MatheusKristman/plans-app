import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Admin from "../../pages/Admin";

export const RequireAuth = ({children}) => {
  const auth = useContext(AuthContext);

  if(!auth.user) {
    return <Admin />;
  }
  return children;
}
