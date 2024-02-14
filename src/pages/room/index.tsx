import { DeleteIcon } from "@/assets/icons/delete";
import { EditIcon } from "@/assets/icons/edit";
import { useHotel } from "@/entities/hotel/api";
import { useRoom } from "@/entities/room";
import { IconButton } from "@/shared/components/button/action-buttons";
import { MainLayout } from "@/shared/layouts/layout";
import { Button, Card, Col, Flex, Image, Row, Typography } from "antd";
import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const RoomPage: FC = () => {
  const { rooms, findAll } = useRoom()
  const navigate = useNavigate()

  useEffect(() => {
    findAll()
  }, [])

  return (
    <MainLayout
      header={<Typography.Title level={2}>Номера</Typography.Title>}
      footer="Пагинация"
    >
      <Row gutter={[16, 16]}>
        {
          rooms?.map((room, index) => {
            return (
              <Col key={index} span={8}>
                <Card
                  title={
                    <Typography.Title level={4}>{room.name}</Typography.Title>
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
                        <Image src={room.cover} height={100} width={"100%"} style={{
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
              </Col>
            )
          })
        }
      </Row>
    </MainLayout>
  )
}

export default RoomPage