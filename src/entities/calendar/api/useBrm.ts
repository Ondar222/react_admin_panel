import { create } from "zustand";
import { IUseBrm } from "./interface";
import axios from "axios";
import { useCredentails } from "@/features/auth";
import { IDirectusResponse } from "@/shared/directus/model/interface";
import { IBrm } from "../model/interface";
import { RoomLock } from "@/entities/room_lock/model/room_lock";

const useBrm = create<IUseBrm>((set, get) => ({
  brm: [],
  getAll: async () => {
    const brm = [];
    const { access_token } = useCredentails.getState();
    await axios
      .get<IDirectusResponse<IBrm[]>>(`${import.meta.env.VITE_API}/brm`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        res.data.data.forEach((item) => {
          if (item.booking) {
            brm.push({ type: "booking", item: item.booking });
          }

          if (item.lock) {
            brm.push({ type: "room_lock", item: item.lock });
          }
        });

        set({
          brm,
        });
      });
  },

  addRoomLock: (lock: RoomLock) => {
    set({
      brm: [
        ...get().brm,
        {
          type: "room_lock",
          item: lock,
        },
      ],
    });
  },
}));

export { useBrm };
