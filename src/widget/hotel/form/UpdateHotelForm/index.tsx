import { HotelUpdateDto, useHotel } from "@/entities";
import { LoadingPage } from "@/widget/loading_page";
import { Button, Form, Input, InputProps, UploadFile, message, Col } from "antd";
import Upload, { UploadChangeParam } from "antd/es/upload";
import { FC, useState } from "react";
import { HotelUpdatePageProps, UpdateHotelFormT } from "./model";
import { HotelUpdateFormUI } from "./ui";
import { YurtaEditor } from "@/shared/editor";
import { useCredentails } from "@/features/auth";


const HotelUpdateForm: FC<HotelUpdatePageProps> = (props) => {
  const [hotel, setHotel] = useState<HotelUpdateDto>(new HotelUpdateDto(props.hotel))
  const [cover, setCover] = useState<Array<UploadFile>>([{
    uid: props.hotel?.cover?.id,
    name: props.hotel?.cover?.id,
    url: props.hotel?.cover?.link,
    thumbUrl: props.hotel?.cover?.link
  }])
  const [images, setImages] = useState<Array<UploadFile>>(
    () => {
      if (props?.hotel?.images === null) {
        return []
      }

      return props.hotel?.images?.map((file) => ({
        uid: file?.id,
        name: file?.id,
        url: file?.link,
        thumbUrl: file?.link
      }))
    }
  )


  const { updateHotel, deleteImage } = useHotel()

  const handleChange: InputProps["onChange"] = async (e) => {
    setHotel((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFileChange = async (name: string, info: UploadChangeParam<UploadFile<any>>) => {

  }

  const handleFileRemove = async (name: string, file: UploadFile) => {
    await deleteImage(name, file?.uid)
  }

  const handleEditorChange = async (html: any) => {
    setHotel((prev) => ({ ...prev, description: html }))
  }

  if (!hotel || !images || !cover) return <LoadingPage layout="main" />

  return (
    <HotelUpdateFormUI
      hotel={hotel}
      handleChange={handleChange}
      handleEditorChange={handleEditorChange}
      images={images}
      cover={cover}
      onFileChange={handleFileChange}
      onFileRemove={handleFileRemove}
      onSubmit={(hotel) => updateHotel({
        id: hotel?.id,
        name: hotel?.name,
        description: hotel?.description
      }).then((res) => {
        message.success("Данные отеля успешно обновлены")
      }).catch((error) => {
        message.error("Не удалось обновить данные отеля")
      })}
    />
  )
}

export { HotelUpdateForm }

const UpdateHotelForm: FC<HotelUpdatePageProps> = (props) => {
  const { updateHotel, deleteImage } = useHotel()
  const { access_token } = useCredentails()

  const [form] = Form.useForm<UpdateHotelFormT>()
  const hotel_name = Form.useWatch("name", form)
  const description = Form.useWatch("description", form)
  const cover = Form.useWatch("cover", form)
  const images = Form.useWatch("images", form)


  return (
    <Form.Provider
      onFormFinish={async (name, info) => {
        if (name === 'hotel_update') {
          await updateHotel({
            id: props.hotel?.id,
            name: hotel_name,
            description: description,
            address: {},
          }).then((res) => {
            message.success("Данные отеля были успешно обновлены")
          }).catch((error) => {
            message.error("Не удалось обновить данные")
          })
        }
      }}>
      <Form form={form} layout="vertical" name="hotel_update" >
        
        <Form.Item name={"id"} initialValue={props.hotel?.id}>
          <Input disabled />
        </Form.Item>
        <Form.Item name={"name"} initialValue={props.hotel?.name}>
          <Input />
        </Form.Item>
        <Form.Item name={"description"} initialValue={props.hotel?.description}>
          <YurtaEditor />
        </Form.Item>
        <Form.Item name={"cover"} initialValue={props.hotel?.cover || undefined}>
          <Upload
            action={`${import.meta.env.VITE_API}/hotel/my/images`}
            method="post"
            name="cover"
            headers={{
              Authorization: `Bearer ${access_token}`
            }}
            defaultFileList={props.hotel?.cover ? [{
              uid: props.hotel?.cover?.id ? props.hotel?.cover?.id : null,
              name: props.hotel?.cover?.id ? props.hotel?.cover?.id : null,
              url: props.hotel?.cover?.id ? props.hotel?.cover.link : null
            }] : undefined}
            maxCount={1}
            listType="picture-card"
          >
            Загрузить
          </Upload>
        </Form.Item>
        <Form.Item name={"images"} initialValue={props.hotel?.images}>
          <Upload
            action={`${import.meta.env.VITE_API}/hotel/my/images`}
            method="post"
            multiple={true}
            name="images"
            headers={{
              Authorization: `Bearer ${access_token}`
            }}
            defaultFileList={
              props.hotel?.images === null ? [] : props?.hotel?.images?.map((item) => ({
                uid: item.id,
                url: item.link,
                name: item.id,
              }))}
            maxCount={20}
            listType="picture-card"
          >
            Загрузить
          </Upload>
        </Form.Item>
      <Col>
        <Button htmlType="submit">Сохранить</Button>
      </Col>
      </Form>

    </Form.Provider >
  )
}

export { UpdateHotelForm }