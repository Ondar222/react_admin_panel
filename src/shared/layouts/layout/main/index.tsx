import { FC, useState } from "react"
import { Sidebar } from "../../sidebar/ui"
import { ILayout } from "../model"
import { Layout as AntdLayout } from "antd"
import styled from "styled-components"
import { useLoading } from "@/processes/loading/LoadingProvider"
import { LoadingPage } from "@/widget/loading_page"

const { Content } = AntdLayout

export const Layout = styled(AntdLayout)`
  background: none;
  color: black;
  height: 100%;
  min-height: 100dvh;
`

export const Sider = styled(AntdLayout.Sider)`
`

export const Header = styled(AntdLayout.Header)`
  height: fit-content;
  background: white;
  padding: 15px 50px;
`

export const Footer = styled(AntdLayout.Footer)`
  background: none;
`



const MainLayout: FC<ILayout> = ({ header, children, footer }) => {
  const { loading } = useLoading()

  if (loading) {
    return <LoadingPage layout="empty" />
  }
  
  return (
    <Layout hasSider>
      <Sider>
        <Sidebar />
      </Sider>

      <Layout
        className="container__wrap">

        <Header>
          {header}
        </Header>

        <Content className="container__content">
          {children}
        </Content>

        {
          footer && (
            <Footer className="container__workspace__footer">
              {footer}
            </Footer>
          )
        }
      </Layout>
    </Layout>
  )
}

export { MainLayout }

