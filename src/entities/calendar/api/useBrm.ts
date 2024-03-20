import { create } from "zustand";
import { IUseBrm } from "./interface";
import axios from "axios";
import { useCredentails } from "@/features/auth";
import { IBrm } from "../model/interface";
import { Roomlock } from "@/entities/roomlock/model/Roomlock";
import { ApiResponse } from "@/app/types";

const useBrm = create<IUseBrm>((set, get) => ({
  brm: [],
  getAll: async () => {
    const brm = [];
    const { access_token } = useCredentails.getState();
    await axios
      .get<ApiResponse<IBrm[]>>(`${import.meta.env.VITE_API}/brm`, {
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

  addRoomLock: (lock: Roomlock) => {
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
