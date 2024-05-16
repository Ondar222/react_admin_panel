import { FC } from "react"
import { Layout as AntLayout, Button, Col, Flex, Row, Space, Typography } from "antd"
import { AuthForm } from "@/features/auth/ui"
import styled from "styled-components"
import { useAuth } from "@/app/providers/auth/authProvider"
import { useNavigate } from "react-router-dom"

// TODO: перенести куда-нибудь в shared
export const Layout = styled(AntLayout)`
  background: #001529;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AlreadySignedIn: FC = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  return (
    <Flex vertical gap={5} style={{
      background: "white",
      borderRadius: 5,
      padding: "20px"
    }}>
      <Typography.Title level={2}>Уже выполнен вход</Typography.Title>

      <Row justify={"space-between"}>
        <Col>
          <Button onClick={() => {
            logout()
            navigate('/auth')
          }}>Войти в другой аккаунт</Button>
        </Col>
        <Col>
          <Button onClick={() => navigate("/booking")}>Войти</Button>
        </Col>
      </Row>
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





