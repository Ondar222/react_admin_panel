import { FC } from "react"
import { Room, RoomUpdateDto, useRoom } from "../../"

const RoomDetailsForm: FC<Room> = (room) => {
  const updateDto = new RoomUpdateDto(room)
  const { update } = useRoom()

  return (
    <form>
      <input type="text" disabled readOnly value={updateDto.id} />

      <select value={room.type}>
        <option value={room.type}>Эконом</option>
        <option value={room.type}>Стандарт</option>
        <option value={room.type}>Люкс</option>
      </select>

      <input type="text" value={updateDto.number} onChange={(e) => {
        updateDto.number = String(e.target.value)
      }} />
      <input type="text" value={updateDto.price} />
      <button type="submit" onClick={() => {
        update(updateDto)
      }}>Сохранить</button>
    </form>
  )
}

export default RoomDetailsForm