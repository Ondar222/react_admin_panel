import { FC, useEffect, useState } from "react";
import { IRoomLockCreationFormUI } from "../../../entities/roomlock/model/Roomlock";
import { RoomSelect } from "@/widget/room/room-select";
import { YurtaDatePicker } from "@/shared/range-picker";
import { Form, Button, notification } from "antd";
import { IRangePicker } from "@/shared/range-picker/model";
import { Room } from "@/entities/room";
import { useHotel } from "@/entities/hotel";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useRoomLock } from "../../../entities/roomlock/api/useRoomlock";
import { Dayjs } from "dayjs";
import { LockReasonSelect } from "../../../shared/reason-select";
import { useBrm } from "@/entities/calendar/api/useBrm";
import dayjs from "dayjs";

const RoomlockCreationForm: FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const { hotel, getHotelDetails } = useHotel()
  const { createRoomlock } = useRoomLock()
  const { addRoomLock } = useBrm()

  const [reason, setReason] = useState<string>("")
  const [dates, setDates] = useState<[number, number]>([dayjs().unix(), dayjs().unix()])
  const [room_id, setRoomId] = useState<number>(0)

  useEffect(() => {
    if (!hotel)
      getHotelDetails()
  }, [])

  const openNotification = (placement: NotificationPlacement) => {
    api.open({
      message: `Номер забронирован`,
      placement,
    });
  };

  const handleDatePickerChange: IRangePicker["onChange"] = (dates) => {
    console.log(dates)
    setDates([dates[0], dates[1]])
  }
    


  const handleRoomSelectChange = (e: Pick<Room, "id">) =>
    setRoomId(e.id)




  const handleLockReason = (e) => {
    setReason(e)
  }

  const handleSaveButtonClick = () => {
    openNotification('top')
    console.log(dates)
    createRoomlock({ room_id: room_id, start: dates[0], end: dates[1], reason: reason })
  }

  return (
    <>
      {contextHolder}
      <RoomLockCreationFormUI
        hotel={hotel}
        room_id={{ id: room_id }}
        dates={dates}
        onDatePickerChange={handleDatePickerChange}
        onSaveButtonClick={handleSaveButtonClick}
        onRoomSelect={handleRoomSelectChange}
        onReasonSelectChange={handleLockReason} />
    </>

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