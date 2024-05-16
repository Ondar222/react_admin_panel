import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './app/providers/router/ui/Router'
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from 'antd'
import ru_RU from "antd/lib/locale/ru_RU"
import { LoadingProvider, LoadingWrapper } from './processes/loading/LoadingProvider'
import { OnboardingProvider } from './processes/onboarding/api/onboardingProvider'
import { GlobalStyles } from './app/styles/global'
import { CareButton } from './widget/care-service/CareButton';
import { WSSProvider } from './app/providers/wss';
import { AuthProvider } from './app/providers/auth/authProvider';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <ConfigProvider locale={ru_RU}>
      <BrowserRouter basename={"/"}>
        <LoadingProvider>
          <LoadingWrapper>
            <OnboardingProvider>
              <GlobalStyles />
              <AuthProvider>
                <WSSProvider>
                  <Router />
                </WSSProvider>
              </AuthProvider>
              <CareButton />
            </OnboardingProvider>
          </LoadingWrapper>
        </LoadingProvider>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
)