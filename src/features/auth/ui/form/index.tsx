import React, { FC, useEffect, useState } from "react"
import { useAuth } from "../.."
import { isEmail } from "class-validator"
import { Link, useNavigate } from "react-router-dom"
import { Button, Col, Flex, Input, Row, Typography, Divider, Form, FormProps } from "antd"
import { useAccount } from "@/entities/account"
import { FloatButton } from "antd/lib"
import { FormProviderProps } from "antd/es/form/context"

type AuthForm = {
    email: string
    password: string
}

const AuthForm: FC = () => {
    // const [email, setEmail] = useState<string>("asankheya@yurta.ru")
    // const [password, setPassword] = useState<string>("B858CB282617FB0956D960215C8E84D1CCF909C6")
    const { isAuth, login, logout, checkAuth } = useAuth()
    const { me } = useAccount()
    const [form] = Form.useForm<AuthForm>()
    const email = Form.useWatch("email", form)
    const password = Form.useWatch("password", form)

    const navigate = useNavigate()

    useEffect(() => {
        checkAuth()
    }, [])

    const handleClick = async () => {
        await login(email, password)
        await me()

        if (isAuth) {
            navigate("/booking")
        }
    }

    const onFormFinish: FormProviderProps["onFormFinish"] = async (name, info) => {
        if (name == "auth_form") {
            await login(email, password)
            await me()

            if (isAuth) {
                navigate("/hotel")
            }
        }
    }

    return (
        <Col span={24}
            style={{
                borderRadius: 10,
                background: "#fff",
                padding: 20
            }}>
            {!isAuth &&
                <Form.Provider onFormFinish={onFormFinish}>
                    <Form form={form} layout="vertical" name="auth_form" style={{
                        minWidth: "300px"
                    }}>
                        <Flex vertical justify="space-between" gap={5}>
                            <Typography.Title level={3}>
                                Форма входа
                            </Typography.Title>

                            <Form.Item label="Адрес электронной почты" name="email">
                                <Input
                                    type="email"
                                    placeholder="электронная почта"
                                    value={email}
                                />
                            </Form.Item>

                            <Form.Item label="Пароль" name="password">
                                <Input
                                    type="password"
                                    placeholder="пароль"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Row justify={"space-between"}>
                                    <Col>
                                        <Button htmlType="submit" >
                                            Войти
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button>
                                            <Link to="/partners/sign_up">Зарегистрироваться</Link>
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Flex>
                    </Form>
                </Form.Provider>
            }
            {
                isAuth && (
                    <Row className="modal_signIn_yurta">
                        <Col className="modal_container_signIn_yurta">
                            <Row className="modal_container_signIn_yurta_title">
                                <Typography.Text style={{ fontWeight: "600" }}>Уже выполнен вход</Typography.Text>
                            </Row>
                            <Row className="modal_container_signIn_yurta_buttons">
                                <Button onClick={() => navigate("/hotel")} type="primary">Продолжить</Button>
                                <Button onClick={() => {
                                    logout()
                                }}>Войти в другой аккаунт</Button>
                            </Row>
                        </Col>
                    </Row>
                )
            }
        </Col>
    )

}
export default AuthForm