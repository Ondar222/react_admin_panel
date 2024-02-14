import { useHotel } from "@/entities/hotel/api"
import { useRoom, RoomCreationDto } from "@/entities/room"
import { RoomCreateForm } from "@/entities/room/ui/creation-form.tsx/ui"
import { MainLayout } from "@/shared/layouts/layout"
import { FC, useEffect, useState } from "react"

const RoomCreationPage: FC = () => {
  const [room, setRoom] = useState<RoomCreationDto>(new RoomCreationDto())
  const { hotel, setHotel } = useHotel()
  const { create } = useRoom()

  useEffect(() => {
    setHotel()

  }, [])

  useEffect(() => {
    if (hotel)
      setRoom((prev: RoomCreationDto) => ({ ...prev, hotel_id: hotel?.id }))
  }, [hotel])

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