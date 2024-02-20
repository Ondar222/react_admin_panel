import { DeleteIcon } from "@/assets/icons/delete";
import { EditIcon } from "@/assets/icons/edit";
import { useHotel } from "@/entities/hotel/api";
import { useRoom } from "@/entities/room";
import { IconButton } from "@/shared/components/button/action-buttons";
import { MainLayout } from "@/shared/layouts/layout";
import RoomCardUI from "@/shared/room/card";
import { Button, Card, Col, Flex, Image, Row, Switch, Typography } from "antd";
import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const RoomPage: FC = () => {
  const { rooms, findMyRooms, changeVisibility } = useRoom()
  const navigate = useNavigate()

  useEffect(() => {
    findMyRooms()
  }, [])

  return (
    <MainLayout
      header={<Typography.Title level={2}>Номера</Typography.Title>}
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