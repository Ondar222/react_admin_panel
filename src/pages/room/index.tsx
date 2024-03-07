import { useRoom } from "@/entities/room";
import { MainLayout } from "@/shared/layouts/layout";
import RoomCardUI from "@/shared/room/card";
import { Button, Col, Row, Typography } from "antd";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoomPage: FC = () => {
  const { rooms, getHotelRelatedRooms, changeVisibility } = useRoom()
  const navigate = useNavigate()

  useEffect(() => {
    getHotelRelatedRooms()
  }, [])

  return (
    <MainLayout
      header={
        <Row justify={"space-between"}>
          <Col span={22}>
            <Typography.Title level={2}>Номера</Typography.Title>
          </Col>
          <Col span={2}>
            <Button onClick={() => navigate("/room/+")}>
              Создать номер
            </Button>
          </Col>
        </Row>
      }
      footer="Пагинация"
    >
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
    </MainLayout>
  )
}

export default RoomPage