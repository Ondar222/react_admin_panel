import { User } from "@/entities";
import { Card, Col, Row, Typography, Avatar } from "antd";
import { FC } from "react";

type UserCardProps = Pick<User, "id" | "surname" | "name" | "phone" | "email" | "avatar">

const UserCard: FC<UserCardProps> = ({ id, surname, name, phone, email, avatar }) => {
    return (
        <Card
            title={`Пользователь ${id}`}
        >
            <Row gutter={[16, 16]}>
                <Col>
                    <Avatar src={"/favicon_black.jpg"} size={80} />
                </Col>
                <Col span={12}>
                    <Row>
                        <Typography.Text strong>{surname} {name}</Typography.Text>
                    </Row>
                    <Row>
                        <Typography.Text>{phone}</Typography.Text>
                    </Row>
                    <Row>
                        <Typography.Text> {email}</Typography.Text>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}

export { UserCard }