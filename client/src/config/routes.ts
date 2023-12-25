import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
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
];

export { PATHS, PUBLIC_ROUTES, PROTECTED_ROUTES };
