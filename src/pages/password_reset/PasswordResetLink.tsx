
import { FC } from "react";
import { Layout } from "../auth/SignInPage";
import { Button, Col, Flex, Form, Input, Row, Typography, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios, { AxiosError } from "axios";
import { FormProviderProps } from "antd/es/form/context";

const PasswordResetLinkPage: FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const email = Form.useWatch("email", form)
    const password = Form.useWatch("password", form)
    const rePassword = Form.useWatch('re-password', form)

    const handleFormFinish: FormProviderProps["onFormFinish"] = async (name, info) => {
        console.log(info)
        await axios.post(`${import.meta.env.VITE_API}/auth/password/reset/${id}`, {
            ...info.values
        })
            .then((res) => {
                notification.success({
                    message: "Пароль был успешно изменен",
                    placement: "topRight",
                    btn: <Button onClick={() => navigate('auth')}>Перейти на страницу авторизации</Button>
                })
            })
            .catch((e: AxiosError) => {
                if (e.status === 403) {
                    notification.error({
                        message: "Пользователь с такими данными не найден",
                        placement: "topRight"
                    })
                }
                throw e
            })
    }

    return <Layout>
        <div style={{
            background: "white",
            borderRadius: 5,
            padding: "20px"
        }}>
            <Form.Provider onFormFinish={handleFormFinish}>
                <Form layout="vertical">
                    <Row justify={"space-between"} align={"middle"}>
                        <Col>
                            <Typography.Title level={3}>
                                Придумайте новый пароль
                            </Typography.Title>
                        </Col>
                    </Row>

                    <Form.Item label="Логин" name="email">
                        <Input placeholder="someemail@yurta.site" />
                    </Form.Item>

                    <Form.Item label="Новый пароль" name="password" >
                        <Input type="password" placeholder="Пароль" />
                    </Form.Item>

                    <Form.Item label="Повторите новый пароль" name="re-password">
                        <Input type="password" placeholder="Повторите пароль" />
                    </Form.Item>
                    <Row justify={"space-between"}>
                        <Col span={5}>
                            <Flex justify="center">
                                <Button type="primary" onClick={() => navigate('/auth')} >Назад</Button>
                            </Flex>
                        </Col>
                        <Col>
                            <Button htmlType="submit">Изменить пароль</Button>
                        </Col>
                    </Row>

                </Form>
            </Form.Provider>
        </div>
    </Layout>
}

export { PasswordResetLinkPage }