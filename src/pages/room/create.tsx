import { MainLayout } from "@/shared/layouts/layout"
import { FC, useEffect } from "react"
import { useHotel } from "@/entities/hotel"
import { LoadingPage } from "@/widget/loading_page"
import { AddNewRoomForm } from "@/widget"

const RoomCreationPage: FC = () => {
  const { hotel, getHotelDetails } = useHotel()

  useEffect(() => {
    if (!hotel)
      getHotelDetails()
  }, [])

  if (!hotel)
    return <LoadingPage />

  return (
    <MainLayout header="Создание нового номера" footer="">
      <AddNewRoomForm hotel_id={hotel.id} />
    </MainLayout>
  )
}

export { RoomCreationPage }