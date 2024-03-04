import { RoomCreationDto, RoomTypes, RoomUpdateDto } from "@/entities/room"
import { YurtaUpload } from "@/shared/components/form/ui/input/file"
import { YurtaInput } from "@/shared/components/form/ui/input/text"
import { YurtaSelect } from "@/shared/components/form/ui/select/default"
import { Button, Form, Input, UploadFile } from "antd"
import { FC } from "react"
import { IRoomFormUI } from "../../model"

export function isRoomCreation(room: RoomCreationDto | RoomUpdateDto): room is RoomCreationDto {
  return room instanceof RoomCreationDto
}

export function isRoomUpdating(room: RoomCreationDto | RoomUpdateDto): room is RoomUpdateDto {
  return room instanceof RoomUpdateDto
}

export const RoomCreateFormUI: FC<IRoomFormUI<RoomCreationDto>> = (props) =>
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
      method="POST"
      name="cover"
      action={"/partners/room/+"}
      label="Обложка"
      multiple={false}
      fileList={props.room?.cover}
      listType="picture-card"
      maxCount={1}
      onChange={props.onFileChange}
      onRemove={props.onFileRemove} />

    <YurtaUpload
      method="POST"
      name="images"
      action={"/partners/room/+"}
      label="Изображения"
      multiple={true}
      fileList={props.room?.images}
      listType="picture-card"
      maxCount={100}
      onChange={props.onFileChange}
      onRemove={props.onFileRemove} />

    <Button value={"Cохранить"} title="Сохранить" onClick={props.onSubmit} >Сохранить</Button>
  </Form>
