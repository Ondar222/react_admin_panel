import { FC, useEffect, useState } from "react";
import { RoomFormUI } from "..";
import { useHotel } from "@/entities/hotel";
import { RoomCreationDto, useRoom } from "@/entities/room";
import { InputProps, SelectProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";

interface RoomCreationFormProps {
    room: RoomCreationDto
    setRoom: React.Dispatch<React.SetStateAction<RoomCreationDto>>
    hotel_id: number
    onSubmit: (room: RoomCreationDto) => void
}

const RoomCreationForm: FC<RoomCreationFormProps> = ({ room, setRoom, hotel_id, onSubmit }) => {
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

        // if (status === "uploading") {
        if (fieldName === "cover")
            setRoom((prev) => ({
                ...prev,
                cover: file
            }))

        if (fieldName === "images")
            setRoom((prev) => ({
                ...prev,
                images: fileList
            }))

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

    const handleSubmit = () => onSubmit(room)

    if (room.hotel_id)

        return <>
            {
                JSON.stringify(room)
            }
            <RoomFormUI
                room={room}
                onSubmit={handleSubmit}
                handleChange={handleInputChange}
                handleSelect={handleSelect}
                onFileChange={handleImageChange} />
        </>
}

export { RoomCreationForm }