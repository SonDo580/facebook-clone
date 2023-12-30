import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import { PATHS } from "./paths";

const PUBLIC_ROUTES = [
  {
    path: PATHS.register,
    component: Register,
  },
  {
    path: PATHS.login,
    component: Login,
  },
];

const PROTECTED_ROUTES = [
  {
    path: PATHS.home,
    component: Home,
  },
  {
    path: PATHS.profile,
    component: Profile,
  },
];

export { PATHS, PUBLIC_ROUTES, PROTECTED_ROUTES };
