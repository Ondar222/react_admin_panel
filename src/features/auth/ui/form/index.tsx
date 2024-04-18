import { FC } from "react"
import { useAuth } from "../.."
import { NavLink } from "react-router-dom"
import { Button, Col, Flex, Input, Row, Typography, Form as AntForm, notification, Image, Divider, Empty } from "antd"
import { useAccount } from "@/entities/account"
import { FormProviderProps } from "antd/es/form/context"
import { AuthFormDto } from "../../model/interface"
import { useOnboarding } from "@/processes/onboarding/api/onboardingProvider"
import { useLoading, withLoading } from "@/processes"
import { useHotel } from "@/entities/hotel"
import { useRoom } from "@/entities/room"
import { AxiosError } from "axios"
import styled from "styled-components"

const Form = styled(AntForm)`
    @media(max-width: 800px) {
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    width: 400px;
    border-radius: 0.5em;
    background: #fff;
    padding: 2em;
`

export const Logo = styled(Image)`
    height: 60px !important;
    border-radius: 1em;
    margin: 10px 0;
`

const AuthForm: FC = () => {
    const { login } = useAuth()

    const [form] = Form.useForm<AuthFormDto>()
    const email = Form.useWatch("email", form)
    const password = Form.useWatch("password", form)

    const { me } = useAccount()
    const { getHotelDetails } = useHotel()
    const { getHotelRelatedRooms } = useRoom()
    const { checkOnboardingStatus } = useOnboarding()
    const { setLoading } = useLoading()

    const onLoginSuccess = async () => {
        await me()
        await getHotelDetails()
        await getHotelRelatedRooms()
        await checkOnboardingStatus()

    }

    const onLoginReject = (e: AxiosError) => {
        if (e.response.status === 403) {
            notification.error({
                message: "Не удалось войти, логин или пароль введены неверно",
                placement: "topRight"
            })
        }
    }

    const loginWithLoading = async () => {
        await login(email, password)
            .then(() => withLoading(onLoginSuccess, setLoading))
            .catch(onLoginReject)
    }

    const handleFormFinish: FormProviderProps["onFormFinish"] = async (name): Promise<void> => {
        if (name == "auth_form") {
            await withLoading(loginWithLoading, setLoading)
        }
    }

    return (
        <Form.Provider onFormFinish={handleFormFinish}>
            <Form
                form={form}
                layout="vertical"
                name="auth_form"
            >
                <Flex
                    vertical
                    justify="space-between"
                    gap={5}
                >
                    <Flex
                        gap={5}
                        align="center"
                    >
                        <Col>
                            <Logo
                                src="/favicon_black.jpg"
                                preview={false}
                            />
                        </Col>
                        <Col>
                            <Typography.Title level={3}>
                                Yurta App: Партнеры
                            </Typography.Title>
                        </Col>
                    </Flex>

                    <Form.Item label="Адрес электронной почты" name="email" rules={[{ required: true }]}>
                        <Input
                            type="email"
                            placeholder="электронная почта"
                            value={email}
                        />
                    </Form.Item>

                    <Form.Item label="Пароль" name="password" rules={[{ required: true }]}>
                        <Input
                            type="password"
                            placeholder="пароль"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Row
                            gutter={[16, 16]}
                            justify={"space-between"}>
                            <Col>
                                <Button htmlType="submit" >
                                    Войти
                                </Button>
                            </Col>
                            <Col>
                                <Button>
                                    <NavLink to="/sign_up">Зарегистрироваться</NavLink>
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Flex>
            </Form>
        </Form.Provider>
    )

}
export default AuthForm