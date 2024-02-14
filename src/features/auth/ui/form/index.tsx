import React, { FC, useEffect, useState } from "react"
import { useAuth } from "../.."
import { isEmail } from "class-validator"
import { useNavigate } from "react-router-dom"
import { Button, Col, Flex, Input, Row, Typography, Divider } from "antd"
import { useAccount } from "@/entities/account/api"
import { FloatButton } from "antd/lib"

const AuthForm: FC = () => {
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
  return   <Flex vertical className="sign_urta_container">
  <FloatButton onClick={() => console.log('onClick')} />;
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
             <Divider />               
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
                     <Button className="sign_in_button" onClick={() => handleClick()}>Войти</Button>
                 </Col>
                 <Col className="forgot_your_password_button" span={12}>
                     <Button onClick={() => { }}>Забыли пароль?</Button>
                 </Col>
                 <Divider style={{bottom: "30px", position: "absolute"}}/>
                 <Typography.Text className="bottom_block_account">
                  
                     Нет учетной записи?<a href="/partners/sign_up">Зарегистрироваться</a>
                 </Typography.Text>
             </Row>
         </Col>
     </Row>}
     {
       isAuth && (
         <Row className="modal_signIn_yurta">
                 <Col className="modal_container_signIn_yurta">      
                     <Row className="modal_container_signIn_yurta_title">
                         <Typography.Text style={{fontWeight: "600"}}>Уже выполнен вход</Typography.Text>
                     </Row>
                     <Row className="modal_container_signIn_yurta_buttons">
                     <Button onClick={() => navigate("/booking")} type="primary">Продолжить</Button>
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
}
export default AuthForm