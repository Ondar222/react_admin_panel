import { FC, useEffect, useState } from "react";
import { RoomCreateFormUI } from "./ui/room.form";
import { Room, RoomCreationDto, useRoom } from "@/entities/room";
import { InputProps, SelectProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import type { Hotel } from "@/entities/hotel";
import { UploadFile } from "antd/lib";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "@/app/types";
import { AxiosResponse } from "axios";

interface RoomCreationFormProps {
    hotel: Hotel
}

const RoomCreationForm: FC<RoomCreationFormProps> = (props) => {
    const [room, setRoom] = useState<RoomCreationDto>()
    const { createRoom } = useRoom() 
    const navigate = useNavigate()

    useEffect(() => {
        setRoom((prev: RoomCreationDto) => ({
            ...prev,
            hotel_id: props.hotel.id
        }))
    }, [])

    const handleInputChange: InputProps["onChange"] = (e) => {
        const fieldName = e.target.name
        setRoom(prev => ({
            ...prev,
            [fieldName]: e.target.value
        }))
    }

    const handleDescriptionChange = (html) => {
        setRoom(prev => ({
            ...prev,
            description: html
        }))
    }

    const handleSelect: SelectProps["onChange"] = (value, option) => {
        setRoom(prev => ({
            ...prev,
            type: value
        }))
    }

    const handleImageChange = async (name: string, { file, fileList }: UploadChangeParam) => {

        setRoom((prev) => ({
            ...prev,
            [name]: fileList
        }))
    }

    const handleImageRemove = (name: string, file: UploadFile<any>) => {
        // setRoom((prev) => ({
        //     ...prev,
        //     images: prev.images.filter((image) => image.uid != file.uid)
        // }))
    }


    const handleSubmit = () => {
        createRoom(room)
            .then((res: AxiosResponse<ApiResponse<Room>>) => {
                navigate(`/room/${res.data.data.id}`)
            })
            .catch((rejected) => {
                navigate("/room")
            })
    }

    return (
        <RoomCreateFormUI
            room={room}
            onSubmit={handleSubmit}
            handleChange={handleInputChange}
            handleSelect={handleSelect}
            onFileChange={handleImageChange}
            onFileRemove={handleImageRemove}
            handleDescriptionChange={handleDescriptionChange}
        />
    )

}

export { RoomCreationForm }