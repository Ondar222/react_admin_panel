import { FC, useEffect, useState } from "react";
import { RoomFormUI } from "..";
import { useHotel } from "@/entities/hotel";
import { RoomCreationDto, useRoom } from "@/entities/room";
import { InputProps, SelectProps, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";

const RoomCreationForm: FC = () => {
    const [room, setRoom] = useState<RoomCreationDto>(new RoomCreationDto())
    const { hotel, setHotel } = useHotel()

    useEffect(() => {

    }, [])

    const setHotelId = async () => {
        setRoom(new RoomCreationDto())
        setHotel()
        setRoom((prev) => ({ ...prev, hotel_id: hotel?.id }))
    }

    useEffect(() => {
        setHotelId()
    }, [])


    const { create } = useRoom()

    const handleInputChange: InputProps["onChange"] = (e) => {
        const fieldName = e.target.name
        setRoom(prev => ({
            ...prev,
            [fieldName]: e.target.value
        }))
    }

    const handleSelect: SelectProps["onChange"] = (value, option) => {
        setRoom(prev => ({
            ...prev,
            type: value
        }))
    }

    const handleImageChange = (fieldName: string, { file, fileList }: UploadChangeParam) => {
        const status = file.status

        if (status === "uploading") {
            if (fieldName === "cover")
                setRoom((prev) => ({
                    ...prev,
                    cover: {
                        ...file
                    }
                }))



            if (fieldName === "images")
                setRoom((prev) => ({
                    ...prev,
                    images: [...prev.images || null, { ...file }]
                }))
        }

        if (status === "removed") {
            if (fieldName === "cover")
                setRoom((prev) => ({
                    ...prev,
                    cover: fileList[0]
                }))



            if (fieldName === "images")
                setRoom((prev) => ({
                    ...prev,
                    images: fileList
                }))
        }

    }

    const onSubmit = () => create(room)

    return <>
        {
            JSON.stringify(room)
        }
        <RoomFormUI
            room={room}
            onSubmit={onSubmit}
            handleChange={handleInputChange}
            handleSelect={handleSelect}
            onFileChange={handleImageChange} />
    </>
}

export { RoomCreationForm }