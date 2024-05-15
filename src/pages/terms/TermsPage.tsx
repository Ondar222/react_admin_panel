import { Layout as AntLayout, Typography } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Layout = styled(AntLayout)`
  background: #001529;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TermsPage: FC = () => {
    return (
        <Layout>
            <Typography.Title
                style={{
                    color: "white"
                }}
            >
                Пользовательское соглашение
            </Typography.Title>

            <Link download={true} to={"/terms.pdf"}>Скачать Пользовательское соглашение</Link>
        </Layout>
    )
}

export { TermsPage }