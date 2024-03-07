import { Col, Row, Typography, Checkbox, Form, Button, Divider, Input, InputProps } from "antd";
import { FC, useState } from "react";
import { useSignUp } from "../api/useSignUp";
import { useOtp } from "@/features/otp/api/useOtp";
import { YurtaInput } from "@/shared/components/form/ui/input/text";
import { SignUpDto } from "../model";
import { useNavigate } from "react-router-dom";


const SignUpFormUI: FC<any> = (props) => {
    const [user, setUser] = useState<SignUpDto>({
        email: "",
        phone: "",
        password: "",

        surname: "",
        name: "",
        code: ""
    })
    const { signUp } = useSignUp()
    const { verifyPhoneNumber } = useOtp()
    const navigate = useNavigate()

    const handleChange: InputProps["onChange"] = (e) => {
        const { name, value } = e.target
        setUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }

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
                <Row className="container_signUp">

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Input placeholder="Имя" name="name" value={user.name} onChange={handleChange} />
                        </Col>
                        <Col span={12}>
                            <Input placeholder="Фамилия" name="surname" value={user.surname} onChange={handleChange} />
                        </Col>
                    </Row>
                    <Row className="container_signUp">
                        <Col span={24}>
                            <Input type="phone" name="phone" placeholder="Номер телефона" value={user.phone} onChange={handleChange} />
                            <Button onClick={() => verifyPhoneNumber({ phone: user.phone })}>Подтвердить</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Input type="email" name="email" placeholder="Электронная почта" value={user.email} onChange={handleChange} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Input
                                type="password"
                                placeholder="Пароль"
                                name="password"
                                value={user.password}
                                onChange={handleChange} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <YurtaInput
                                label="Код подтверждения"
                                name="code"
                                value={user.code}
                            /*  */ onChange={handleChange} />
                        </Col>
                    </Row>
                    <Row>
                        {props.errors?.password && <p>{props.errors?.password?.message || "Error!"}</p>}
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
                        <Button type="primary" onClick={() => signUp(user)}>Зарегистрироваться</Button>
                    </Col>
                    <Col className="forgot_your_password_class" span={12}>
                        <Button onClick={() => navigate("/auth")}>Войти в аккаунт</Button>

                    </Col>
                </Row>
            </Form>
        </Col>
    )

}


export { SignUpFormUI }