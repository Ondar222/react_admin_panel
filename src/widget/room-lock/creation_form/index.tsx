import { FC, useEffect, useState } from "react";
import { IRoomLockCreationFormUI } from "../../../entities/roomlock/model/Roomlock";
import { RoomSelect } from "@/widget/room/RoomSelect";
import { YurtaDatePicker } from "@/shared/range-picker";
import { Form, Button, message, notification } from "antd";
import { IRangePicker } from "@/shared/range-picker/model";
import { Room } from "@/entities/room";
import { useHotel } from "@/entities/hotel";
import { useRoomLock } from "../../../entities/roomlock/api/useRoomlock";
import { LockReasonSelect } from "../../../shared/reason-select";
import { useBrm } from "@/entities/calendar/api/useBrm";
import dayjs from "dayjs";
import { AxiosError } from "axios";

const RoomlockCreationForm: FC = () => {
  const { hotel, getHotelDetails } = useHotel()
  const { createRoomlock } = useRoomLock()

  const [reason, setReason] = useState<string>("")
  const [dates, setDates] = useState<[number, number]>([dayjs().unix(), dayjs().unix()])
  const [room_id, setRoomId] = useState<number>(0)

  useEffect(() => {
    if (!hotel)
      getHotelDetails()
  }, [])

  const handleDatePickerChange: IRangePicker["onChange"] = (dates) => {
    setDates([dates[0], dates[1]])
  }

  const handleRoomSelectChange = (e: Pick<Room, "id">) =>
    setRoomId(e.id)

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

  return (
    <RoomLockCreationFormUI
      hotel={hotel}
      room_id={{ id: room_id }}
      dates={dates}
      onDatePickerChange={handleDatePickerChange}
      onSaveButtonClick={handleSaveButtonClick}
      onRoomSelect={handleRoomSelectChange}
      onReasonSelectChange={handleLockReason} />
  )
}

const RoomLockCreationFormUI: FC<IRoomLockCreationFormUI> = (props) =>
  <Form layout="vertical" size="large" >

    <LockReasonSelect onChange={props.onReasonSelectChange} />

    <YurtaDatePicker
      label="Даты недоступности"
      value={props.dates}
      onChange={props.onDatePickerChange}
    />

    {
      props.hotel && <RoomSelect
        isMultiple={false}
        value={props.room_id}
        rooms={props.hotel.rooms}
        onChange={(e) => {
          const room: Pick<Room, 'id'> = e as Pick<Room, 'id'>
          props.onRoomSelect(room)
        }}
      />
    }

    <Button onClick={props.onSaveButtonClick}>Забронировать</Button>
  </Form>


export { RoomlockCreationForm }