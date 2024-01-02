import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "./config/routes";
import { authSelector } from "./redux/selectors";
import AuthCheck from "./common/AuthCheck";
import Skeleton from "./common/Skeleton";
import Spinner from "./common/Spinner";
import "./App.scss";

function App() {
  const { loading } = useSelector(authSelector);

  return (
    <>
      <Suspense fallback={<Skeleton count={10} />}>
        <Routes>
          {PUBLIC_ROUTES.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}

          <Route element={<AuthCheck />}>
            {PROTECTED_ROUTES.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Routes>
      </Suspense>

      {loading && <Spinner />}
      <ToastContainer />
    </>
  );
}

export default App;
