import { YurtaDatePicker } from "@/shared/range-picker";
import { Button, Flex, Form, Select, Typography } from "antd";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { RoomLockCreationDto } from "../../model/dto/RoomLockCreateDto";
import { useRoomLock } from "../../api/useRoomLock";
import { Room } from "../../model/interface";
import RoomSelect from "@/widget/room/room-select";
import { useHotel } from "@/entities/hotel/api";

const RoomLockCreationForm: FC = () => {
  const [roomLock, setRoomLock] = useState<RoomLockCreationDto>(new RoomLockCreationDto())
  const [selectedRooms, setSelectedRooms] = useState<Array<Pick<Room, "id">>>([])
  const { create } = useRoomLock()

  const { hotel: hotel, setHotel } = useHotel()

  useEffect(() => {
    setHotel()
  }, [])

  return (
    <Form layout="vertical" size="large" >

      <Form.Item label={<Typography.Title level={4}>Добавить событие</Typography.Title>}>
        <Select>
          <option value={"repair"}>Ремонт</option>
          <option value={"offline"}>Оффлайн заказ</option>
          <option value={"other"}>Еще одна причина</option>
        </Select>
      </Form.Item>

      <YurtaDatePicker
        label="Даты недоступности"
        value={[moment.now() / 1000, moment.now() / 1000]}
        onChange={(e) => {
          setRoomLock(prev => ({
            ...prev,
            start: e[0],
            end: e[1]
          }))
        }}
      />

      {
        hotel && <RoomSelect
          value={[]}
          rooms={hotel?.rooms}
          onChange={(e) => {
            setSelectedRooms(e)
          }
          }
        />
      }

      <Button onClick={() => {
        selectedRooms.forEach((room) => {
          create(room.id, roomLock.start, roomLock.end, roomLock.reason)
        })
      }}>Забронировать</Button>
    </Form>
  )
}

export { RoomLockCreationForm }