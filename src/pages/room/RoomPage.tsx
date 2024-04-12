import { useRoom } from "@/entities/room";
import { MainLayout } from "@/shared/layouts/layout";
import RoomCardUI from "@/shared/room/card";
import { Button, Col, Divider, Row, Typography } from "antd";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoomPage: FC = () => {
  const { rooms, getHotelRelatedRooms, changeVisibility } = useRoom()
  const navigate = useNavigate()

  useEffect(() => {
    if (!rooms)
      getHotelRelatedRooms()
  }, [])

  return (
    <MainLayout
      header={
        <Row justify={"space-between"}>
          <Col>
            <Typography.Title level={2}>Номера</Typography.Title>
          </Col>
          <Col >
            <Button onClick={() => navigate("/room/+")}>
              Создать номер
            </Button>
          </Col>
        </Row>
      }
      footer="Пагинация"
    >
      <Col>
        <Divider></Divider>
        <Row gutter={[16, 16]} wrap={true} justify="space-between">
          {
            rooms?.map((room, index) => {
              return (
                <Col key={index} xs={24} sm={24} md={12} lg={8} xl={6}>
                  <RoomCardUI {...room} />
                </Col>
              )
            })
          }
        </Row>
      </Col>

    </MainLayout>
  )
}

export { RoomPage }