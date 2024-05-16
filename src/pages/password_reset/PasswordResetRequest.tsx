
import { FC } from "react";
import { Layout } from "../auth/SignInPage";
import { Button, Col, Flex, Form, Input, Row, Typography, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { FormProviderProps } from "antd/es/form/context";

const PasswordResetRequestPage: FC = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const email = Form.useWatch("email", form)

    const handleFormFinish: FormProviderProps["onFormFinish"] = async (name, info) => {
        console.log(info)
        await axios.post(`${import.meta.env.VITE_API}/auth/password/reset`, {
            ...info.values
        }).then(() => {
            notification.success({
                message: `Запрос был принят, ожидайте письмо на почту ${info.values.email}`,
                placement: "topRight"
            })
        }).catch((e) => {
            notification.error({
                message: "Запрос был отклонен, попробуйте изменить логин",
                placement: "topRight"
            })
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
                        <Typography.Title level={3}>
                            Запрос на изменение пароля
                        </Typography.Title>
                    </Row>

                    <Form.Item label="Логин" name="email">
                        <Input placeholder="someemail@yurta.site" name="email" />
                    </Form.Item>
                    <Row justify={"space-between"}>
                        <Col span={5}>
                            <Flex justify="center">
                                <Button type="primary" onClick={() => navigate('/auth')} >Назад</Button>
                            </Flex>
                        </Col>
                        <Col>
                            <Button htmlType="submit">Отправить</Button>
                        </Col>
                    </Row>
                </Form>
            </Form.Provider>
        </div>
    </Layout>
}

export { PasswordResetRequestPage }