import { FC, useState } from "react";
import { Form, Col, Row, Typography, Button, Input, notification, Switch, Flex } from "antd";
import { useOtp } from "@/features/otp";
import { SignUpDto, } from "./model";
import { FormProviderProps } from "antd/es/form/context";
import { useSignUp } from "./api/useSignUp";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Logo } from "../auth/ui/form";

const SignUpForm: FC = () => {
    const [form] = Form.useForm<SignUpDto>()
    const [isPhoneVerification, setIsPhoneVerification] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(60)
    const email = Form.useWatch<string>("email", form)
    const phone = Form.useWatch<string>("phone", form)
    const password = Form.useWatch<string>("password", form)
    const repeat_password = Form.useWatch<string>("repeat_password", form)
    const code = Form.useWatch<string>("code", form)
    const surname = Form.useWatch<string>("surname", form)
    const name = Form.useWatch<string>("name", form)
    const agreement = Form.useWatch<boolean>("agreement", form)

    const { verifyPhoneNumber } = useOtp()
    const { signUp } = useSignUp()
    const navigate = useNavigate()

    const handleFormSubmit: FormProviderProps["onFormFinish"] = async (form_name, info) => {
        if (repeat_password != password) {
            notification.error({
                message: "Пароли не совпадают",
                placement: "topRight"
            })
            throw new Error("Пароли не совпадают")
        }

        if (form_name === "sign-up_form") {

            const user = await signUp(form.getFieldsValue())
                .then((res) => {
                    notification.success({
                        message: "Пользователь создан",
                        placement: "topRight",
                    })
                    navigate("/auth")
                })
                .catch((e: AxiosError) => {
                    if (e.response.status === 401) {
                        notification.error({
                            message: "Одноразовый пароль был использован или просрочен",
                            placement: "topRight",
                        })
                    }
                    if (e.response.status === 409) {
                        notification.error({
                            message: "Пользователь с такими данными уже существует",
                            placement: "topRight"
                        })
                    } else {
                        notification.error({
                            message: "Не удалось зарегистрироваться",
                            placement: "topRight"
                        })
                    }
                })
        }
    }

    const handleVerifyPhoneNumber = async () => {

        const result = await verifyPhoneNumber({
            phone: phone
        })
            .then((res) => {
                return true
            })
            .catch((e) => {
                notification.error({
                    message: "Недопустимый формат номера",
                    placement: "topRight"
                })
            })
        if (result) {
            setIsPhoneVerification(true)
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)

            const timeout = setTimeout(() => {
                setIsPhoneVerification(false)
                setTimer(60)
                return () => {
                    clearInterval(interval)
                    clearTimeout(timeout)
                }
            }, 1 * 60 * 1000)
        }

    }

    const validatePassword = () => {
        if (password === repeat_password) {
            return true
        }
        return false
    }

    return (
        <Form.Provider
            onFormFinish={handleFormSubmit}>
            <Form
                form={form}
                layout="vertical"
                size="middle"
                style={{
                    width: 550,
                    background: "#fff",
                    padding: 20,
                    borderRadius: 10
                }}
                name="sign-up_form"
                className="sign-up_form">
                <Flex
                    align="center"
                    gap={5}>
                    <Logo src="/favicon_black.jpg" />
                    <Typography.Title level={2} style={{ marginBottom: 0 }}>
                        Yurta App: Регистрация
                    </Typography.Title>
                </Flex>


                <Row gutter={[16, 16]} justify={"space-between"}>
                    <Col span={12}>
                        <Form.Item label="Имя" name={"name"} required
                            rules={[{
                                required: true
                            }]}>
                            <Input placeholder="Имя" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Фамилия"
                            name={"surname"}
                            required
                            rules={[{
                                required: true
                            }]}>
                            <Input placeholder="Фамилия" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Номер телефона"
                            name="phone"
                            required
                            rules={[{
                                required: true
                            }]}>
                            <Input
                                placeholder="79001234567"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Адрес электронной почты"
                            name="email"
                            required
                            rules={[{
                                required: true
                            }]}
                        >
                            <Input type="email" placeholder="example@yurta.site" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Код подтверждения"
                            name="code"
                            required
                            rules={[{
                                required: true
                            }]}>
                            <Input placeholder="XXXXXX" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={isPhoneVerification ? `Повторная отправка возможна через ${timer}` : " "}>
                            <Button
                                disabled={isPhoneVerification}
                                style={{
                                    width: "100%"
                                }}
                                onClick={handleVerifyPhoneNumber}>
                                Подтвердить номер
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Пароль" name={"password"} required
                            rules={[{
                                required: true
                            }]}>
                            <Input type="password" placeholder="********" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Повторите пароль"
                            name={"repeat_password"}
                            required
                            rules={[{
                                required: true
                            }]}>
                            <Input type="password" placeholder="********" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Flex
                            justify={"center"}
                            align={"center"}
                            gap={5}
                        >
                            <Form.Item name={"agreement"} style={{ marginBottom: 0 }}>
                                <Switch size="small" />
                            </Form.Item>
                            <Typography.Text>
                                Я согласен с условиями <Link to="/terms">Пользовательского соглашения</Link>
                            </Typography.Text>
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Button
                            disabled={!agreement}
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: "100%"
                            }}>
                            Зарегистрироваться
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Form.Provider>
    )
}


export { SignUpForm }