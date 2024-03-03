import { Hotel, HotelUpdateDto, useHotel } from "@/entities/hotel";
import { AddressBuilderPresenter } from "@/widget/address/address-builder/presenter";
import { YurtaUpload } from "@/shared/components/form/ui/input/file";
import { YurtaInput } from "@/shared/components/form/ui/input/text";
import { MainLayout } from "@/shared/layouts/layout";
import { Col, Form, Typography, UploadProps, UploadFile, Button } from "antd";
import { RcFile } from "antd/es/upload";
import { FC, useEffect, useState } from "react";
import { UploadChangeParam } from "antd/lib/upload";
import { useHotelFiles } from "@/entities/hotel/api/useHotelFiles";


const HotelPage: FC = () => {
  const { hotel, setHotel, updateHotel } = useHotel()
  const { cover, images, getHotelFiles, uploadImage, deleteImage } = useHotelFiles()
  const [state, setState] = useState<HotelUpdateDto>()
  const [addressKeys, setAddressKeys] = useState<{ [key: string]: string }>()

  useEffect(() => {
    setHotel()
    getHotelFiles()
  }, [])

  useEffect(() => {
    setState(new HotelUpdateDto(hotel))
  }, [hotel])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const fieldname = e.target.name
    setState((prev) => ({ ...prev, [fieldname]: e.target.value }))
  }

  const handleFileChange = async (fieldName: string, info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
      await uploadImage(fieldName, info.file)
    }

    if (info.file.status === "removed") {
      await deleteImage(fieldName, info.file.uid)
    }
  }

  if (!hotel)
    return <div>loading</div>

  return (
    <MainLayout header={<Typography.Title level={2}>Мой отель</Typography.Title>} footer="">
      <Col span={12}>
        {
          hotel &&
          <Form layout="vertical" size="large">
            <YurtaInput label="Название" name="name" value={state?.name} onChange={handleChange} />

            <AddressBuilderPresenter address={hotel?.address} />



            {
              cover && <YurtaUpload
                label="Превью"
                fieldName="cover"
                multiple={false}
                maxCount={1}
                listType="picture-card"
                fileList={[cover]}
                onChange={handleFileChange}
              />
            }



            {
              images && <YurtaUpload
                label="Изображения"
                fieldName="images"
                multiple={true}
                maxCount={10}
                listType="picture-card"
                fileList={images}
                onChange={handleFileChange}
              />
            }



            <Button
              onClick={() => {
                updateHotel({
                  id: state?.id,
                  name: state?.name,
                  description: state?.description
                })
              }}>Сохранить</Button>
          </Form>
        }
      </Col>
    </MainLayout >
  )
}

export { HotelPage }