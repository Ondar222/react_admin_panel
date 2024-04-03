import { MainLayout } from "@/shared/layouts/layout"
import { FC, useEffect } from "react"
import { useHotel } from "@/entities/hotel"
import { LoadingPage } from "@/widget/loading_page"
import { AddNewRoomForm } from "@/widget"
import { useNavigate } from "react-router-dom"

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
    <MainLayout header="Создание нового номера" footer="">
      <AddNewRoomForm
        hotel_id={hotel?.id}
        successCallback={(res) => {
          navigate(`/room/${res.data.id}`)
        }} 
        rejectCallback={(e) => {
          console.log(e)
          throw e
        }}
        />
    </MainLayout>
  )
}

export { RoomCreationPage }