import { Room, RoomCreationDto, RoomUpdateDto, useRoom } from "@/entities/room"
import { useEffect, useState } from "react"
import { IUseRoomCreate } from "../../model"
import { InputProps, SelectProps, UploadFile } from "antd"
import { UploadChangeParam } from "antd/es/upload"
import { useHotel } from "@/entities/hotel"

export const useRoomCreate = (): IUseRoomCreate => {
    const [room, setRoom] = useState<RoomCreationDto>(new RoomCreationDto())
    const { hotel, setHotel } = useHotel()

    const setHotelId = async () => {

        setHotel()

        setRoom((prev) => ({ ...prev, hotel_id: hotel?.id }))
    }

    useEffect(() => {
        setHotelId()
    }, [])


    const { create, uploadImage, deleteImage } = useRoom()

    const handleInputChange: InputProps["onChange"] = (e) => {
        const fieldName = e.target.name
        setRoom(prev => ({
            ...prev,
            [fieldName]: e.target.value
        }))
    }

    const handleSelect: SelectProps["onChange"] = (value, option) => {
        console.log(value, option)
    }

    const handleImageDelete = (fieldName: string, file: UploadFile) => {

        switch (fieldName) {
            case "cover": setRoom((prev) => ({ ...prev, cover: file })); break;
            case "images": setRoom((prev) => ({ ...prev, images: prev.images.filter((image) => image?.uid != file?.uid) }))
        }
        setRoom((prev) => {
            const images = prev?.images?.filter((image) => image.uid != file.uid)

            return {
                ...prev,
                images: images
            }
        })
    }

    const handleImageChange = (fieldName, info: UploadChangeParam) => {
        switch (fieldName) {
            case "cover":
                setRoom((prev: RoomCreationDto) => ({ ...prev, cover: info.file }));
                break;
            case "images":
                setRoom((prev: RoomCreationDto) => ({
                    ...prev,
                    images: info.fileList
                }));
                break
        }

    }

    const onSubmit = () => create(room)

    return {
        room,
        onInputChange: handleInputChange,
        onFileChange: handleImageChange,
        onFileDelete: handleImageDelete,
        onSelect: handleSelect,
        onSubmit: onSubmit
    }
}