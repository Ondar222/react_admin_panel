import { Flex, Layout, Space } from "antd"
import { FC } from "react"
import { AuthForm } from "@/features/auth/ui"

const SignInPage: FC = () => {

  return (
    <Layout style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      background: '#001529',
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Space>
        <AuthForm />
      </Space>
    </Layout>
  )
}

export { SignInPage }





