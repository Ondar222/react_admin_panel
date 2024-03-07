import ReactDOMServer from "react-dom/server"
import Router from "./app/router"
import { ConfigProvider } from "antd"
import { ServerStyleSheet } from "styled-components"

interface IRenderProps {
  path: string;
}

export const render = ({ path }: IRenderProps) => {
  const sheet = new ServerStyleSheet();

  return ReactDOMServer.renderToString(
    sheet.collectStyles(
      <ConfigProvider>
        {/* <Router /> */}
      </ConfigProvider>
    )
  );
}; {/* <StaticRouter location={path}>
<Router />
</StaticRouter> */}
