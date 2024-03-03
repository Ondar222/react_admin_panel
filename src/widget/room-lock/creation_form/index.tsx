import { FC, useEffect, useState } from "react";
import { IRoomLockCreateFormPresenter, IRoomLockCreationForm, IRoomLockCreationFormUI } from "../../../entities/room-lock/model/room_lock";
import { RoomSelect } from "@/widget/room/room-select";
import { YurtaDatePicker } from "@/shared/range-picker";
import { Form, Typography, Select, Button, notification } from "antd";
import { IRangePicker } from "@/shared/range-picker/model";
import { Room } from "@/entities/room";
import { useHotel } from "@/entities/hotel";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useRoomLock } from "../../../entities/room-lock/api/useRoomLock";
import { Dayjs } from "dayjs";
import { LockReasonSelect } from "../../../shared/reason-select";
import { useBrm } from "@/entities/calendar/api/useBrm";
import dayjs from "dayjs";

const RoomLockCreationForm: FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const { hotel, setHotel } = useHotel()
  const { create } = useRoomLock()
  const { addRoomLock } = useBrm()

  const [reason, setReason] = useState<string>("")
  const [dates, setDates] = useState<[number, number]>([dayjs().unix(), dayjs().unix()])
  const [room, setRoom] = useState<number>(0)

  useEffect(() => {
    if (!hotel)
      setHotel()
  }, [])

  const openNotification = (placement: NotificationPlacement) => {
    api.open({
      message: `Номер забронирован`,
      placement,
    });
  };

  const handleDatePickerChange: IRangePicker["onChange"] = (dates) =>
    setDates([dates[0], dates[1]])


  const handleRoomSelectChange = (e: Pick<Room, "id">) => 
    setRoom(e.id)
  

  const handleSaveButtonClick = () => {
    openNotification('top')

    create(room, dates[0], dates[1], reason)
    console.log(dates)
  }

  const handleLockReason = (e) => {
    setReason(e)
  }

  return (
    <>
      {contextHolder}
      <RoomLockCreationFormUI
        hotel={hotel}
        room_id={null}
        dates={dates}
        onDatePickerChange={handleDatePickerChange}
        onSaveButtonClick={handleSaveButtonClick}
        onRoomSelect={handleRoomSelectChange}
        onReasonSelectChange={handleLockReason} />
    </>

  )
}

const RoomLockCreationFormPresenter = (props: IRoomLockCreateFormPresenter): IRoomLockCreationFormUI => {
  const [api, contextHolder] = notification.useNotification();
  const [hotel, setHotel] = useState(props.hotel)
  const [dates, setDates] = useState<[Dayjs, Dayjs]>()
  const [room, setRoom] = useState<number>()

  const handleLockReasonChange = (e) => {

  }

  const handleDatePickerChange: IRangePicker["onChange"] = (dates) => {
    setDates([dayjs(dates[0]).add(7, "h"), dayjs(dates[1]).add(7, "hours")])
  }

  const handleRoomSelectChange = (e: Pick<Room, "id">) => {
    props.onRoomSelect(e)
  }

  const handleSaveButtonClick = () => {
    props.onSaveButtonClick()
  }

  return {
    hotel: hotel,
    room_id: { id: room },
    dates: [dates[0].add(1, "second").unix() / 1000, dates[0].add(1, "second").unix() / 1000],
    onDatePickerChange: handleDatePickerChange,
    onRoomSelect: handleRoomSelectChange,
    onSaveButtonClick: handleSaveButtonClick,
    onReasonSelectChange: handleLockReasonChange,

  }
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


export { RoomLockCreationForm, RoomLockCreationFormPresenter, RoomLockCreationFormUI }