import { Route, Routes } from "react-router-dom";

import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "./config/routes";
import AuthCheck from "./common/AuthCheck";
import "./App.scss";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<div>Loading</div>}>
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
