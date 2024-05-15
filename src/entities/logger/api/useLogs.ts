import { ApiResponse } from "@/app/types";
import { useCredentails } from "@/features/auth";
import axios from "axios";
import { create } from "zustand";

interface UseLogs {
    bookingLogs: Array<any>
    getAll: () => Promise<void>

    getBookingLogs: () => Promise<void>
}

const useLogs = create<UseLogs>((set) => ({
    logs: [],
    bookingLogs: [],
    roomlockLogs: [],
    roomLogs: [],
    hotelLogs: [],


    getAll: async () => {

    },

    getBookingLogs: async () => {
        const { access_token } = useCredentails.getState()
        const bookingLogs = await axios.get<ApiResponse<any>>(`${import.meta.env.VITE_API}/booking/logs`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
            .then((res) => {
                return res.data.data
            })


        set({
            bookingLogs,
        })
    },

    getRoomlockLogs: () => {

    },

    getRoomLogs: () => {

    },

    getHotelLogs: () => {

    }
}))

export { useLogs }