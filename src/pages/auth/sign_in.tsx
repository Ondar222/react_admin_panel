import { Col, Flex, Input, Row,  Typography, Checkbox, message, Layout } from "antd"
import { FC }  from "react"
// import { ISippingField } from "./regist.interface"
import { AuthForm } from "@/features/auth/ui"





const SignInPage: FC = () => {

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
          <AuthForm user={
        {
          email: "",
          password: ""

        }
      } />
        </Flex>
      </Layout>
    )
}

export { SignInPage }





