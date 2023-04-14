import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import App from "../../App";

export const RequireAuth = ({children}) => {
  const auth = useContext(AuthContext);

  if(!auth.user) {
    return <App />;
  }
  return children;
}
