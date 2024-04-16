import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './app/router'
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from 'antd'
import ru_RU from "antd/lib/locale/ru_RU"
import { LoadingProvider, LoadingWrapper } from './processes/loading/LoadingProvider'
import { OnboardingProvider } from './processes/onboarding/api/onboardingProvider'
import { GlobalStyles } from './app/styles/global'

const basename = import.meta.env.PROD ? "/" : "partners"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <ConfigProvider locale={ru_RU}>
      <BrowserRouter basename={"/"}>
        <LoadingProvider>
          <LoadingWrapper>
            <OnboardingProvider>
              <GlobalStyles />
              <Router />
            </OnboardingProvider>
          </LoadingWrapper>
        </LoadingProvider>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
)