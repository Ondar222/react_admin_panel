import { useRoom } from "@/entities/room";
import { MainLayout } from "@/shared/layouts/layout";
import RoomCardUI from "@/shared/room/card";
import { Button, Col, Divider, Row, Typography } from "antd";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoomPageHeader: FC = () => {
  const navigate = useNavigate()
  return (
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
  )
}

const RoomPage: FC = () => {
  const { rooms, getHotelRelatedRooms, changeVisibility } = useRoom()

  useEffect(() => {
    if (!rooms)
      getHotelRelatedRooms()
  }, [])

  return (
    <MainLayout
      header={<RoomPageHeader />}
    >
      <Col>
        <Row gutter={[16, 16]} wrap={true}>
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