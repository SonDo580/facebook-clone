import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../config/routes";

function AuthCheck() {
  // TODO: Check if user already logged in
  const authenticated = false;

  if (authenticated) {
    return <Outlet />;
  }

  return <Navigate to={PATHS.login} replace />;
}

export default AuthCheck;
