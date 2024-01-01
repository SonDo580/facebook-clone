import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { PATHS } from "@/config/routes";
import { authSelector } from "@/redux/selectors";

function AuthCheck() {
  const { user } = useSelector(authSelector);

  if (user) {
    return <Outlet />;
  }

  return <Navigate to={PATHS.login} replace />;
}

export default AuthCheck;
