import { FC } from "react";
import { Form, Col, Row, Typography, Button, Input, notification, Switch } from "antd";
import { useOtp } from "@/features/otp";
import { SignUpDto, } from "./model";
import { FormProviderProps } from "antd/es/form/context";
import { useSignUp } from "./api/useSignUp";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const SignUpForm: FC = () => {
    const [form] = Form.useForm<SignUpDto>()
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
                    }
                })

        }
    }

    const handleVerifyPhoneNumber = async () => {
        const result = await verifyPhoneNumber({
            phone: phone
        })
            .then((res) => res)
            .catch((e) => {
                notification.error({
                    message: "Недопустимый формат номера",
                    placement: "topRight"
                })
            })
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
                    background: "#fff",
                    padding: 20,
                    borderRadius: 10
                }}
                name="sign-up_form">

                <Col>
                    <Row gutter={[16, 16]}>
                        <Typography.Title level={2}>
                            Регистрация
                        </Typography.Title>
                    </Row>
                    <Row gutter={[16, 16]}>
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
                    </Row>

                    <Row gutter={[16, 16]}>
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
                    </Row>

                    <Row gutter={[16, 16]} align={"middle"}>
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
                            <Form.Item label=" ">
                                <Button
                                    style={{
                                        width: "100%"
                                    }}
                                    onClick={handleVerifyPhoneNumber}>
                                    Подтвердить номер
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
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
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Row gutter={[16, 16]}>
                                <Col span={3}>
                                    <Form.Item name={"agreement"}>
                                        <Switch title="asd" size="small" />
                                    </Form.Item>
                                </Col>
                                <Col span={20}>
                                    <Typography.Text>
                                        Я согласен с условиями <a href="#">Пользовательского соглашения</a>
                                    </Typography.Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12} >
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
                </Col>
            </Form>
        </Form.Provider>
    )
}


export { SignUpForm }