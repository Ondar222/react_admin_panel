import dayjs from "dayjs";
import { create } from "zustand";
import { useRoomlockFormStore } from "./model";

const useRoomlockForm = create<useRoomlockFormStore>((set) => ({
    isRoomlockCreationFormOpen: false,
    dates: [dayjs().unix(), dayjs().unix()],

    setIsRoomlockCreationFormOpen: (state: boolean) => set({
        isRoomlockCreationFormOpen: state
    }),
    
    setDates: (dates: [number, number]) => set({
        dates: dates
    })
}))


export { useRoomlockForm }