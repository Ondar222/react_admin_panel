import { Flex, InputProps, Layout } from "antd"
import { FC, useState } from "react"
import { SignUpFormUI } from "@/features/sing_up/ui"
import { useSignUp } from "@/features/sing_up/api/useSignUp"
import { SignUpDto } from "@/features/sing_up/model"
import { useOtp } from "@/features/otp"

const SignUpPage: FC = () => {
    const [user, setUser] = useState<SignUpDto>({
        email: "",
        phone: "",
        password: "",
        code: "",
        surname: "",
        name: ""
    })

    const { signUp } = useSignUp()
    const { verifyPhoneNumber } = useOtp()

    const handleChange: InputProps["onChange"] = (e) => {
        const { name, value } = e.target

        setUser((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <Layout style={{
            // position: "absolute",
            // top: 0,
            // bottom: 0,
            // left: 0,
            // right: 0,
            overflow: "unset",
            background: '#001529'
        }}>
            <Flex vertical align="center" justify="center" style={{ height: "100vh", width: "100%" }} >
                <SignUpFormUI user={user} signUp={signUp} verifyPhoneNumber={verifyPhoneNumber} onChange={handleChange} />
            </Flex>
        </Layout>
    )
}

export { SignUpPage }
