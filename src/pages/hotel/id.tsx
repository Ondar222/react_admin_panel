import { useHotel } from "@/entities/hotel/api";
import { MainLayout } from "@/shared/layouts/layout";
import { DetailsPageHeader } from "@/shared/observer/ui/details/header";
import { FC, useEffect } from "react";
import { Form, Select, Input, Flex, Row, Col } from "antd"

const HotelDetailsPage: FC = () => {
  const { hotel, setHotel } = useHotel()

  useEffect(() => {
    setHotel()
  }, [])

  return (
    <MainLayout
      header={<DetailsPageHeader heading={"Отель"} />}
      footer={<></>} >
      <Row>
        <Col span={6}>
          <Form
            layout="vertical"
          >
            <Flex
              gap={"middle"}
              vertical>
              <Form.Item label="id">
                <Input value={12} color="white" />
              </Form.Item>
              <Form.Item label="Название">
                <Input />
              </Form.Item>

              <Form.Item label="Описание">
                <Input />
              </Form.Item>

              <Form.Item label="Номера">
                <Select
                  showSearch
                  mode="multiple"
                  options={hotel?.rooms.map((room: any) => ({ value: room.id, label: room.name }))} />
              </Form.Item>
            </Flex>
          </Form>
        </Col>
      </Row>
    </MainLayout >
  )
}

export default HotelDetailsPage