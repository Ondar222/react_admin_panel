import { FC, useEffect, useState } from "react";
import { IRoomLockCreationFormUI } from "../../../entities/roomlock/model/Roomlock";
import { RoomSelect } from "@/widget/room/RoomSelect";
import { YurtaDatePicker } from "@/shared/range-picker";
import { Form, Button, message, notification } from "antd";
import { IRangePicker } from "@/shared/range-picker/model";
import { Room, useRoom } from "@/entities/room";
import { useHotel } from "@/entities/hotel";
import { useRoomLock } from "../../../entities/roomlock/api/useRoomlock";
import { LockReasonSelect } from "../../../shared/reason-select";
import { AxiosError } from "axios";
import { useRoomlockForm } from "@/features/useRoomlockForm";
import { LoadingPage } from "@/widget/loading_page";
import { useLoading, withLoading } from "@/processes";


const RoomlockCreationForm: FC = () => {
  const { setLoading } = useLoading()
  const { hotel, getHotelDetails } = useHotel()
  const { rooms, getHotelRelatedRooms } = useRoom()
  const { createRoomlock } = useRoomLock()
  const { dates, setDates } = useRoomlockForm()

  const [reason, setReason] = useState<string>("")
  const [room_id, setRoomId] = useState<number>(0)

  const fetchData = async () => {
    
  }

  useEffect(() => {
    // withLoading(fetchData, setLoading)
    getHotelRelatedRooms()
    getHotelDetails()
  }, [])


  const handleDatePickerChange: IRangePicker["onChange"] = (dates) => {
    setDates([dates[0], dates[1]])
  }

  const handleRoomSelectChange = (e: Pick<Room, "id">) => {
    setRoomId(e?.id)
  }


  const handleLockReason = (e) => {
    setReason(e)
  }

  const handleSaveButtonClick = async () => {

    const data = await createRoomlock({
      room_id: room_id,
      start: dates[0],
      end: dates[1],
      reason: reason
    })
      .then((res) => {
        message.success("Номер заблокирован")
      })
      .catch((error: AxiosError) => {
        notification.error({
          message: "Произошла ошибка при блокировке номера",
          placement: "topRight"
        })
      })
  }

  if (!hotel) {
    return <LoadingPage layout="main" />
  }

  return (
    <>
      <Form layout="vertical" size="large" >

        <LockReasonSelect onChange={handleLockReason} />

        <YurtaDatePicker
          value={dates}
          onChange={handleDatePickerChange}
        />

        {
          hotel && <RoomSelect
            isMultiple={false}
            value={{ id: room_id }}
            rooms={rooms}
            onChange={(e) => {
              const room: Pick<Room, 'id'> = e as Pick<Room, 'id'>
              handleRoomSelectChange(room)
            }}
          />
        }

        <Button onClick={handleSaveButtonClick}>Забронировать</Button>
      </Form>
    </>

  )
}

export { RoomlockCreationForm }