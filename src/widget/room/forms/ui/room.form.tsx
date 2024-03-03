import { RoomCreationDto, RoomTypes, RoomUpdateDto } from "@/entities/room"
import { YurtaUpload } from "@/shared/components/form/ui/input/file"
import { YurtaInput } from "@/shared/components/form/ui/input/text"
import { YurtaSelect } from "@/shared/components/form/ui/select/default"
import { Button, Form, Input } from "antd"
import { FC } from "react"
import { IRoomFormUI } from "../model"

function isRoomCreation(room: RoomCreationDto | RoomUpdateDto): room is RoomCreationDto {
  return room instanceof RoomCreationDto
}

function isRoomUpdating(room: RoomCreationDto | RoomUpdateDto): room is RoomUpdateDto {
  return room instanceof RoomUpdateDto
}

export const RoomFormUI: FC<IRoomFormUI> = (props) =>
  <Form
    layout="vertical"
    size="large"
  >
    {isRoomUpdating(props.room) && <YurtaInput
      label="id"
      value={props.room?.id}
      name="id"
      disabled
    />}

    <YurtaInput
      label="Название комнаты"
      placeholder="Название комнаты"
      value={props.room?.name}
      name="name"
      onChange={props.handleChange}
    />

    <YurtaInput
      label="Идентификатор номера"
      placeholder="Идентификатор номера"
      value={props.room?.number}
      name="number"
      onChange={props.handleChange}
    />

    <YurtaInput
      label="Стоимость"
      type="number"
      placeholder="Стоимость"
      value={props.room?.price}
      name="price"
      onChange={props.handleChange}
    />

    <YurtaSelect
      label="Тип комнаты"
      placeholder="Тип комнаты"
      value={props.room?.type}
      options={Object.keys(RoomTypes).map((status) => ({
        value: status,
        label: status
      }))}

      onChange={props.handleSelect}
    />

    <YurtaInput
      label="Вместимость"
      type="number"
      placeholder="Вместимость"
      value={props.room?.capacity}
      name="capacity"
      onChange={props.handleChange}
    />

    <YurtaUpload
      fieldName="cover"
      label="Обложка"
      multiple={false}
      listType="picture-card"
      fileList={props.room.cover ? [props?.room?.cover] : []}
      maxCount={1}
      onChange={props.onFileChange}
    />

    <YurtaUpload
      fieldName="images"
      label="Изображения"
      multiple={true}
      listType="picture-card"
      fileList={props.room?.images}
      maxCount={100}
      onChange={props.onFileChange}
    />

    <Button value={"Cохранить"} title="Сохранить" onClick={() => {
      console.log(props.room)
      console.group('creation')
      console.log(isRoomCreation(props.room))
      console.groupEnd()

      console.group('updating')
      console.log(isRoomUpdating(props.room))
      console.groupEnd()
      props.onSubmit()
    }} >Сохранить</Button>
  </Form>
