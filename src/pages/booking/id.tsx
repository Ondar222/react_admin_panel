import { FC, useEffect, useState } from "react"
import { MainLayout } from "../../shared/layouts/layout"
import { EBookingStatus, useBooking } from "@/entities/booking"
import { useParams } from "react-router-dom"
// import { BookingUpdateDto } from "@/entities/booking/model/dto/update-dto"
import { Flex, Form, Button, Col, Divider, Typography } from "antd"
import { useHotel } from "@/entities/hotel"
import { YurtaDatePicker } from "@/shared/range-picker"
import { DetailsHeader } from "@/shared/layouts/layout/main/header"
import { YurtaInput } from "@/shared/components/form/ui/input/text"
import { YurtaSelect } from "@/shared/components/form/ui/select/default"
import { RoomSelect } from "@/widget/room/room-select"
import { Image } from "antd/lib"
import { Avatar, Space, Card, Row } from 'antd'
import { BookingUpdateDto } from "@/entities/booking/model/dto/BookingUpdateDto"



const style: React.CSSProperties = { padding: '6px 0', margin: '6px 0', cursor: "not-allowed", textDecorationLine: "underline" };

const BookingDetailPage: FC = () => {
  const { id } = useParams()
  const { booking_details, getBookingDetailsByID } = useBooking()
  const { hotel, getHotelDetails } = useHotel()

  useEffect(() => {
    if (id) {
      getHotelDetails()
      getBookingDetailsByID(Number(id))
    }
  }, [])


  if (!booking_details)
    return <div>loading</div>


  return (

    <MainLayout
      header={<DetailsHeader
        title={`#${id}`}
        onSave={() => { }}
      />
      }
      footer={<></>}
    >
      <Form layout="vertical" size="large">
        <Flex vertical gap={2}>
          <YurtaInput
            label="Идентификатор"
            disabled
            placeholder="id"
            value={booking_details.id}
            color={"white"} />

          <YurtaInput
            label="Сумма"
            placeholder="id"
            disabled
            value={booking_details.amount}
            color={"white"}
          />

          <YurtaSelect
            disabled
            label="Статус"
            value={booking_details.status}
            options={Object.keys(EBookingStatus).map((status) => ({
              value: status,
              label: status
            }))}
          />

          <Card style={{ borderColor: "#d9d9d9", width: "20%" }}>

            <Row >
              <Typography.Title level={2} >Гость</Typography.Title>
            </Row>

            <Divider />

            <Row style={{ margin: "0 auto", textAlign: "center" }} gutter={[8, 5]}>
              <Col className="gutter-row" span={24}>
                <Space direction="vertical" size={6}>
                  <Space wrap size={6}>
                    <Avatar shape="circle" size={90} icon={<Image src={booking_details.user.avatar?.link} />} />
                  </Space>
                </Space>
                <Row>
                  <Col className="gutter-row" span={24}>
                    <p style={style}>{booking_details.user.surname}</p>
                    <p style={style}>{booking_details.user.name}</p>
                    <p style={style}> {booking_details.user?.phone} </p>
                    <p style={style}> {booking_details.user?.email} </p>
                  </Col>

                </Row>

              </Col>
            </Row>




          </Card>


          <YurtaInput
            label="Количество гостей"
            type="number"
            value={booking_details.capacity}

          />

          {/* {
            booking.user &&
            <YurtaUserSelect
              value={booking.user}
              onChange={(e) => {
                setBooking((prev) => {
                  return {
                    ...prev,
                    user: e
                  }
                })
              }} />

          } */}

          {booking_details.check_in && booking_details.check_out &&
            <YurtaDatePicker
              label="Даты"
              value={[booking_details.check_in, booking_details.check_out]}
              onChange={() => { }}
            />
          }

          {
            hotel && <RoomSelect
              mode="multiple"
              value={booking_details.rooms}
              isMultiple={true}

              rooms={hotel.rooms}
            />
          }

          <Button>
            Сохранить
          </Button>
        </Flex>
      </Form>
    </MainLayout >
  )
}

export { BookingDetailPage }