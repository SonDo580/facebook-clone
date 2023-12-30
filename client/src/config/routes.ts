import { lazy } from "react";

import { PATHS } from "./paths";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));

const PUBLIC_ROUTES = [
  {
    path: PATHS.register,
    Component: Register,
  },
  {
    path: PATHS.login,
    Component: Login,
  },
];

const PROTECTED_ROUTES = [
  {
    path: PATHS.home,
    Component: Home,
  },
  {
    path: PATHS.profile,
    Component: Profile,
  },
];

export { PATHS, PUBLIC_ROUTES, PROTECTED_ROUTES };
