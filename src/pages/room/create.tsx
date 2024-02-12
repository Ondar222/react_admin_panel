import { useHotel } from "@/entities/hotel/api"
import { useRoom, RoomCreationDto } from "@/entities/room"
import { RoomCreateForm } from "@/entities/room/ui/creation-form.tsx/ui"
import { MainLayout } from "@/shared/layouts/layout"
import { FC, useEffect, useState } from "react"

const RoomCreationPage: FC = () => {
  const [room, setRoom] = useState<RoomCreationDto>(new RoomCreationDto())
  const { currentHotel, setCurrentHotel } = useHotel()
  const { create } = useRoom()

  useEffect(() => {
    setCurrentHotel()

  }, [])

  useEffect(() => {
    if (currentHotel)
      setRoom((prev: RoomCreationDto) => ({ ...prev, hotel_id: currentHotel?.id }))
  }, [currentHotel])

  return (
    <MainLayout header="Создание нового номера" footer="">
      <RoomCreateForm
        room={room}
        setRoom={setRoom}
        onSaveButtonClick={() => {
          create(room)
        }} />
    </MainLayout>
  )
}

export { RoomCreationPage }