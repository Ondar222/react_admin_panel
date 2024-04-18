import { MainLayout } from "@/shared/layouts/layout"
import { FC, useEffect } from "react"
import { useHotel } from "@/entities/hotel"
import { LoadingPage } from "@/widget/loading_page"
import { AddNewRoomForm } from "@/widget"
import { useNavigate } from "react-router-dom"
import { Col, Typography } from "antd"

const RoomCreationPageHeader: FC = () => {
  return <Typography.Title level={2}>Создание нового номера</Typography.Title>
}

const RoomCreationPage: FC = () => {
  const { hotel, getHotelDetails } = useHotel()
  const navigate = useNavigate()

  useEffect(() => {
    if (!hotel)
      getHotelDetails()
  }, [])

  if (!hotel)
    return <LoadingPage layout="empty" />

  return (
    <MainLayout header={<RoomCreationPageHeader />} footer="">
      <Col span={12}>
        <AddNewRoomForm
          hotel_id={hotel?.id}
          successCallback={(res) => {
            navigate(`/room/${res.id}`)
          }}
          rejectCallback={(e) => {
            console.log(e)
            throw e
          }}
        />
      </Col>

    </MainLayout>
  )
}

export { RoomCreationPage }