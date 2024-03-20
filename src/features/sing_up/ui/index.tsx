import { YurtaInput } from "@/shared/components/form/ui/input/text";
import { Col, Row, Typography, Checkbox, Form, Button, Divider, Input } from "antd";
import { FC } from "react";
import { SignUpFormUIProps } from "../model";

const SignUpFormUI: FC<SignUpFormUIProps> = (props) => {
    return (
        <Form layout="vertical" className="form_registr" size="middle">
            <Row>
                <Col className="header_registr_yurta">
                    <Typography.Title>
                        Регистрация
                    </Typography.Title>
                </Col>
            </Row>
            <Divider />
            <Row style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <YurtaInput
                            label="Имя"
                            placeholder="Имя"
                            name="name"
                            value={props.user.name}
                            onChange={props.onChange}
                        />
                    </Col>
                    <Col span={12}>
                        <YurtaInput
                            label="Фамилия"
                            placeholder="Фамилия"
                            name="surname"
                            value={props.user.surname}
                            onChange={props.onChange}
                        />
                    </Col>
                </Row>
                <Row style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <Col span={24}>
                        <YurtaInput
                            addonBefore="7"
                            label="Номер телефона"
                            type="phone"
                            name="phone"
                            placeholder="Номер телефона"
                            value={props.user.phone}
                            onChange={props.onChange}
                        />
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Button onClick={() => props.verifyPhoneNumber({ phone: props.user.phone })}>
                                    Подтвердить номер
                                </Button>
                            </Col>
                            <Col span={12}>
                                <Input name="code" value={props.user.code} onChange={props.onChange} placeholder="XXXXXX" />
                            </Col>
                        </Row>

                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <YurtaInput
                            label="Адрес электронной почты"
                            type="email"
                            name="email"
                            placeholder="Электронная почта"
                            value={props.user.email}
                            onChange={props.onChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <YurtaInput
                            label="Пароль"
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            value={props.user.password}
                            onChange={props.onChange}
                        />
                    </Col>
                </Row>
            </Row>
            <Row>
                <Checkbox>
                    Я согласен с условиями <a href="#">Пользовательского соглашения</a>
                </Checkbox>
            </Row>
            <Divider />

            <Row gutter={[16, 16]}>
                <Col span={12} >
                    <Button type="primary" onClick={() => props.signUp(props.user)}>Зарегистрироваться</Button>
                </Col>
                <Col span={12} style={{ display: "flex", justifyContent: "right" }}>
                    <Button>Забыли пароль?</Button>
                </Col>
            </Row>
        </Form>
    )

}


export { SignUpFormUI }