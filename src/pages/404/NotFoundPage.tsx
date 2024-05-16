import { useAuth } from "@/app/providers/auth/authProvider";
import { MainLayout } from "@/shared/layouts/layout";
import { Col, Divider, Layout, Row, Space, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage: FC = () => {
    const { isAuth } = useAuth()
    const navigate = useNavigate()
    const [timer, setTimer] = useState(5)
    useEffect(() => {
        const redirect = setTimeout(() => {
            if (isAuth) {
                navigate("/hotel")
            }
            else {
                navigate("/auth")
            }
            clearInterval(countdown)
            clearTimeout(redirect)
            return

        }, 5000)

        const countdown = setInterval(() => {
            setTimer(prev => prev - 1)
        }, 1000)
        
    }, [])

    if (isAuth) {
        return (
            <MainLayout header="Страница не найдена">
                <Space>
                    <Col>
                        <Row align={"middle"}>
                            <Typography style={{
                                color: "white",
                                fontSize: 100
                            }}>404</Typography>
                            <Divider type="vertical" />
                            <Typography style={{
                                color: "white",
                                fontSize: 50
                            }}>Страница не найдена</Typography>
                        </Row>
                        <Row>
                            <Typography style={{
                                fontSize: 30,
                                color: "white"
                            }}>
                                Вы автоматически перейдете на страницу отеля: {timer}
                            </Typography>
                        </Row>
                        <Row justify={"end"}>
                            <Link to={"/hotel"} style={{ fontSize: 20 }}>Перейти сейчас</Link>
                        </Row>
                    </Col>
                </Space>
            </MainLayout>
        )
    }

    return (
        <Layout style={{
            position: "relative",
            width: "100vw",
            background: '#001529',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

        }}>
            <Space>
                <Col>
                    <Row align={"middle"}>
                        <Typography style={{
                            color: "white",
                            fontSize: 100
                        }}>404</Typography>
                        <Divider type="vertical" />
                        <Typography style={{
                            color: "white",
                            fontSize: 50
                        }}>Страница не найдена</Typography>
                    </Row>
                    <Row>
                        <Typography style={{
                            fontSize: 30,
                            color: "white"
                        }}>
                            Вы автоматически перейдете на страницу авторизации через: {timer}
                        </Typography>
                    </Row>
                    <Row justify={"end"}>
                        <Link to={"/auth"} style={{ fontSize: 20 }}>Перейти сейчас</Link>
                    </Row>
                </Col>
            </Space>
        </Layout>
    )
}

export { NotFoundPage }