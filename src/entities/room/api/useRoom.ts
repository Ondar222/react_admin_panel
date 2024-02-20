import { create } from "zustand";
import { IUseRoom } from "./interface";
import axios from "axios";
import { Room, RoomCreationDto, RoomUpdateDto } from "..";
import { ApiResponse } from "@/app/types";
import { useCredentails } from "@/features/auth";
import { UploadFile } from "antd";

const useRoom = create<IUseRoom>((set, get) => ({
  rooms: undefined,
  currentRoom: undefined,

  // completed
  // don't touch it
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
  },

  // completed
  // don't touch it
  update: async (room: RoomUpdateDto) => {
    const { access_token } = useCredentails.getState();

    await axios
      .patch(`${import.meta.env.VITE_API}/room/${room.id}`, room, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        return res;
      });
  },

  changeVisibility: async (room_id: number, visibility: boolean) => {
    const { access_token } = useCredentails.getState();

    await axios
      .patch(
        `${import.meta.env.VITE_API}/room/${room_id}`,
        {
          visibility: visibility,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => {
        set({
          rooms: get().rooms?.map((room) => {
            if (room.id === room_id) {
              return {
                ...room,
                visibility,
              };
            }
            return room;
          }),
        });
      });
  },

  // completed
  // don't touch it
  deleteRoom: async (room_id) => {
    const { access_token } = useCredentails.getState();
    await axios
      .delete(`${import.meta.env.VITE_API}/room/${room_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => console.log(res));
  },

  // completed
  // don't touch it
  findById: async (id) => {
    const { access_token } = useCredentails.getState();
    await axios
      .get<ApiResponse<Room>>(`${import.meta.env.VITE_API}/room/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data.data)
      .then((currentRoom) => {
        set({ currentRoom });
      });
  },

  // completed
  // don't touch it
  findMyRooms: async () => {
    const { access_token } = useCredentails.getState();
    await axios
      .get<ApiResponse<Array<Room>>>(`${import.meta.env.VITE_API}/room/my`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data.data)
      .then((rooms) => {
        set({ rooms });
      });
  },

  // completed
  // don't touch it
  uploadImage: async (
    room_id: number,
    fieldName: string,
    image: UploadFile
  ) => {
    const formData = new FormData();
    const { access_token } = useCredentails.getState();

    formData.append(fieldName, image.originFileObj, image.name);

    await axios.post(
      `${import.meta.env.VITE_API}/room/${room_id}/images`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  },

  // completed
  // don't touch it
  deleteImage: async (room_id: number, id: string) => {
    const formData = new FormData();
    const { access_token } = useCredentails.getState();

    await axios.delete(`${import.meta.env.VITE_API}/room/${room_id}/images`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        images: [id],
      },
    });
  },
}));

export { useRoom };
