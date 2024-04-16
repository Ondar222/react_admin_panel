import { Room, useRoom } from "@/entities/room"
import { Switch, SwitchProps } from "antd"
import { FC, useState } from "react"

const RoomVsbltSwitch: FC<{ room: Room }> = (props) => {
    const [visibility, setVisibility] = useState<boolean>(props?.room?.visibility)
    const { changeVisibility } = useRoom()

    const handleChange: SwitchProps["onChange"] = (e) => {
        changeVisibility(props?.room?.id, !visibility)
        setVisibility(!visibility)
    }

    return <Switch
        value={visibility}
        onChange={handleChange}
        title="Показывать в поиске"
        {...props} />
}


export { RoomVsbltSwitch }
