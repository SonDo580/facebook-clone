import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "./config/routes";
import AuthCheck from "./common/AuthCheck";
import Skeleton from "./common/Skeleton";
import "./App.scss";

function App() {
  return (
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
  );
}

export default App;
