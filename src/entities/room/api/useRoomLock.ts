import { create } from "zustand";
import { IUseRoomLock } from "./interface";
import axios from "axios";
import { ApiResponse } from "@/app/types";
import { useCredentails } from "@/features/auth";
import { RoomLock } from "../model/interface";

const useRoomLock = create<IUseRoomLock>((set, get) => ({
  locks: [],
  async create(id: number, start: number, end: number, reason: string) {
    const { access_token } = useCredentails.getState();
    await axios
      .post<ApiResponse<RoomLock>>(
        `${import.meta.env.VITE_API}/roomlock`,
        {
          id,
          start,
          end,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => res.data)
      .then((res) => {
        console.log(res)
        set({
          locks: [res.data, ...(get().locks as RoomLock[])],
        });
      });
  },

  async findByRoomId(id: number, status: string) {
    await axios
      .get<ApiResponse<Array<any>>>(
        `${import.meta.env.VITE_API}/roomlock?room_id=${id}&status=${status}`
      )
      .then((res) => res.data)
      .then((res) => {
        set({ locks: res.data });
      });
  },
}));

export { useRoomLock };
