import { create } from "zustand";
import { IUseRoom } from "./interface";
import axios from "axios";
import { Room, RoomCreationDto, RoomUpdateDto } from "..";
import { ApiResponse } from "@/app/types";
import { useCredentails } from "@/features/auth";

const useRoom = create<IUseRoom>((set) => ({
  rooms: undefined,
  currentRoom: undefined,
  lockedRooms: undefined,

  create: async (room: RoomCreationDto) => {
    const { access_token } = useCredentails.getState();
    const formData = new FormData();

    formData.append("name", room.name);
    formData.append("number", room.number);
    formData.append("type", room.type);
    formData.append("capacity", String(room.capacity));
    formData.append("hotel_id", String(room.hotel_id));
    formData.append("description", room.description);
    formData.append("price", String(room.price));

    if (room.images)
      formData.append(
        "images",
        room.images[0]?.originFileObj as unknown as Blob,
        room.images[0].name
      );

    formData.append(
      "cover",
      room.cover?.originFileObj as unknown as Blob,
      room.cover?.name
    );

    const data = await axios
      .post(`${import.meta.env.VITE_API}/room`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        return res;
      });

    console.log(data);
  },

  update: async (room: RoomUpdateDto) => {
    const formData = new FormData();
    const { access_token } = useCredentails.getState();

    formData.append("name", room.name);
    formData.append("number", room.number);
    formData.append("type", room.type);
    formData.append("capacity", String(room.capacity));
    formData.append("hotel_id", String(room.hotel_id));
    formData.append("description", room.description);
    formData.append("price", String(room.price));

    if (room.cover) {
      formData.append(
        "cover",
        room.cover.originFileObj as unknown as Blob,
        room.cover.name
      );
    }

    if (room.images) {
      for (let i = 0; i < room.images.length; i++) {
        if (room.images[i].originFileObj)
          formData.append(
            "images",
            room.images[i].originFileObj as unknown as Blob,
            room.images[i].name
          );
      }
    }

    const data = await axios
      .patch(`${import.meta.env.VITE_API}/room/${room.id}`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      });
  },
  delete: () => {},

  findAll: async () => {
    const { access_token } = useCredentails.getState();
    await axios
      .get<ApiResponse<Array<Room>>>(`${import.meta.env.VITE_API}/room`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        set({ rooms: res.data });
      });
  },

  findById: async (id) => {
    await axios
      .get<ApiResponse<Room>>(`${import.meta.env.VITE_API}/room/${id}`)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        set({ currentRoom: res.data });
      });
  },

  findByHotel: async (id: string | number) => {
    await axios
      .get<ApiResponse<Array<Room>>>(
        `${import.meta.env.VITE_API}/room/findByHotel?id=${id}`
      )
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        set({ rooms: res.data });
      });
  },

  getRoomLocks: async (
    start: number,
    end: number,
    room_id?: number,
    status?: string
  ) => {
    await axios
      .get<ApiResponse<Array<any>>>(
        `${
          import.meta.env.VITE_API
        }/roomlock?room_id=${room_id}&status=${status}`
      )
      .then((res) => res.data)
      .then((res) => {
        set({ lockedRooms: res.data });
      });
  },
}));

export { useRoom };
