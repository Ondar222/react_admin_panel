import { HotelUpdateDto, useHotel } from "@/entities/hotel";
import { LoadingPage } from "@/widget/loading_page";
import { InputProps, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { FC, useState } from "react";
import { HotelUpdatePageProps } from "./model";
import { HotelUpdateFormUI } from "./ui";



export const HotelUpdateForm: FC<HotelUpdatePageProps> = (props) => {
  const [hotel, setHotel] = useState<HotelUpdateDto>(new HotelUpdateDto(props.hotel))
  const [cover, setCover] = useState<Array<UploadFile>>([{
    uid: props.hotel.cover.id,
    name: props.hotel.cover.id,
    url: props.hotel.cover.link,
    thumbUrl: props.hotel.cover.link
  }])
  const [images, setImages] = useState<Array<UploadFile>>(props.hotel.images.map((file) => ({
    uid: file.id,
    name: file.id,
    url: file.link,
    thumbUrl: file.link
  })))

  const { updateHotel, deleteImage } = useHotel()

  const handleChange: InputProps["onChange"] = async (e) => {
    console.log(e)
    setHotel((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFileChange = async (name: string, info: UploadChangeParam<UploadFile<any>>) => {

  }

  const handleFileRemove = async (name: string, file: UploadFile) => {
    deleteImage(name, file.uid)
  }

  const handleEditorChange = async (html: any) => {
    setHotel((prev) => ({ ...prev, description: html }))
  }

  if (!hotel || !images || !cover) return <LoadingPage />

  return <HotelUpdateFormUI
    handleEditorChange={handleEditorChange}
    hotel={hotel}
    handleChange={handleChange}
    images={images}
    cover={cover}
    onFileChange={handleFileChange}
    onFileRemove={handleFileRemove}
    onSubmit={(hotel) => updateHotel({
      id: hotel?.id,
      name: hotel?.name,
      description: hotel?.description
    })}
  />
}