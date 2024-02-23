import { Col, Flex, Input, Row,  Typography, Checkbox, message, Layout } from "antd"
import { FC }  from "react"
import {SubmitHandler, useForm} from "react-hook-form"
// import { ISippingField } from "./regist.interface"
import { useState } from "react"
import { useAccount } from "@/entities/account/api"
import { useAuth } from "../../features/auth"
import { SignUpFormUI } from "@/features/sing_up/ui"




const SignUpPage: FC = () => {

    return ( 
      <Layout style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: '#001529'
      }}>
        <Flex vertical align="center" justify="center">
          <SignUpFormUI user={
        {
          name: "",
          surname: "",
          phone: "",
          email: "",
          password: ""

        }
      } />
        </Flex>
      </Layout>
    )
}

export { SignUpPage }


















// import { FC, useEffect, useState}  from "react"
// import { Col, Flex, Row, Typography, Button,Input } from "antd"
// import { isEmail } from "class-validator"
// import { useAuth } from "../../features/auth"
// import { useNavigate } from "react-router-dom"
// import { useAccount } from "@/entities/account/api"


// const RegistrPage: FC = () => {
//     const [email, setEmail] = useState()
//     const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false)
//     const [password, setPassword] = useState<string>("Tc7yf6rt!")
//     const { isAuth, login, logout, checkAuth } = useAuth()
//     const { me } = useAccount()

//     const navigate = useNavigate()

//     useEffect(() => {
//         checkAuth()
//     }, [])

//     useEffect(() => {
//         if (isEmail(email) || !email) {
//             setIsEmailInvalid(false)
//         }
//         else {
//             setIsEmailInvalid(true)
//         }
//     }, [email])

//     const handleClick = async () => {
//         await login(email, password)
//         await me()

//         if (isAuth) {
//             navigate("/booking")
//         }
//     }

//     return ( <Flex vertical className="sign_urta_container">
//     <Col>
//         <Row>
//             <Col className="header_sign_urta">
//                 <Typography.Title>
//                     YURTA APP
//                 </Typography.Title>
//             </Col>

//         </Row>
//         {!isAuth && <Row className="container_registr_yurta">
//             <Col className="col_yurta_registr">
//                 <Typography.Title className="registr_form">
//                     Регистрация
//                 </Typography.Title>
//                 <Col className="input_registr" style={{display: "grid", gridGap: "15px", marginTop: "20px"}}>
                
//                 <Input
//                     type="name"
//                     // isInvalid={isNameInvalid}
//                     placeholder="Имя"
//                     // value={name}
//                     // onChange={(e) => {
//                     //     setName(e.target.value)
//                     // }}
//                 />
//                  <Input
//                     type="surname"
//                     // isInvalid={isSurNameInvalid}
//                     placeholder="Фамилия"
//                     // value={surname}
//                     // onChange={(e) => {
//                     //     setSurname(e.target.value)
//                     // }}
//                 />
//                  <Input
//                     type="phone"
//                     // isInvalid={isPhoneInvalid}
//                     placeholder="Номер телефона"
//                     // value={phone}
//                     // onChange={(e) => {
//                     //     setPhone(e.target.value)
//                     // }}
//                 />
//                 <Input
//                     type="email"
//                     // isInvalid={isEmailInvalid}
//                     placeholder="электронная почта"
//                     // value={email}
//                     // onChange={(e) => {
//                     //     setEmail(e.target.value)
//                     // }}
//                 />
//                 <Input
//                     type="password"
//                     placeholder="пароль"
//                     // value={password}
//                     // onChange={(e) => setPassword(e.target.value)}
//                 />
              
//                 </Col>

//                 <Row className="bottom_container_registr">
//                     <Col className="container_button" span={22}>
//                         <Button className="button_registr" onClick={() => handleClick()}>Зарегистрироваться</Button>
//                     </Col>
//                     <Typography.Text className="bottom_block_account">
//                         Уже есть учетная запись?<b>Войти</b>
//                     </Typography.Text>
//                 </Row>
//             </Col>
//         </Row>}   
//     </Col>
//     <Col>
//     </Col>

// </Flex >
//     )
// }

// export { RegistrPage }