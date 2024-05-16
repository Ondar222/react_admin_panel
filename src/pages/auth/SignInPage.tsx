import { FC } from "react"
import { Layout as AntLayout, Button, Flex, Space, Typography } from "antd"
import { AuthForm } from "@/features/auth/ui"
import styled from "styled-components"
import { useAuth } from "@/app/providers/auth/authProvider"
import { useNavigate } from "react-router-dom"

const Layout = styled(AntLayout)`
  background: #001529;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AlreadySignedIn: FC = () => {
  const navigate = useNavigate()
  return (
    <Flex vertical gap={5} style={{
      background: "white",
      borderRadius: 5,
      padding: "20px"
    }}>
      <Typography.Title level={2}>Уже выполнен вход</Typography.Title>
      <Button onClick={() => navigate("/booking")}>Войти</Button>
    </Flex>
  )
}

const SignInPage: FC = () => {
  const { isAuth } = useAuth()
  return (
    <Layout>
      {
        isAuth && <AlreadySignedIn />
      }
      {
        !isAuth && <AuthForm />
      }

    </Layout>
  )
}

export { SignInPage }





