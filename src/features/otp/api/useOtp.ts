import { create } from "zustand";
import { UseOtp } from "../model";
import axios from "axios";
import { isPhoneNumber } from "class-validator";

const useOtp = create<UseOtp>((set, get) => ({
    statusCode: 200,
    error: null,
    isLoading: false,

    async verifyPhoneNumber(dto) {
        set({ isLoading: true })
        try {
            if (!isPhoneNumber(dto.phone, "RU")) {
                setTimeout(() => {
                    set({
                        isLoading: false
                    })
                }, 200)

                throw new Error("invalid phone number")
            }
        }
        catch (e) {
            set({ error: new Error("invalid phone number") })
            throw new Error("invalid phone number")
        }


        await axios.post(`${import.meta.env.VITE_API}/otp`, dto)
            .then((res) => {
                set({ isLoading: false, statusCode: res.status })
                return res
            })

    }
}))

export { useOtp }