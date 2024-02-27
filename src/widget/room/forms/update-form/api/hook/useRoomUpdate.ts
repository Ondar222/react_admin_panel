import { Room, RoomUpdateDto, useRoom } from "@/entities/room"
import { useEffect, useState } from "react"
import { IUseRoomUpdate } from "../../model/update.form"
import { InputProps, SelectProps } from "antd"

export const useRoomUpdate = (props: { room: Room }): IUseRoomUpdate => {
    const [room, setRoom] = useState<RoomUpdateDto>(new RoomUpdateDto())

    useEffect(() => {
        console.log('render')
        setRoom(new RoomUpdateDto(props.room))
    }, [props.room])

    const { update, uploadImage, deleteImage } = useRoom()

    const handleInputChange: InputProps["onChange"] = (e) => {
        const fieldName = e.target.name
        setRoom(prev => ({
            ...prev,
            [fieldName]: e.target.value
        }))
    }

    const handleSelect: SelectProps["onChange"] = (value, option) => {

    }

    const handleImageDelete = (fieldName, file) => {

        deleteImage(room.id, fieldName, file.uid)

        setRoom((prev) => {
            const images = prev.images.filter((image) => image.uid != file.uid)

            return {
                ...prev,
                images: images
            }
        })
    }

    const handleImageChange = (fieldName, info) => {
        if (info.file.status === "uploading") {
            uploadImage(room.id, fieldName, info.file)
        }

        if (info.file.status === "done") {
            switch (fieldName) {
                case "cover":
                    setRoom((prev) => ({ ...prev, cover: info.file }));
                    break;
                case "images":
                    setRoom((prev) => ({
                        ...prev,
                        images: [...prev.images, info.file]
                    }));
                    break
            }
        }
    }

    const onSubmit = () => update(room)

    return {
        room,
        onInputChange: handleInputChange,
        onFileChange: handleImageChange,
        onFileDelete: handleImageDelete,
        onSelect: handleSelect,
        onSubmit: onSubmit
    }
}
