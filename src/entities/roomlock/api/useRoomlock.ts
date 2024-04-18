import { create } from "zustand";
import { UseRoomLock } from "../model/UseRoomlock";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponse } from "@/app/types";
import { useCredentails } from "@/features/auth";
import { Roomlock } from "../model/Roomlock";
import { useBrm } from "@/entities/calendar/api/useBrm";
import { RoomlockCreationDto } from "../model/dto/RoomlockCreateDto";
import { notification } from "antd";

const useRoomLock = create<UseRoomLock>((set, get) => ({
  roomlocks: undefined,
  roomlock_details: undefined,

  async getRoomLocks() {

  },

  async getRoomlocksByRoomID(room_id) {
    const roomlocks = await axios
      .get<ApiResponse<Array<Roomlock>>>(`${import.meta.env.VITE_API}/roomlock`, {
        params: {
          room_id,
        },
      })
      .then((res) => res.data.data);

    set({ roomlocks });
  },

  async getRoomLockDetailsByID(id: number) {
    const { access_token } = useCredentails.getState();

    const roomlock_details = await axios
      .get<ApiResponse<Roomlock>>(
        `${import.meta.env.VITE_API}/roomlock/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => res.data.data);

    set({
      roomlock_details,
    });
  },

  async createRoomlock(dto) {
    const { access_token } = useCredentails.getState();

    const data: RoomlockCreationDto = {
      room_id: dto.room_id,
      start: dto.start,
      end: dto.end,
      reason: dto.reason,
    };

    const created_roomlock: Roomlock = await axios
      .post<ApiResponse<Roomlock>>(
        `${import.meta.env.VITE_API}/roomlock`,
        {
          id: data.room_id,
          start: data.start,
          end: data.end,
          reason: data.reason,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => res.data.data)
      .catch((e) => {
        throw e
      });

    useBrm.getState().addRoomLock(created_roomlock)
  },

  async deleteRoomlock(id: number) {
    const { access_token } = useCredentails.getState();
    await axios.delete(`${import.meta.env.VITE_API}/roomlock/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    set({
      roomlocks: get().roomlocks.filter((item) => item.id != id),
    });
  },
}));

export { useRoomLock };
