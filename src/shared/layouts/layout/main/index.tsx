import { FC } from "react"
import { Sidebar } from "../../sidebar/ui"
import { ILayout } from "../model"
import { Layout as AntdLayout } from "antd"
import styled from "styled-components"

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
  const { Sider, Content } = Layout

  return (
    <Layout>
      <Sider collapsible
      >
        <Sidebar />
      </Sider>

      <Layout className="container__workspace">
        <Header>
          {header}
        </Header>
        <Content className="container__workspace__content" >
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

