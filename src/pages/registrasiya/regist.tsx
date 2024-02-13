import { Col, Flex, Input, Row,  Typography, Checkbox, message } from "antd"
import { FC }  from "react"
import {SubmitHandler, useForm} from "react-hook-form"
// import { ISippingField } from "./regist.interface"
import { useState } from "react"
import { useAccount } from "@/entities/account/api"
import { useAuth } from "../../features/auth"



const RegistrPage: FC = () => {
  const [password, setPassword] = useState<string>()
  // const {register, handleSubmit, formState: {errors}, reset, resetField } = useForm<ISippingField>()
  const [email, setEmail] = useState<string>()
  const [name, setName] = useState<string>()
  const { isAuth, login} = useAuth()
  const { me } = useAccount()

const {
  register,
  formState: { errors },
  handleSubmit
} = useForm()

const onSubmit = (data) => {
  alert(JSON.stringify(data))
}

//   const onSubmit:SubmitHandler<ISippingField> = (data) => {
//     alert(`Your name ${data.name}`)
//     reset() 
//   }
//   const handleClick = async () => {
//     await login(email, password)
//     await me()

//     if (isAuth) {
     
//     }
// }

    return ( <Flex vertical className="container_registr">
    <form className="form_registr" onSubmit={handleSubmit(onSubmit)}>
      <Col>
    <Row>
                        <Col className="header_registr_urta">
                            <Typography.Title>
                                Регистрация
                            </Typography.Title>
                        </Col>

                    </Row>
      </Col>
      <Col className="first_form_col_registr"> 
      <Input 
                                type="name"
                                // isNameInvalid={isNameInvalid}
                                placeholder="Имя"
                                // value={}
                                onChange={(e) => {
                                    // setIsNameInvalid(e.target.value)
                                  }}
                                  />
                               
          <Input 
                                type="surname"
                                // isInvalid={isEmailInvalid}
                                placeholder="Фамилия"
                                // value={surname}
                                onChange={(e) => {
                                    // setEmail(e.target.value)
                                }}
                            /> 
                               {/* <Col style={{width: "100%", color: "red", position: "absolute", bottom: "0", left: "10px", top: "48px"}}>
                                    {errors?.firstName && <p>{errors?.firstName?.message || "Error!"}</p>}                             
                                    </Col>            */}
                        
      </Col>
      <Input
                                type="phoneNumber"
                                // isInvalid={isEmailInvalid}
                                placeholder="Номер телефона"
                                // value={phoneNumber}
                                onChange={(e) => {
                                    // setEmail(e.target.value)
                                }}
                            />

      <Input
                                  type="email"
                                // isInvalid={isEmailInvalid}
                                placeholder="электронная почта"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                            
               <Input {...register("password", {
        required: "Поле обязательно к заполнению",
    })}
                                type="password"
                                placeholder="пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                              <Col style={{width: "100%", color: "red", position: "relative", bottom: "0"}}>
                                    {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}                             
                                    </Col>  

         <Checkbox className="agreement_div">
          Я согласен с условиями <a href="#">Пользовательского соглашения</a>
        </Checkbox>
      <Flex className="button_registr">
     <button>Зарегистрироваться</button>
      </Flex>
    </form>
    </Flex>
    )
}

export { RegistrPage }


















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