import { create } from "zustand";
import { UseRoom } from "../model/UseRoom";
import axios from "axios";
import { Room, RoomCreationDto, RoomUpdateDto } from "..";
import { ApiResponse } from "@/app/types";
import { useCredentails } from "@/features/auth";
import { UploadFile } from "antd";

const useRoom = create<UseRoom>((set, get) => ({
  rooms: undefined,
  room_details: undefined,

  // completed
  // don't touch it
  createRoom: async (room: RoomCreationDto) => {
    const { access_token } = useCredentails.getState();
    const formData = new FormData();

    formData.append("name", room.name);
    formData.append("number", room.number);
    formData.append("type", room.type);
    formData.append("capacity", String(room.capacity));
    formData.append("hotel_id", String(room.hotel_id));
    formData.append("description", room.description);
    formData.append("price", String(room.price));

    if (room.images) {
      for (let i = 0; i < room.images.length; i++) {
        formData.append(
          "images",
          room.images[i].originFileObj,
          room.images[i].name
        );
      }
    }

    if (room.cover) {
      formData.append("cover", room.cover[0].originFileObj, room.cover[0].name);
    }

    const data = await axios
      .post(`${import.meta.env.VITE_API}/room`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      });

    return data;
  },

  // completed
  // don't touch it
  updateRoom: async (room: Omit<RoomUpdateDto, "hotel_id" | "cover" | "images" | "visibility">) => {
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
  getRoomDetailsByID: async (id) => {
    const { access_token } = useCredentails.getState();

    const room_details = await axios
      .get<ApiResponse<Room>>(`${import.meta.env.VITE_API}/room/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data.data);

    set({ room_details });
  },

  // completed
  // don't touch it
  getHotelRelatedRooms: async () => {
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
  uploadRoomImage: async (fieldName: string, image: UploadFile) => {
    const formData = new FormData();
    const { access_token } = useCredentails.getState();

    formData.append(fieldName, image.originFileObj, image.name);

    await axios
      .post(
        `${import.meta.env.VITE_API}/room/${get().room_details.id}/images`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  },

  // completed
  // don't touch it
  deleteRoomImage: async (fieldName: string, file: string | string[]) => {
    const { access_token } = useCredentails.getState();

    const data = {
      [fieldName]: undefined,
    };

    if (Array.isArray(file) === true) {
      data[fieldName] = file;
    }

    if (Array.isArray(file) === false) {
      data[fieldName] = [file];
    }

    console.log(data);

    await axios
      .delete(
        `${import.meta.env.VITE_API}/room/${get().room_details.id}/images`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          data,
        }
      )
      .then((res) => console.log(res));
  },

  // completed
  // don't touch it
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
}));

export { useRoom };
