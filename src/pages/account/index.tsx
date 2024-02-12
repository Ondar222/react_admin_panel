import { useAccount } from "@/entities/account/api";
import { Button } from "@/shared/components/button/default";
import { YurtaInput } from "@/shared/components/form/ui/input/text";
import { MainLayout } from "@/shared/layouts/layout";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Flex, Form, Image, Input, Row, Tag, Typography } from "antd";
import { FC, useEffect } from "react";

const AccountPage: FC = () => {
  const { account, me } = useAccount()

  useEffect(() => {
    if (!account) {
      me()
    }
  })

  return (
    <MainLayout
      header={
        <Row justify={"space-between"} align={"middle"}>
          <Typography.Title level={2}>
            Аккаунт
          </Typography.Title>
        </Row>
      }
      footer={null}
    >
      <Col
        md={{
          span: 16
        }}

        sm={{
          span: 24
        }}
        xs={{
          span: 24
        }}
      >
        <Form
          layout="vertical"
          size="middle"
        >

          <Flex
            vertical={false}
            justify="start"
            align="center"
            wrap="wrap"
            gap={10}
          >
            <Avatar icon={<UserOutlined />} size={96} />
            <Flex vertical gap={10}>
              <Typography.Text>
                {account?.email}
              </Typography.Text>
              <Typography.Text>
                {account?.role}
              </Typography.Text>
            </Flex>
          </Flex>

          <Row gutter={[16, 16]} wrap>
            <Col span={12}><YurtaInput label="Фамилия" placeholder="Фамилия" value={account?.surname} /></Col>
            <Col span={12}><YurtaInput label="Имя" placeholder="Имя" value={account?.name} /></Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <YurtaInput
                label="Номер телефона"
                placeholder="Номер телефона"
                value={account?.phone} />
            </Col>
            <Col span={12}>
              <YurtaInput
                label="Email"
                placeholder="Email"
                value={account?.email}
              />
            </Col>

          </Row>

          <Row justify={"end"} gutter={[16, 16]}>
            <Col span={12}>
              {/* <Button>Сохранить изменения</Button> */}
            </Col>
          </Row>
        </Form>
      </Col>

    </MainLayout>
  )
}

export { AccountPage }