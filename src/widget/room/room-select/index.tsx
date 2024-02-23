import { FC } from "react"
import { IYurtaRoomSelectProps } from "./model/interface"
import { YurtaRoomSelectUI } from "./ui/room-select"
import { RoomSelectPresenter } from "./presenter"

const RoomSelect: FC<IYurtaRoomSelectProps> = (props) => {

    const { value, options, onChange } = RoomSelectPresenter(props)

    return (
        <YurtaRoomSelectUI
            options={options}
            value={value}
            onChange={onChange}
        />
    )
}


export default RoomSelect