import React, { FC, useEffect, useState } from "react"
import { useAuth } from "../../features/auth"
import { isEmail } from "class-validator"
import { useNavigate } from "react-router-dom"
import { Button, Col, Flex, Input, Row, Typography } from "antd"
import { useAccount } from "@/entities/account/api"


const SignInPage: FC = () => {
    const [email, setEmail] = useState<string>("asankheya@yurta.ru")
    const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("Tc7yf6rt!")
    const { isAuth, login, logout, checkAuth } = useAuth()
    const { me } = useAccount()
    const [open, setOpen] = React.useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        checkAuth()
    }, [])

    useEffect(() => {
        if (isEmail(email) || !email) {
            setIsEmailInvalid(false)
        }
        else {
            setIsEmailInvalid(true)
        }
    }, [email])

    const handleClick = async () => {
        await login(email, password)
        await me()

        if (isAuth) {
            navigate("/booking")
        }
       
    }
    // вот тут и работаешь
    return (
            <Flex vertical className="sign_urta_container">
                <Col>
                    <Row>
                        <Col className="header_sign_urta">
                            <Typography.Title>
                                YURTA APP
                            </Typography.Title>
                        </Col>

                    </Row>
                    {!isAuth && <Row className="container_sign_in_yurta">
                        <Col className="col_yurta">
                            <Typography.Title className="login_form" style={{color: "#000000"}}>
                                Форма входа
                            </Typography.Title>                      
                            <Input
                                type="email"
                                // isInvalid={isEmailInvalid}
                                placeholder="электронная почта"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                           
                            <Input
                                type="password"
                                placeholder="пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        
                            <Row className="bottom_block_sign_in_yurta">
                                <Col span={12}>
                                    <Button style={{background: "#1677ff", color: "#fff"}} onClick={() => handleClick()}>Войти</Button>
                                </Col>
                                <Col style={{display: "flex", justifyContent: "right"}} span={12}>
                                    <Button onClick={() => { }}>Забыли пароль?</Button>
                                </Col>
                                <Typography.Text className="bottom_block_account">
                                    Нет учетной записи?<b>Зарегистрироваться</b>
                                </Typography.Text>
                            </Row>
                        </Col>
                    </Row>}
                    {
                        open && (
                            <Row style={{display: "flex", position: "fixed", width: "100%", background: "#1677ff", top: "0", height: "20vh"}}>

                                <Col style={{display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", position: "absolute"}}>
                                    {/* <Row>
                                        <Typography.Text>Уже выполнен вход</Typography.Text>
                                    </Row> */}
                                    <Row style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                        <Button onClick={() => navigate("/booking")}>Продолжить</Button>
                                        <Button onClick={() => {
                                            logout()
                                        }}>Войти в другой аккаунт</Button>
                                    </Row>
                                </Col>  
                            </Row>
                         
                        
                            )
                    }    
                </Col>
                <Col>
                </Col>
            
            </Flex >
    
    )
}

export { SignInPage }