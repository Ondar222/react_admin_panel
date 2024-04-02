import { FC, useState } from "react"
import { Sidebar } from "../../sidebar/ui"
import { ILayout } from "../model"
import { Layout as AntdLayout } from "antd"
import styled from "styled-components"
import { useLoading } from "@/processes/loading/LoadingProvider"
import { LoadingPage } from "@/widget/loading_page"

export const Layout = styled(AntdLayout)`
  background: none;
  color: black;
  height: 100%;
  min-height: 100dvh;
`

export const Header = styled(AntdLayout.Header)`
  position: sticky;
  top: 0;
  z-index: 10;

  background: white;
  padding: 15px 50px;
`

export const Footer = styled(AntdLayout.Footer)`
`

const MainLayout: FC<ILayout> = ({ header, children, footer }) => {
  const {loading} = useLoading()
  const { Sider, Content } = Layout

  if (loading) {
    return <LoadingPage layout="empty" />
  }

  return (
    <Layout hasSider>
      <Sider
        collapsible
      >
        <Sidebar />
      </Sider>

      <Layout
        className="container__wrap">
        <Header>
          {header}
        </Header>

        <Content className="container__content" >
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

