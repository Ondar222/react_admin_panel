import { YurtaInput } from "@/shared/components/form/ui/input/text";
import { Col, Row, Typography, Checkbox, Form, Button, Divider, Input } from "antd";
import { FC } from "react";

const SignUpFormUI: FC<any> = (props) => {
    return (
        <Col span={12}>
            <Form layout="vertical" className="form_registr">
                <Row>
                    <Col className="header_registr_yurta">
                        <Typography.Title>
                            Регистрация
                        </Typography.Title>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Input placeholder="Имя" value={props.user.name} />
                    </Col>
                    <Col span={12}>
                        <Input placeholder="Фамилия" value={props.user.surname} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Input type="phone" placeholder="Номер телефона" value={props.user.phone} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Input type="email" placeholder="Электронная почта" value={props.user.email} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Input type="password" placeholder="Пароль" value={props.user.password} />
                    </Col>
                </Row>
                <Row style={{ width: "100%", color: "red", position: "relative", bottom: "0" }}>
                    {props.errors?.password && <p>{props.errors?.password?.message || "Error!"}</p>}
                </Row>
                <Row>
                    <Checkbox>
                        Я согласен с условиями <a href="#">Пользовательского соглашения</a>
                    </Checkbox>
                </Row>
                <Divider />

                <Row gutter={[16, 16]}>
                    <Col span={12} >
                        <Button type="primary">Зарегистрироваться</Button>
                    </Col>
                    <Col span={12} style={{ display: "flex", justifyContent: "right" }}>
                        <Button>Забыли пароль?</Button>
                    </Col>
                </Row>
            </Form>
        </Col>
    )

}


export { SignUpFormUI }