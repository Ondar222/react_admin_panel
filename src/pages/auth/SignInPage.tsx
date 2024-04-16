import { FC } from "react"
import { Layout, Space } from "antd"
import { AuthForm } from "@/features/auth/ui"

const SignInPage: FC = () => {
  return (
    <Layout style={{
      position: "relative",
      width: "100vw",
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





