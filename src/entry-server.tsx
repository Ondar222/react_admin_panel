import ReactDOMServer from "react-dom/server"
import Router from "./app/router"
import { StaticRouter } from "react-router-dom/server";
import { ConfigProvider } from "antd"
import ru_RU from "antd/lib/locale/ru_RU"
import { ServerStyleSheet } from "styled-components"
import App from "./pages";

interface IRenderProps {
  path: string;
}

export const render = ({ path }: IRenderProps) => {
  const sheet = new ServerStyleSheet();

  return ReactDOMServer.renderToString(
    sheet.collectStyles(
      <ConfigProvider>
        <App />
      </ConfigProvider>
    )
  );
}; {/* <StaticRouter location={path}>
<Router />
</StaticRouter> */}
