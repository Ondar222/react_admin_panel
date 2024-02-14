import { FC, useEffect, useState } from "react";
import { IRoomLockCreateFormPresenter, IRoomLockCreationForm, IRoomLockCreationFormUI } from "../../model/room_lock";
import RoomSelect from "@/entities/booking/ui/form/room-select";
import { YurtaDatePicker } from "@/entities/booking/ui/form/range-picker";
import { Form, Typography, Select, Button, notification } from "antd";
import moment from "moment";
import { IRangePicker } from "@/entities/booking/ui/form/range-picker/model";
import { Room } from "@/entities/room";
import { useHotel } from "@/entities/hotel/api";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useRoomLock } from "../../api/useRoomLock";
import { Dayjs } from "dayjs";
import { LockReasonSelect } from "./reason-select";
import { useBrm } from "@/entities/calendar/api/useBrm";

const RoomLockCreationForm: FC = (props) => {
  const [api, contextHolder] = notification.useNotification();
  const { currentHotel, setCurrentHotel } = useHotel()
  const { create } = useRoomLock()
  const { addRoomLock } = useBrm()

  const [reason, setReason] = useState<string>("")
  const [dates, setDates] = useState<[number, number]>([moment().unix() / 1000, moment().unix() / 1000])
  const [room, setRoom] = useState<number>(0)

  useEffect(() => {
    if (!currentHotel)
      setCurrentHotel()
  }, [])

  const openNotification = (placement: NotificationPlacement) => {
    api.open({
      message: `Notification ${placement}`,
      placement,
    });
  };

  const handleDatePickerChange: IRangePicker["onChange"] = (dates) => {
    setDates([dates[0], dates[1]])
  }

  const handleRoomSelectChange = (e: Pick<Room, "id">[]) => {
    setRoom(e[0].id)
  }

  const handleSaveButtonClick = () => {
    openNotification('top')

    create(room, dates[0], dates[1], reason)
    
  }

  const handleLockReason = (e) => {
    setReason(e)
  }

  return (
    <>
      {contextHolder}
      <RoomLockCreationFormUI
        hotel={currentHotel}
        onDatePickerChange={handleDatePickerChange}
        onSaveButtonClick={handleSaveButtonClick}
        onRoomSelect={handleRoomSelectChange}
        onReasonSelectChange={handleLockReason}
      />
    </>

  )
}

const RoomLockCreationFormPresenter = (props: IRoomLockCreateFormPresenter): IRoomLockCreationFormUI => {
  const [api, contextHolder] = notification.useNotification();
  const [hotel, setHotel] = useState(props.hotel)
  const [dates, setDates] = useState<[Dayjs, Dayjs]>()

  const handleLockReason = (e) => {

  }

  const handleDatePickerChange: IRangePicker["onChange"] = (dates) => {

  }

  const handleRoomSelectChange = (e: Pick<Room, "id">[]) => {

  }

  const handleSaveButtonClick = () => {
    props.onSaveButtonClick()
  }

  return {
    hotel: hotel,
    onDatePickerChange: handleDatePickerChange,
    onRoomSelect: handleRoomSelectChange,
    onSaveButtonClick: handleSaveButtonClick,
    onReasonSelectChange: handleLockReason,

  }
}

const RoomLockCreationFormUI: FC<IRoomLockCreationFormUI> = (props) =>
  <Form layout="vertical" size="large" >

    <LockReasonSelect onChange={props.onReasonSelectChange} />

    <YurtaDatePicker
      label="Даты недоступности"
      value={[moment.now() / 1000, moment.now() / 1000]}
      onChange={props.onDatePickerChange}
    />

    {
      props.hotel && <RoomSelect
        value={[]}
        rooms={props.hotel.rooms}
        onChange={props.onRoomSelect}
      />
    }

    <Button onClick={props.onSaveButtonClick}>Забронировать</Button>
  </Form>


export { RoomLockCreationForm, RoomLockCreationFormPresenter, RoomLockCreationFormUI }