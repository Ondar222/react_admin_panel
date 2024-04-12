import { FC, useEffect } from "react"
import { useAuth } from "../.."
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Button, Col, Flex, Input, Row, Typography, Form } from "antd"
import { useAccount } from "@/entities/account"
import { FormProviderProps } from "antd/es/form/context"
import { AuthFormDto } from "../../model/interface"
import { useRedirect } from "../../api/authProvider"
import { useOnboarding } from "@/processes/onboarding/api/onboardingProvider"
import { useLoading, withLoading } from "@/processes"
import { useHotel } from "@/entities/hotel"
import { useRoom } from "@/entities/room"

const AuthForm: FC = () => {
    const { isAuth, login } = useAuth()
    const { onboardingStatus, checkOnboardingStatus } = useOnboarding()
    const { } = useRedirect()
    const { me } = useAccount()
    const [form] = Form.useForm<AuthFormDto>()
    const email = Form.useWatch("email", form)
    const password = Form.useWatch("password", form)
    const { hotel, getHotelDetails } = useHotel()
    const { rooms, getHotelRelatedRooms } = useRoom()
    const { setLoading } = useLoading()

    const fetchData = async () => {
        await getHotelDetails()
        await getHotelRelatedRooms()
    }

    const navigate = useNavigate()

    const onFormFinish: FormProviderProps["onFormFinish"] = async (name, info): Promise<void> => {
        if (name == "auth_form") {
            await login(email, password)
                .then(async (res) => {
                    await me()
                })
                .then(async () => {
                    await withLoading(fetchData, setLoading)
                })
                .finally(async () => {
                    await checkOnboardingStatus()
                })
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
                                        <NavLink to="/sign_up">Зарегистрироваться</NavLink>
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Flex>
                </Form>
            </Form.Provider>
        </Col>
    )

}
export default AuthForm