import { YurtaUpload } from "@/shared/components/form/ui/input/file"
import { YurtaInput } from "@/shared/components/form/ui/input/text"
import { MainLayout } from "@/shared/layouts/layout"
import { getBase64 } from "@/shared/utils"
import { Upload, UploadFile, Form, Button } from "antd"
import { UploadChangeParam } from "antd/es/upload"
import { FC, useEffect, useState } from "react"

const HotelCreationPage: FC = () => {
  const [cover, setCover] = useState<UploadFile[]>(undefined)
  const [images, setImages] = useState<UploadFile[]>(undefined)

  const handleImagesChange = async (name: string, info: UploadChangeParam<UploadFile<any>>) => {
    console.log(info)
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
    <MainLayout header={<></>} footer={<></>} >
      <Form layout="vertical">
        <YurtaInput label={"Название"} />

        <YurtaUpload
          label={"Обложка"}
          fileList={cover}
          onChange={(name, info) => handleCoverChange(name, info)}
          multiple={false}
          maxCount={1}
          listType="picture-card" onRemove={function (name: string, file: UploadFile<any>): void {
            throw new Error("Function not implemented.")
          }} />

        <YurtaUpload
          label={"Изображения"}
          fileList={images}
          onChange={(name, info) => handleImagesChange(name, info)}
          multiple={true}
          maxCount={10}
          listType="picture-card" onRemove={function (name: string, file: UploadFile<any>): void {
            throw new Error("Function not implemented.")
          }} />
      </Form>


    </MainLayout>
  )
}

export { HotelCreationPage }