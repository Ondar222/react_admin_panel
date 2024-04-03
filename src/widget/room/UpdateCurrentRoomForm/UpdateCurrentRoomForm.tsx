import { RoomTypes, RoomUpdateDto, useRoom } from "@/entities/room"
import { Button, Form, Input, Select, message } from "antd"
import { FC } from "react"
import { YurtaEditor } from "@/shared/editor"
import Upload, { UploadChangeParam } from "antd/es/upload"
import { validateNumberInputValue } from "@/shared/utils/form/validation"
import { FormProviderProps } from "antd/es/form/context"
import { YurtaUpload } from "@/shared/components/form/ui/input/file"
import { useCredentails } from "@/features/auth"

const ROOM_TYPES_OPTIONS = Object.keys(RoomTypes).map((status) => ({
  value: status,
  label: RoomTypes[status]
}))

const UpdateCurrentRoomForm: FC<{ room: RoomUpdateDto }> = (props) => {
  const { access_token } = useCredentails()
  const { updateRoom, deleteRoomImage } = useRoom()
  const [form] = Form.useForm<RoomUpdateDto>()

  const id = Form.useWatch("id", form)
  const name = Form.useWatch("name", form)
  const number = Form.useWatch("number", form)
  const price = Form.useWatch("price", form)
  const description = Form.useWatch("description", form)
  const capacity = Form.useWatch("capacity", form)
  const type = Form.useWatch("type", form)
  const cover = Form.useWatch<UploadChangeParam>("cover", form)
  const images = Form.useWatch<UploadChangeParam>("images", form)

  const handleSubmit: FormProviderProps["onFormFinish"] = async (form_name, info) => {
    if (form_name === "UpdateCurrentRoomForm") {
      console.log({
        id,
        name,
        number,
        price,
        description,
        capacity,
        type,
        hotel_id: props.room.hotel_id
      })
      await updateRoom({
        id: props.room.id,
        name,
        number,
        price,
        description,
        capacity,
        type,
        hotel_id: props.room.hotel_id
      })
        .then((res) => {
          message.success("Номер обновлен")
          console.log(res)
        })
        .catch((e) => {
          message.error("Произошла ошибка")
          console.error(e)
        })
    }
  }

  const handleImageChange = async (fieldName: string, info) => {
    const status = info.file.status
    if (status === "done") {
      console.log('uploaded')
      // await uploadRoomImage(fieldName, info.file);
    }

    if (status === "removed") {
      await deleteRoomImage(fieldName, info.file.uid);
    }

  };

  const handleImageRemove = async (fieldName: string, file) => {

  }

  return (
    <Form.Provider
      onFormFinish={handleSubmit}
    >
      <Form
        form={form}
        name="UpdateCurrentRoomForm"
        layout="vertical"
        size="large"
      >
        <Form.Item name={"id"} initialValue={props.room.id}>
          <Input disabled />
        </Form.Item>

        <Form.Item
          name={"name"}
          label="Название номера"
          rules={[{ required: true }]}
          initialValue={props.room.name}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"number"}
          label="Идентификатор номера"
          rules={[{ required: true }]}
          initialValue={props.room.number}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Стоимость"
          rules={[{ required: true, validator: validateNumberInputValue }]}
          initialValue={props.room.price}
        >
          <Input
            type="number"
          />
        </Form.Item>

        <Form.Item
          name={"type"}
          label="Тип номера"
          rules={[{ required: true }]}
          initialValue={props.room.type}
        >
          <Select options={ROOM_TYPES_OPTIONS} />
        </Form.Item>

        <Form.Item
          name={"capacity"}
          label="Вместимость"
          rules={[{ required: true, type: "number", validator: validateNumberInputValue }]}
          initialValue={props.room.capacity}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name={"description"}
          label="Описание номера"
          rules={[{ required: true }]}
          initialValue={props.room.description}
        >
          <YurtaEditor />
        </Form.Item>

        <Form.Item
          name={"cover"}
          label="Обложка"
          rules={[{ required: true }]}
          initialValue={props.room.cover}
        >
          <Upload
            method="POST"
            name="cover"
            action={`${import.meta.env.VITE_API}/room/${props.room.id}/images`}
            headers={{
              Authorization: `Bearer ${access_token}`
            }}
            multiple={false}
            listType="picture-card"
            defaultFileList={props.room?.cover}
            maxCount={1}
            onChange={(info) => handleImageChange("cover", info)}
            onRemove={(file) => handleImageRemove("cover", file)}
          >
            Загрузить
          </Upload>
        </Form.Item>

        <Form.Item
          name="images"
          label="Изображения"
          initialValue={props.room?.images}>
          <Upload
            method="POST"
            name="images"
            action={`${import.meta.env.VITE_API}/room/${props.room.id}/images`}
            headers={{
              Authorization: `Bearer ${access_token}`
            }}
            multiple={true}
            listType="picture-card"
            defaultFileList={props.room?.images}
            maxCount={10}
            onChange={(info) => handleImageChange("images", info)}
            onRemove={(file) => handleImageRemove("images", file)}
          >
            Загрузить
          </Upload>
        </Form.Item>
        <Button htmlType="submit" >Сохранить</Button>
      </Form>
    </Form.Provider >
  )
}


export { UpdateCurrentRoomForm }