import { Route, Routes } from "react-router-dom";

import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "./config/routes";
import AuthCheck from "./common/AuthCheck";
import "./App.scss";

function App() {
  return (
    <Routes>
      {PUBLIC_ROUTES.map(({ path, component }) => (
        <Route key={path} path={path} element={component()} />
      ))}

      <Route element={<AuthCheck />}>
        {PROTECTED_ROUTES.map(({ path, component }) => (
          <Route key={path} path={path} element={component()} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
