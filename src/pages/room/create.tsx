import { MainLayout } from "@/shared/layouts/layout"
import { FC, useEffect } from "react"
import { RoomCreationForm } from "@/widget/room/forms/create-form"
import { useHotel } from "@/entities/hotel"
import { LoadingPage } from "@/widget/loading_page"

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
      <RoomCreationForm
        hotel={hotel}
      />
    </MainLayout>
  )
}

export { RoomCreationPage }