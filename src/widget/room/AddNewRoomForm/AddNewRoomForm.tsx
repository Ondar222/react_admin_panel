import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Select, Upload, message } from "antd"
import type { FormProviderProps } from "antd/es/form/context"
import type { UploadChangeParam } from "antd/es/upload"
import { Room, RoomCreationDto, RoomTypes, useRoom } from "@/entities/room"
import { YurtaEditor } from "@/shared/editor"
import { validateNumberInputValue } from "@/shared/utils/form/validation"
import { ApiResponse } from "@/app/types"
import { AxiosError } from "axios"

interface AddNewRoomFormProps {
  hotel_id: number
  successCallback: (data: ApiResponse<Room>) => void
  rejectCallback: (error: Error | AxiosError) => void
}

const ROOM_TYPES_OPTIONS = Object.keys(RoomTypes).map((status) => ({
  value: status,
  label: RoomTypes[status]
}))

const AddNewRoomForm: FC<AddNewRoomFormProps> = ({ hotel_id, successCallback, rejectCallback }) => {
  const { createRoom, getHotelRelatedRooms } = useRoom()

  const [form] = Form.useForm<RoomCreationDto>()

  const name = Form.useWatch("name", form)
  const number = Form.useWatch("number", form)
  const price = Form.useWatch<number>("price", form)
  const description = Form.useWatch("description", form)
  const capacity = Form.useWatch("capacity", form)
  const type = Form.useWatch<RoomTypes>("type", form)
  const cover = Form.useWatch<UploadChangeParam>("cover", form)
  const images = Form.useWatch<UploadChangeParam>("images", form)

  const handleSubmit: FormProviderProps["onFormFinish"] = async (form_name, info) => {
    
    console.log('submitter')
    if (form_name === "room_creation") {
      console.log('submitter')
      await createRoom({
        name,
        number,
        price: Number(price),
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
          getHotelRelatedRooms()
          successCallback(res.data)
        })
        .catch((e) => {
          message.error("Ошибка при создании номера")
          rejectCallback(e)
          throw e
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
          rules={[]}

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
          label="Изображения"
          rules={[
            {
              required: true
            }
          ]}>
          <Upload
            maxCount={10}
            multiple={true}
            listType="picture-card"
            beforeUpload={() => false}
          >
            Загрузить
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" >Сохранить</Button>
        </Form.Item>

      </Form>
    </Form.Provider>
  )
}

export { AddNewRoomForm }