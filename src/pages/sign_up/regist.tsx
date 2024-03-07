import { Flex, Layout } from "antd"
import { FC }  from "react"
import { SignUpFormUI } from "@/features/sing_up/ui"




const SignUpPage: FC = () => {

    return ( 
      <Layout className="SignUpPage_layout">
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