import { FC } from "react"
import { IYurtaRoomSelectProps } from "./model/interface"
import { YurtaRoomSelectUI } from "./ui/room-select"
import { useRoomSelect } from "./presenter"

const RoomSelect: FC<IYurtaRoomSelectProps> = (props) => {
    const { value, options, onChange } = useRoomSelect(props)

    return (

        <YurtaRoomSelectUI
            {...props}
            options={options}
            value={value}
            onChange={(e) => onChange(e)}
        />
    )
}


export { RoomSelect }