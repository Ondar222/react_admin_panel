import { FC, useEffect, useState } from "react";
import { RoomCreateFormUI } from "./ui/room.form";
import { RoomCreationDto, useRoom } from "@/entities/room";
import { InputProps, SelectProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { LoadingPage } from "@/widget/loading_page";
import { url } from "inspector";
import { Hotel } from "@/entities/hotel";
import { UploadFile } from "antd/lib";
import { getBase64 } from "@/shared/utils";
import { RcFile } from "antd/lib/upload";

interface RoomCreationFormProps {
    hotel: Hotel
}

const RoomCreationForm: FC<RoomCreationFormProps> = (props) => {
    const [room, setRoom] = useState<RoomCreationDto>()
    const { createRoom } = useRoom()

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

    const handleSubmit = () => createRoom(room)

    return <>
        {
            JSON.stringify(room)
        }
        <RoomCreateFormUI
            room={room}
            onSubmit={handleSubmit}
            handleChange={handleInputChange}
            handleSelect={handleSelect}
            onFileChange={handleImageChange}
            onFileRemove={handleImageRemove} />
    </>

}

export { RoomCreationForm }