import {
  Route,
  Routes
} from "react-router-dom";
import { RouterConfig } from "@/app/config";
import { FC } from "react";

const routes = Object.values(RouterConfig)

const Router: FC = () =>
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

