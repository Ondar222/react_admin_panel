import { create } from "zustand";
import { IUseCalendar } from ".";
import axios from "axios";
import { useCredentails } from "@/features/auth";
import { ICalendar } from "../model/interface";
import { ApiResponse } from "@/app/types";

const useCalendar = create<IUseCalendar>((set) => ({
  calendar: [],
  currentDay: undefined,
  getAll: async () => {
    const { access_token } = useCredentails.getState();
    const calendar = await axios
      .get<ApiResponse<ICalendar[]>>(
        `${import.meta.env.VITE_API}/calendar`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data.data);

    return set({
      calendar: calendar
    })
  },

  findByDate: async (date: string) => {
    const { access_token } = useCredentails.getState();
    const calendar = await axios
      .get<ApiResponse<ICalendar>>(
        `${import.meta.env.VITE_API}/calendar/${date}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => res.data.data);

    set({
      currentDay: await calendar
    })
  },
}));

export { useCalendar };
