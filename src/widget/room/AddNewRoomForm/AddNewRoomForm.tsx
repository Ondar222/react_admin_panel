import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Select, Upload, message } from "antd"
import type { FormProviderProps } from "antd/es/form/context"
import type { UploadChangeParam } from "antd/es/upload"
import { RoomCreationDto, RoomTypes, useRoom } from "@/entities/room"
import { YurtaEditor } from "@/shared/editor"
import { validateNumberInputValue } from "@/shared/utils/form/validation"

const ROOM_TYPES_OPTIONS = Object.keys(RoomTypes).map((status) => ({
  value: status,
  label: RoomTypes[status]
}))

const AddNewRoomForm: FC<{ hotel_id: number }> = ({ hotel_id }) => {
  const { createRoom } = useRoom()
  const navigate = useNavigate()

  const [form] = Form.useForm<RoomCreationDto>()

  const name = Form.useWatch("name", form)
  const number = Form.useWatch("number", form)
  const price = Form.useWatch("price", form)
  const description = Form.useWatch("description", form)
  const capacity = Form.useWatch("capacity", form)
  const type = Form.useWatch("type", form)
  const cover = Form.useWatch<UploadChangeParam>("cover", form)
  const images = Form.useWatch<UploadChangeParam>("images", form)

  const handleSubmit: FormProviderProps["onFormFinish"] = (form_name, info) => {
    if (form_name === "room_creation") {
      createRoom({
        name,
        number,
        price,
        type,
        capacity,
        description,
        cover: cover.fileList,
        images: images.fileList,
        hotel_id,
        visibility: false
      })
        .then((res) => {
          message.success("Успешно создан новый номер")
          navigate(`/room/${res.data.data.id}`)
        })
        .catch((e) => {
          console.log(e)
          message.error("Ошибка при создании номера")
        })
    }
  }

  return (
    <Form.Provider
      onFormFinish={handleSubmit}
    >
      <Form
        form={form}
        name="room_creation"
        layout="vertical"
        size="large"
      >
        <Form.Item
          name={"name"}
          label="Название номера"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"number"}
          label="Идентификатор номера"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Стоимость"
          rules={[{ required: true, validator: validateNumberInputValue }]}>
          <Input
            type="number"
          />
        </Form.Item>

        <Form.Item
          name={"type"}
          label="Тип номера"
          rules={[{ required: true }]}
        >
          <Select options={ROOM_TYPES_OPTIONS} />
        </Form.Item>

        <Form.Item
          name={"capacity"}
          label="Вместимость"
          rules={[{ required: true, type: "number", validator: validateNumberInputValue }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name={"description"}
          label="Описание номера"
          rules={[{ required: true }]}>
          <YurtaEditor />
        </Form.Item>

        <Form.Item
          name={"cover"}
          label="Обложка"
          rules={[{ required: true }]}
        >
          <Upload
            maxCount={1}
            listType="picture-card"
            beforeUpload={() => false}
          >
            Загрузить
          </Upload>
        </Form.Item>

        <Form.Item
          name={"images"}
          label="Изображения">
          <Upload
            maxCount={10}
            multiple={true}
            listType="picture-card"
            beforeUpload={() => false}
          >
            Загрузить
          </Upload>
        </Form.Item>

        <Button htmlType="submit" >Сохранить</Button>
      </Form>
    </Form.Provider>
  )
}

export { AddNewRoomForm }