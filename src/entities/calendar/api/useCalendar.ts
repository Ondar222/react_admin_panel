import { create } from "zustand";
import { IUseCalendar } from ".";
import axios from "axios";
import { useCredentails } from "@/features/auth";
import { IDirectusResponse } from "@/shared/directus/model/interface";
import { ICalendar } from "../model/interface";

const useCalendar = create<IUseCalendar>((set) => ({
  calendar: [],
  currentDay: undefined,
  getAll: async () => {
    const { access_token } = useCredentails.getState();
    const calendar = await axios
      .get<IDirectusResponse<ICalendar[]>>(
        `${import.meta.env.VITE_API}/calendar`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data.data);

    console.log(calendar)

    return set({
      calendar: calendar
    })
  },

  findByDate: async (date: string) => {
    const { access_token } = useCredentails.getState();
    const calendar = await axios
      .get<IDirectusResponse<ICalendar>>(
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
