import { FC, useEffect } from "react"
import { useAuth } from "../.."
import { Link, useNavigate } from "react-router-dom"
import { Button, Col, Flex, Input, Row, Typography, Form } from "antd"
import { useAccount } from "@/entities/account"
import { FormProviderProps } from "antd/es/form/context"
import { AuthFormDto } from "../../model/interface"
import { useRedirect } from "../../api/authProvider"
import { checkOnboardingStatus, useOnboarding } from "@/processes/onboarding/api/onboardingProvider"

const AuthForm: FC = () => {
    const { isAuth, login, logout, checkAuth } = useAuth()
    const { onboardingStatus } = useOnboarding()
    const { } = useRedirect()
    const { me } = useAccount()
    const [form] = Form.useForm<AuthFormDto>()
    const email = Form.useWatch("email", form)
    const password = Form.useWatch("password", form)

    const navigate = useNavigate()

    const handleClick = async () => {
        await login(email, password)
        await me()

        if (isAuth) {
            navigate("/booking")
        }
    }

    const onFormFinish: FormProviderProps["onFormFinish"] = async (name, info): Promise<void> => {
        if (name == "auth_form") {
            await login(email, password)
            await me()

            console.log('onboarbing checked')
            if (onboardingStatus != "finish") {
                navigate("/onboarding")
            }

            navigate("/hotel")
        }
    }

    return (
        <Col span={24}
            style={{
                borderRadius: 10,
                background: "#fff",
                padding: 20
            }}>

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
            {/* {isAuth && (
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
            )} */}
        </Col>
    )

}
export default AuthForm