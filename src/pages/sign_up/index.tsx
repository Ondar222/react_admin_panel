import { Layout, Spin } from "antd"
import { FC } from "react"
import { SignUpForm } from "@/features/sing_up"
import { useOtp } from "@/features/otp"

const SignUpPage: FC = () => {
    const { isLoading } = useOtp()

    return (
        <Layout style={{
            height: "100vh",
            overflow: "unset",
            background: '#001529',
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Spin spinning={isLoading}>
                <SignUpForm />
            </Spin>
        </Layout>
    )
}

export { SignUpPage }
