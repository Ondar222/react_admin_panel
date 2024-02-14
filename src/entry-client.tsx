import React from 'react'
import ReactDOM from 'react-dom/client'
import "./app/styles/index.css"
import "./app/styles/antd-extentions.css"
import "./app/styles/regist.style.css"
import Router from './app/router'
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from 'antd'
import ru_RU from "antd/lib/locale/ru_RU"
// import App from './pages';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <ConfigProvider locale={ru_RU}>
      <BrowserRouter basename='partners'>
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  // </React.StrictMode>
)
