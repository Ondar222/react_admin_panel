import { ApiResponse } from "@/app/types";
import { useCredentails } from "@/features/auth";
import axios from "axios";
import { create } from "zustand";
import { Room } from "../model";
import { useRoom } from "./useRoom";

const useRoomVisibilitySwitcher = create((set, get) => ({
  async switchRoomVisibility(room_id: number, visibility: boolean) {
    const { access_token } = useCredentails.getState();

    const updated_room = await axios
      .patch<ApiResponse<Room>>(
        `${import.meta.env.VITE_API}/room/${room_id}`,
        {
          visibility,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => res.data.data);

    useRoom.setState({
      rooms: useRoom.getState().rooms.map((room) => {
        if (room.id === room_id) {
          return updated_room;
        }
        return room;
      }),
    });
  },
}));

export { useRoomVisibilitySwitcher };
