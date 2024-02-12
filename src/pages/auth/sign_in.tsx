import { FC, useEffect, useState } from "react"
import { useAuth } from "../../features/auth"
import { isEmail } from "class-validator"
import { useNavigate } from "react-router-dom"
import { Button, Col, Flex, Input, Row, Typography } from "antd"
import { useAccount } from "@/entities/account/api"

const SignInPage: FC = () => {
    const [email, setEmail] = useState<string>("asankheya@yurta.ru")
    const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("Tc7yf6rt!")
    const { isAuth, login, logout, checkAuth } = useAuth()
    const { me } = useAccount()

    const navigate = useNavigate()

    useEffect(() => {
        checkAuth()
    }, [])

    useEffect(() => {
        if (isEmail(email) || !email) {
            setIsEmailInvalid(false)
        }
        else {
            setIsEmailInvalid(true)
        }
    }, [email])

    const handleClick = async () => {
        await login(email, password)
        await me()

        if (isAuth) {
            navigate("/booking")
        }
    }

    return (
        <Flex vertical>
            <Col>
                <Row>
                    <Col>
                        <Typography.Title>YURTA APP</Typography.Title>
                    </Col>
                </Row>
                <Row>
                    {!isAuth &&
                        <Col>
                            <Input
                                type="email"
                                // isInvalid={isEmailInvalid}
                                placeholder="электронная почта"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                            <Input
                                type="password"
                                placeholder="пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Row>
                                <Col span={12}>
                                    <Button onClick={() => handleClick()}>Войти</Button>
                                </Col>
                                <Col span={12}>
                                    <Button onClick={() => { }}>Забыли пароль?</Button>
                                </Col>
                            </Row>

                        </Col>}
                </Row>
                <Row>
                    {
                        isAuth && (
                            <Col>
                                <Row>

                                    <Typography.Text>Уже выполнен вход</Typography.Text>
                                </Row>
                                <Row>
                                    <Button onClick={() => navigate("/booking")}>Продолжить</Button>
                                    <Button onClick={() => {
                                        logout()
                                    }}>Войти в другой аккаунт</Button>
                                </Row>
                            </Col>
                        )
                    }
                </Row>
            </Col>
        </Flex>
    )
}

export { SignInPage }