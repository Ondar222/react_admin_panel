import {
  Route,
  Routes
} from "react-router-dom";
import { RouterConfig } from "@/shared/config/router";

const routes = Object.values(RouterConfig)

const Router = () =>
  <Routes>
    {
      routes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={element} />
      ))
    }
  </Routes>

export default Router;

