import { useHotel } from "@/entities/hotel"
import { YurtaEditor } from "@/shared/editor"
import { Button, Form, Input, Upload } from "antd"
import { FC } from "react"
import { AddNewHotelFormT } from "./type"

const AddNewHotelForm: FC = () => {
  const [form] = Form.useForm<AddNewHotelFormT>()

  const hotel_name = Form.useWatch("name", form)
  const description = Form.useWatch("description", form)
  const cover = Form.useWatch("cover", form)
  const images = Form.useWatch("images", form)

  const { createHotel } = useHotel()

  return (
    <Form.Provider onFormFinish={(name, info) => {
      if (name === 'hotel_creation') {
        createHotel({
          name: hotel_name,
          description: description,
          cover: cover.file,
          images: images.fileList
        })
      }
    }}>
      <Form form={form} layout="vertical" name="hotel_creation" >
        <Form.Item name={"name"} >
          <Input />
        </Form.Item>
        <Form.Item name={"description"}>
          <YurtaEditor />
        </Form.Item>
        <Form.Item name={"cover"}>
          <Upload maxCount={1} listType="picture-card">Upload</Upload>
        </Form.Item>
        <Form.Item name={"images"}>
          <Upload maxCount={10} listType="picture-card">Upload</Upload>
        </Form.Item>
        <Button htmlType="submit">Создать</Button>
      </Form>
    </Form.Provider>
  )
}

export { AddNewHotelForm }