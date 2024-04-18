import { FC } from "react"
import { Layout as AntLayout, Space } from "antd"
import { AuthForm } from "@/features/auth/ui"
import styled from "styled-components"

const Layout = styled(AntLayout)`
  background: #001529;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SignInPage: FC = () => {
  return (
    <Layout>
      <AuthForm />
    </Layout>
  )
}

export { SignInPage }





