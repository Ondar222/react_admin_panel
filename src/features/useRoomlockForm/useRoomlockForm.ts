import dayjs from "dayjs";
import { create } from "zustand";

type useRoomlockFormStore = {
    isRoomlockCreationFormOpen: boolean
    dates: [number, number],
    setIsRoomlockCreationFormOpen: (state: boolean) => void,
    setDates: (dates: [number, number]) => void
}

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