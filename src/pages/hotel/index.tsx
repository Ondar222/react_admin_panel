import { useHotel } from "@/entities/hotel";
import { AddressBuilderPresenter } from "@/widget/address/address-builder/presenter";
import { getBase64 } from "@/shared/utils";
import { YurtaUpload } from "@/shared/components/form/ui/input/file";
import { YurtaInput } from "@/shared/components/form/ui/input/text";
import { MainLayout } from "@/shared/layouts/layout";
import { Col, Form, Typography, UploadProps, UploadFile, Button } from "antd";
import { RcFile } from "antd/es/upload";
import { FC, useEffect, useState } from "react";
import { UploadChangeParam } from "antd/lib/upload";


const HotelPage: FC = () => {
  const { hotel, setHotel, updateHotel, uploadImage } = useHotel()

  useEffect(() => {
    setHotel()
  }, [])

  useEffect(() => {
    setUpdate({
      images: hotel?.images?.map((image) => ({
        uid: image.id,
        name: image.id,
        thumbUrl: image.link
      })),
      cover: {
        uid: hotel?.cover.id,
        name: hotel?.cover.id,
        thumbUrl: hotel?.cover.link
      }
    })
  }, [hotel?.images, hotel?.cover])

  const [addressKeys, setAddressKeys] = useState<{ [key: string]: string }>()
  const [update, setUpdate] = useState<{ cover: UploadFile, images: Array<UploadFile> }>()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const fieldname = e.target.name
    setUpdate((prev) => ({ ...prev, [fieldname]: e.target.value }))
  }

  const handleFileChange = async (fieldName: string, info: UploadChangeParam) => {
console.log(info)
    if (info.file.status === "uploading") {
      await uploadImage(fieldName, info.file)
      switch (fieldName) {
        case "cover":
          setUpdate((prev) => ({ ...prev, cover: info.file.originFileObj }));
          break;
        case "images":
          info.fileList.pop()
          setUpdate((prev) => ({
            ...prev,
            images: [...info.fileList, info.file]
          }));
          break
      }
    }

    if (info.file.status === "done") {
      switch (fieldName) {
        case "cover":
          setUpdate((prev) => ({ ...prev, cover: info.file }));
          break;
        case "images":
          info.fileList.pop()
          setUpdate((prev) => ({
            ...prev,
            images: [...info.fileList, info.file]
          }));
          break
      }
      
    }
  }
  return (
    <MainLayout header={<Typography.Title level={2}>Мой отель</Typography.Title>} footer="">
      <Col span={12}>
        {
          hotel &&
          <Form layout="vertical" size="large">
            <YurtaInput label="Название" value={hotel.name} />

            {hotel && <AddressBuilderPresenter address={hotel?.address} />}

            {update && (
              <YurtaUpload
                label="Превью"
                fieldName="cover"
                multiple={false}
                listType="picture-card"
                fileList={[update?.cover]}
                onChange={() => { }}
                onRemove={() => { }}
              />
            )}

            {update && <YurtaUpload
              label="Изображения"
              fieldName="images"
              multiple={true}
              listType="picture-card"
              fileList={update?.images}
              onChange={handleFileChange}
              onRemove={() => { }}
            />}

            <Button onClick={() => {
              updateHotel({
                id: hotel.id,
                cover: update.cover,
                images: update.images,
                name: hotel.name,

                address: 2,
                description: ""
              })
            }}>Сохранить</Button>
          </Form>
        }
      </Col>
    </MainLayout >
  )
}

export { HotelPage }