import { Layout, Spin } from "antd"
import { FC } from "react"
import { SignUpForm } from "@/features/sing_up"

const SignUpPage: FC = () => {
    return (
        <Layout style={{
            overflow: "unset",
            background: '#001529',
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <SignUpForm />
        </Layout>
    )
}

export { SignUpPage }
