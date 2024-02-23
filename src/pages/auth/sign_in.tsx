import { Flex, Layout } from "antd"
import { FC } from "react"
import { AuthForm } from "@/features/auth/ui"

const SignInPage: FC = () => {

  return (
    <Layout style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: '#001529'
    }}>
      <Flex vertical align="center" justify="center">
        <AuthForm />
      </Flex>
    </Layout>
  )
}

export { SignInPage }





