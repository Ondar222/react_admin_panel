import { MainLayout } from "@/shared/layouts/layout"
import { FC, useEffect, useState } from "react"
import { RoomCreationForm } from "@/widget/room/forms/creation-form"
import { useHotel } from "@/entities/hotel"
import { RoomCreationDto, useRoom } from "@/entities/room"

const RoomCreationPage: FC = () => {
  const [room, setRoom] = useState<RoomCreationDto>(new RoomCreationDto())
  const { create } = useRoom()
  const { hotel, setHotel } = useHotel()

  useEffect(() => {
    setHotel()
  }, [])

  useEffect(() => {
    setRoom(new RoomCreationDto())
    setRoom((prev) => ({
      ...prev,
      hotel_id: hotel.id
    }))
  }, [])

  if (!hotel && !hotel?.id)
    return <div>loading</div>

  return (
    <MainLayout header="Создание нового номера" footer="">
      <RoomCreationForm
        room={room}
        setRoom={setRoom}
        hotel_id={hotel?.id}
        onSubmit={create}
      />
    </MainLayout>
  )
}

export { RoomCreationPage }