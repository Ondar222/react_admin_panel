import { FC } from "react";
import { Room, useRoom } from "../../../entities/room";
import { Card, Col, Flex, Row, Switch, Typography, Image } from "antd";
import { EditIcon } from "@/assets/icons/edit";
import { IconButton } from "@/shared/components/button/action-buttons";
import { Link } from "react-router-dom";

const RoomCardPresenter = () => {}

const RoomCardUI: FC<Room> = (room) => {
    const { changeVisibility } = useRoom()
    return (
        <Card
            title={
                <Flex justify="space-between" align="center">
                    <Typography.Title level={4}>{room.name}</Typography.Title>

                    <Switch title="Показывать в поиске" value={room.visibility} onChange={() => {
                        changeVisibility(room.id, !room.visibility)
                    }} />
                </Flex>
            }

            actions={[
                <Link to={`/room/${room.id}`}>
                    <IconButton
                        type="text"
                        icon={EditIcon}
                    />
                </Link>
            ]}>
            <Flex vertical gap={16}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Image src={room.cover.link} height={100} width={"100%"} style={{
                            borderRadius: 8,
                            objectFit: "cover"
                        }} />
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Typography.Text>Цена {room.price}</Typography.Text>
                        </Row>
                        <Row>
                            <Typography.Text>Тип {room.type}</Typography.Text>
                        </Row>
                        <Row>
                            <Typography.Text>Номер {room.number}</Typography.Text>
                        </Row>
                        <Row>
                            <Typography.Text>Вместимость {room.capacity}</Typography.Text>
                        </Row>
                    </Col>
                </Row>
            </Flex>
        </Card>
    )
}

export default RoomCardUI