import { create } from "zustand";
import { IUseBrm, IBrm } from "../model/interface";
import axios from "axios";
import { useCredentails } from "@/features/auth";
import { Booking, Roomlock } from "@/entities";
import { ApiResponse } from "@/app/types";
import zukeeper from "zukeeper"


const useBrm = create<IUseBrm>(zukeeper((set, get) => ({
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
            brm.push({ type: "booking", item: item.booking, rooms: item.rooms });
          }

          if (item.lock) {
            brm.push({ type: "room_lock", item: item.lock, rooms: item.rooms });
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

  addBooking: (booking: Booking) => {
    set({
      brm: [
        ...get().brm,
        {
          type: "booking",
          item: booking
        }
      ]
    })
  }
})));

// @ts-ignore
window.store = useBrm;

export { useBrm };
