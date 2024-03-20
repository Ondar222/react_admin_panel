import { HotelCreateDto } from "@/entities/hotel"
import { MainLayout } from "@/shared/layouts/layout"
import { getBase64 } from "@/shared/utils"
import { AddNewHotelForm } from "@/widget/hotel/form/AddNewHotelForm"
import { UploadFile} from "antd"
import { UploadChangeParam } from "antd/es/upload"
import { FC, useState } from "react"

const HotelCreationPage: FC = () => {
  const [hotel, setHotel] = useState<HotelCreateDto>({
    name: "",
    description: "",
    images: [],
    cover: undefined
  })
  const [cover, setCover] = useState<UploadFile[]>(undefined)
  const [images, setImages] = useState<UploadFile[]>(undefined)

  const handleImagesChange = async (name: string, info: UploadChangeParam<UploadFile<any>>) => {
    const images: UploadFile[] = await Promise.all(info.fileList.map(async (file) => {
      let url = file.url

      if (!file.url) {
        url = await getBase64(file.originFileObj)
      }

      return {
        url: url,
        uid: file.uid,
        name: file.name,
        originFileObj: file.originFileObj,
        thumbUrl: file.thumbUrl,
        status: "done"
      }
    }))

    setImages(images)
  }

  const handleCoverChange = async (name: string, info: UploadChangeParam<UploadFile<any>>) => {
    const file = await getBase64(info.file.originFileObj)

    setCover([{
      url: file,
      uid: info.file.uid,
      name: info.file.name
    }])
  }

  return (
    <MainLayout header={<>Создание отеля</>} footer={<></>} >
      <AddNewHotelForm />
    </MainLayout>
  )
}

export { HotelCreationPage }